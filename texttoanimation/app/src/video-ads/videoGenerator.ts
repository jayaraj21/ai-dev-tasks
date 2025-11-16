/**
 * Video Generation Pipeline
 * Orchestrates the full pipeline: LLM script generation -> Fast Wan API -> Storage
 */

import { generateAdScript, scriptToFastWanPrompt, type VideoScript } from './scriptGenerator';
import { getFastWanClient, type FastWanVideoRequest } from './fastWanClient';
import { uploadVideo, uploadThumbnail, getVideoUrl, getThumbnailUrl } from './storageUtils';
import { validatePrompt } from './validation';

export interface VideoGenerationResult {
  videoAdId: string;
  fastWanJobId: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  script?: VideoScript;
}

/**
 * Generate a video ad from a user prompt
 * This is the main orchestration function
 */
export async function generateVideoAd(
  userPrompt: string,
  userId: string,
  videoAdId: string
): Promise<VideoGenerationResult> {
  // Validate prompt
  const promptValidation = validatePrompt(userPrompt);
  if (!promptValidation.valid) {
    throw new Error(promptValidation.error || 'Invalid prompt');
  }

  // Step 1: Generate script using LLM
  console.log(`[${videoAdId}] Generating script for prompt: ${userPrompt.substring(0, 50)}...`);
  const script = await generateAdScript(userPrompt);
  console.log(`[${videoAdId}] Script generated with ${script.scenes.length} scenes`);

  // Step 2: Convert script to Fast Wan prompt
  const fastWanPrompt = scriptToFastWanPrompt(script);

  // Step 3: Submit job to Fast Wan API
  console.log(`[${videoAdId}] Submitting job to Fast Wan API`);
  const fastWanClient = getFastWanClient();
  
  const fastWanRequest: FastWanVideoRequest = {
    prompt: fastWanPrompt,
    model: 'wan-2.2',
    duration: Math.min(script.totalDuration, 60), // Cap at 60 seconds
    aspectRatio: '16:9',
  };

  const jobResponse = await fastWanClient.generateVideo(fastWanRequest);
  console.log(`[${videoAdId}] Fast Wan job created: ${jobResponse.jobId}`);

  return {
    videoAdId,
    fastWanJobId: jobResponse.jobId,
    status: 'generating',
    script,
  };
}

/**
 * Process a completed Fast Wan job: download video and store it
 */
export async function processCompletedVideo(
  fastWanJobId: string,
  userId: string,
  videoAdId: string
): Promise<{ videoUrl: string; thumbnailUrl?: string; duration?: number }> {
  console.log(`[${videoAdId}] Processing completed video for job: ${fastWanJobId}`);
  
  const fastWanClient = getFastWanClient();
  
  // Get job status to retrieve video URL
  const jobStatus = await fastWanClient.checkJobStatus(fastWanJobId);
  
  if (jobStatus.status !== 'completed' || !jobStatus.videoUrl) {
    throw new Error(`Video job ${fastWanJobId} is not completed or missing video URL`);
  }

  // Download video
  console.log(`[${videoAdId}] Downloading video from Fast Wan`);
  const videoBuffer = await fastWanClient.downloadVideo(jobStatus.videoUrl);

  // Upload video to storage
  console.log(`[${videoAdId}] Uploading video to storage`);
  const videoStorageKey = await uploadVideo(videoBuffer, userId, videoAdId);
  const videoUrl = await getVideoUrl(videoStorageKey);

  // Download and upload thumbnail if available
  let thumbnailUrl: string | undefined;
  if (jobStatus.thumbnailUrl) {
    try {
      console.log(`[${videoAdId}] Downloading thumbnail from Fast Wan`);
      const thumbnailBuffer = await fastWanClient.downloadVideo(jobStatus.thumbnailUrl);
      
      console.log(`[${videoAdId}] Uploading thumbnail to storage`);
      const thumbnailStorageKey = await uploadThumbnail(thumbnailBuffer, userId, videoAdId);
      thumbnailUrl = await getThumbnailUrl(thumbnailStorageKey);
    } catch (error) {
      console.warn(`[${videoAdId}] Failed to process thumbnail:`, error);
      // Continue without thumbnail
    }
  }

  console.log(`[${videoAdId}] Video processing completed`);

  return {
    videoUrl,
    thumbnailUrl,
    duration: jobStatus.duration,
  };
}

