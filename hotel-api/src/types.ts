import type { CreateRoomInput, UpdateRoomInput } from './schemas/rooms.schema';

export interface Room {
  id: number;
  number: string;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  pricePerNight: number;
  capacity: number;
  isAvailable: boolean;
  createdAt: string;
}

export type CreateRoomDto = CreateRoomInput;
export type UpdateRoomDto = UpdateRoomInput;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
  message: string;
  issues?: Array<{ path: (string | number)[]; message: string }>;
}