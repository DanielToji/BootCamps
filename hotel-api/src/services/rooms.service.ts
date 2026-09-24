import { RoomsRepository } from '../repositories/rooms.repository';
import {
  Room,
  CreateRoomDto,
  UpdateRoomDto,
  PaginatedResponse
} from '../types';

export class RoomsService {
  constructor(private readonly repository: RoomsRepository) {}

  async getAll(page: number, limit: number): Promise<PaginatedResponse<Room>> {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 10;

    const all = await this.repository.findAll();
    const start = (safePage - 1) * safeLimit;
    const data = all.slice(start, start + safeLimit);

    return { data, total: all.length, page: safePage, limit: safeLimit };
  }

  async getById(id: number): Promise<Room | null> {
    return this.repository.findById(id);
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    if (!dto.number || dto.number.trim() === '') {
      throw new Error('number is required');
    }
    if (dto.pricePerNight <= 0) {
      throw new Error('pricePerNight must be greater than 0');
    }
    if (dto.capacity <= 0) {
      throw new Error('capacity must be greater than 0');
    }
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateRoomDto): Promise<Room | null> {
    if (dto.pricePerNight !== undefined && dto.pricePerNight <= 0) {
      throw new Error('pricePerNight must be greater than 0');
    }
    if (dto.capacity !== undefined && dto.capacity <= 0) {
      throw new Error('capacity must be greater than 0');
    }
    return this.repository.update(id, dto);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}