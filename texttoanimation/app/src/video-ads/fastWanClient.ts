/**
 * Fast Wan API Client
 * Handles communication with Fast Wan API for video generation
 */

const FAST_WAN_API_URL = process.env.FAST_WAN_API_URL || 'https://api.fast-wan.com';
const FAST_WAN_API_KEY = process.env.FAST_WAN_API_KEY;

export interface FastWanVideoRequest {
  prompt: string;
  model?: string; // 'wan-2.2' or 'wan-2.1'
  duration?: number; // Duration in seconds
  aspectRatio?: string; // e.g., '16:9', '9:16', '1:1'
}

export interface FastWanJobResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  error?: string;
}

export interface FastWanJobStatus {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number; // 0-100
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  error?: string;
}

class FastWanClient {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    if (!FAST_WAN_API_KEY) {
      throw new Error('FAST_WAN_API_KEY environment variable is not set');
    }
    this.apiKey = FAST_WAN_API_KEY;
    this.apiUrl = FAST_WAN_API_URL;
  }

  /**
   * Generate a video using Fast Wan API
   */
  async generateVideo(request: FastWanVideoRequest): Promise<FastWanJobResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/videos/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt: request.prompt,
          model: request.model || 'wan-2.2',
          duration: request.duration || 30,
          aspect_ratio: request.aspectRatio || '16:9',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`Fast Wan API error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      return {
        jobId: data.job_id || data.id,
        status: data.status || 'pending',
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url,
        duration: data.duration,
      };
    } catch (error) {
      console.error('Fast Wan API error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate video: ${error.message}`);
      }
      throw new Error('Failed to generate video: Unknown error');
    }
  }

  /**
   * Check the status of a video generation job
   */
  async checkJobStatus(jobId: string): Promise<FastWanJobStatus> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/videos/status/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`Fast Wan API error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      return {
        jobId: data.job_id || data.id || jobId,
        status: data.status || 'pending',
        progress: data.progress,
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url,
        duration: data.duration,
        error: data.error,
      };
    } catch (error) {
      console.error('Fast Wan API error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to check job status: ${error.message}`);
      }
      throw new Error('Failed to check job status: Unknown error');
    }
  }

  /**
   * Download a completed video
   */
  async downloadVideo(videoUrl: string): Promise<Buffer> {
    try {
      const response = await fetch(videoUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error('Video download error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to download video: ${error.message}`);
      }
      throw new Error('Failed to download video: Unknown error');
    }
  }
}

// Export singleton instance
let fastWanClient: FastWanClient | null = null;

export function getFastWanClient(): FastWanClient {
  if (!fastWanClient) {
    fastWanClient = new FastWanClient();
  }
  return fastWanClient;
}

