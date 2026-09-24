export type RoomType = 'single' | 'double' | 'suite' | 'deluxe';

export interface Room {
  id: number;
  number: string;
  type: RoomType;
  pricePerNight: number;
  capacity: number;
  isAvailable: boolean;
  createdAt: string;
}

export type CreateRoomDto = Omit<Room, 'id' | 'createdAt'>;
export type UpdateRoomDto = Partial<CreateRoomDto>;

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
}