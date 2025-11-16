/**
 * Validation utilities for video ad operations
 */

import * as z from 'zod';

export const createVideoAdInputSchema = z.object({
  title: z.string().min(1).max(200),
  prompt: z.string().min(10).max(2000),
});

export const generateVideoAdInputSchema = z.object({
  videoAdId: z.string().uuid(),
});

export const getVideoAdByIdInputSchema = z.object({
  videoAdId: z.string().uuid(),
});

export const deleteVideoAdInputSchema = z.object({
  videoAdId: z.string().uuid(),
});

export type CreateVideoAdInput = z.infer<typeof createVideoAdInputSchema>;
export type GenerateVideoAdInput = z.infer<typeof generateVideoAdInputSchema>;
export type GetVideoAdByIdInput = z.infer<typeof getVideoAdByIdInputSchema>;
export type DeleteVideoAdInput = z.infer<typeof deleteVideoAdInputSchema>;

/**
 * Validate user prompt content
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' };
  }

  if (prompt.length < 10) {
    return { valid: false, error: 'Prompt must be at least 10 characters long' };
  }

  if (prompt.length > 2000) {
    return { valid: false, error: 'Prompt cannot exceed 2000 characters' };
  }

  // Check for potentially harmful content
  const blockedPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];

  for (const pattern of blockedPatterns) {
    if (pattern.test(prompt)) {
      return { valid: false, error: 'Prompt contains invalid content' };
    }
  }

  return { valid: true };
}

/**
 * Validate video ad title
 */
export function validateTitle(title: string): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }

  if (title.length > 200) {
    return { valid: false, error: 'Title cannot exceed 200 characters' };
  }

  return { valid: true };
}

