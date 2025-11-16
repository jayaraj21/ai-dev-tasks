/**
 * Background Job for processing video generation
 * Polls Fast Wan API for job completion and updates database
 */

import { getFastWanClient } from './fastWanClient';
import { processCompletedVideo } from './videoGenerator';
import type { ProcessVideoGeneration } from 'wasp/server/jobs';

const POLL_INTERVAL_MS = 30000; // 30 seconds

/**
 * Process pending video generation jobs
 * This job is called periodically to check Fast Wan job statuses
 */
export const processVideoGenerationJobs: ProcessVideoGeneration<never, void> = async (_args, context) => {
  console.log('Starting video generation job processing...');

  try {
    // Get all video ads in 'generating' status with a Fast Wan job ID
    const generatingVideos = await context.entities.VideoAd.findMany({
      where: {
        status: 'generating',
        fastWanJobId: {
          not: null,
        },
      },
      include: {
        user: true,
      },
    });

    console.log(`Found ${generatingVideos.length} videos in generating status`);

    const fastWanClient = getFastWanClient();

    for (const videoAd of generatingVideos) {
      if (!videoAd.fastWanJobId) {
        continue;
      }

      try {
        console.log(`[${videoAd.id}] Checking status for job: ${videoAd.fastWanJobId}`);

        // Check job status with Fast Wan
        const jobStatus = await fastWanClient.checkJobStatus(videoAd.fastWanJobId);

        console.log(`[${videoAd.id}] Job status: ${jobStatus.status}`);

        if (jobStatus.status === 'completed') {
          // Process completed video
          console.log(`[${videoAd.id}] Video completed, processing...`);
          
          const result = await processCompletedVideo(
            videoAd.fastWanJobId,
            videoAd.userId,
            videoAd.id
          );

          // Update database with video URL and metadata
          await context.entities.VideoAd.update({
            where: { id: videoAd.id },
            data: {
              status: 'completed',
              videoUrl: result.videoUrl,
              thumbnailUrl: result.thumbnailUrl || null,
              duration: result.duration || null,
              metadata: JSON.stringify({
                completedAt: new Date().toISOString(),
              }),
            },
          });

          console.log(`[${videoAd.id}] Video processing completed successfully`);
        } else if (jobStatus.status === 'failed') {
          // Handle failed job
          console.error(`[${videoAd.id}] Video generation failed: ${jobStatus.error || 'Unknown error'}`);
          
          await context.entities.VideoAd.update({
            where: { id: videoAd.id },
            data: {
              status: 'failed',
              metadata: JSON.stringify({
                error: jobStatus.error || 'Video generation failed',
                failedAt: new Date().toISOString(),
              }),
            },
          });
        } else if (jobStatus.status === 'processing' || jobStatus.status === 'pending') {
          // Still processing, update progress if available
          if (jobStatus.progress !== undefined) {
            await context.entities.VideoAd.update({
              where: { id: videoAd.id },
              data: {
                metadata: JSON.stringify({
                  progress: jobStatus.progress,
                  lastChecked: new Date().toISOString(),
                }),
              },
            });
          }
          console.log(`[${videoAd.id}] Video still processing (${jobStatus.progress || 0}%)`);
        }
      } catch (error) {
        console.error(`[${videoAd.id}] Error processing video job:`, error);
        
        // Don't update status to failed on transient errors
        // The job will retry on next run
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[${videoAd.id}] Will retry on next job run. Error: ${errorMessage}`);
      }
    }

    console.log('Video generation job processing completed');
  } catch (error) {
    console.error('Error in video generation job:', error);
    throw error;
  }
};

