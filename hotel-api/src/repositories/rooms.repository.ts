import { Room, CreateRoomDto, UpdateRoomDto } from '../types';

export class RoomsRepository {
  private rooms: Room[] = [
    {
      id: 1,
      number: '101',
      type: 'single',
      pricePerNight: 80,
      capacity: 1,
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      number: '102',
      type: 'double',
      pricePerNight: 120,
      capacity: 2,
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
  ];

  async findAll(): Promise<Room[]> {
    return this.rooms;
  }

  async findById(id: number): Promise<Room | null> {
    const room = this.rooms.find((r) => r.id === id);
    return room || null;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const newRoom: Room = {
      id: this.rooms.length > 0 ? Math.max(...this.rooms.map((r) => r.id)) + 1 : 1,
      ...dto,
      isAvailable: dto.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  async update(id: number, dto: UpdateRoomDto): Promise<Room | null> {
    const index = this.rooms.findIndex((r) => r.id === id);
    if (index === -1) return null;

    this.rooms[index] = {
      ...this.rooms[index],
      ...dto,
    };
    return this.rooms[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.rooms.findIndex((r) => r.id === id);
    if (index === -1) return false;

    this.rooms.splice(index, 1);
    return true;
  }
}