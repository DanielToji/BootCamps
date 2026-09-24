import { RoomsRepository } from '../repositories/rooms.repository';
import {
  Room,
  CreateRoomDto,
  UpdateRoomDto,
  PaginatedResponse,
} from '../types';
import { AppError } from '../errors/AppError';

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

  async getById(id: number): Promise<Room> {
    const room = await this.repository.findById(id);
    if (!room) throw new AppError(404, `Room ${id} not found`);
    return room;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateRoomDto): Promise<Room> {
    const room = await this.repository.update(id, dto);
    if (!room) throw new AppError(404, `Room ${id} not found`);
    return room;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError(404, `Room ${id} not found`);
  }
}