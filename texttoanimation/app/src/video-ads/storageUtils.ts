/**
 * Storage utilities for video files
 * Supports both S3 and local filesystem storage based on environment
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const USE_LOCAL_STORAGE = process.env.USE_LOCAL_STORAGE === 'true' || process.env.NODE_ENV === 'development';
const LOCAL_VIDEO_STORAGE_PATH = process.env.LOCAL_VIDEO_STORAGE_PATH || './app/public/generated-videos';

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_IAM_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_IAM_SECRET_KEY!,
      },
    });
  }
  return s3Client;
}

/**
 * Upload a video file to storage (S3 or local)
 */
export async function uploadVideo(videoBuffer: Buffer, userId: string, videoId: string): Promise<string> {
  const fileName = `${videoId}.mp4`;
  
  if (USE_LOCAL_STORAGE) {
    // Local filesystem storage
    const userDir = path.join(LOCAL_VIDEO_STORAGE_PATH, userId);
    await fs.mkdir(userDir, { recursive: true });
    
    const filePath = path.join(userDir, fileName);
    await fs.writeFile(filePath, videoBuffer);
    
    // Return relative URL path
    return `/generated-videos/${userId}/${fileName}`;
  } else {
    // S3 storage
    const key = `videos/${userId}/${fileName}`;
    const client = getS3Client();
    
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_FILES_BUCKET!,
        Key: key,
        Body: videoBuffer,
        ContentType: 'video/mp4',
      })
    );
    
    return key;
  }
}

/**
 * Upload a thumbnail image to storage
 */
export async function uploadThumbnail(
  thumbnailBuffer: Buffer,
  userId: string,
  videoId: string
): Promise<string> {
  const fileName = `${videoId}-thumbnail.jpg`;
  
  if (USE_LOCAL_STORAGE) {
    // Local filesystem storage
    const userDir = path.join(LOCAL_VIDEO_STORAGE_PATH, userId);
    await fs.mkdir(userDir, { recursive: true });
    
    const filePath = path.join(userDir, fileName);
    await fs.writeFile(filePath, thumbnailBuffer);
    
    // Return relative URL path
    return `/generated-videos/${userId}/${fileName}`;
  } else {
    // S3 storage
    const key = `videos/${userId}/${fileName}`;
    const client = getS3Client();
    
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_FILES_BUCKET!,
        Key: key,
        Body: thumbnailBuffer,
        ContentType: 'image/jpeg',
      })
    );
    
    return key;
  }
}

/**
 * Get a signed URL or local URL for video playback
 */
export async function getVideoUrl(storageKey: string): Promise<string> {
  if (USE_LOCAL_STORAGE) {
    // If storageKey is already a URL path, return it
    if (storageKey.startsWith('/')) {
      return storageKey;
    }
    // Otherwise construct the path
    return storageKey;
  } else {
    // S3 signed URL
    const client = getS3Client();
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_FILES_BUCKET!,
      Key: storageKey,
    });
    return await getSignedUrl(client, command, { expiresIn: 3600 });
  }
}

/**
 * Get a signed URL or local URL for thumbnail
 */
export async function getThumbnailUrl(storageKey: string): Promise<string> {
  return getVideoUrl(storageKey);
}

/**
 * Delete a video from storage
 */
export async function deleteVideo(storageKey: string): Promise<void> {
  if (USE_LOCAL_STORAGE) {
    // Local filesystem deletion
    const fullPath = path.join(process.cwd(), 'app', 'public', storageKey);
    try {
      await fs.unlink(fullPath);
    } catch (error) {
      // File might not exist, ignore error
      console.warn(`Failed to delete local file: ${fullPath}`, error);
    }
  } else {
    // S3 deletion
    const client = getS3Client();
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_FILES_BUCKET!,
        Key: storageKey,
      })
    );
  }
}

/**
 * Generate a unique storage key for a video
 */
export function generateStorageKey(userId: string, videoId: string, extension: string = 'mp4'): string {
  if (USE_LOCAL_STORAGE) {
    return `generated-videos/${userId}/${videoId}.${extension}`;
  } else {
    return `videos/${userId}/${videoId}.${extension}`;
  }
}

