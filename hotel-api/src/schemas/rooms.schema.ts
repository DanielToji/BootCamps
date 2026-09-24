import { z } from 'zod';

export const roomTypeEnum = z.enum(['single', 'double', 'suite', 'deluxe']);

export const createRoomSchema = z.object({
  number: z.string().min(1, 'number is required').trim(),
  type: roomTypeEnum,
  pricePerNight: z.number().positive('pricePerNight must be greater than 0'),
  capacity: z.number().int().positive('capacity must be greater than 0'),
  isAvailable: z.boolean().default(true),
});

export const updateRoomSchema = createRoomSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer'),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;