import { Request, Response, NextFunction } from 'express';
import { RoomsService } from '../services/rooms.service';
import {
  createRoomSchema,
  updateRoomSchema,
  idParamSchema,
} from '../schemas/rooms.schema';

export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const result = await this.service.getAll(page, limit);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = idParamSchema.safeParse(req.params);
      if (!parsed.success) throw parsed.error;
      const room = await this.service.getById(parsed.data.id);
      res.status(200).json({ data: room });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createRoomSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;
      const room = await this.service.create(parsed.data);
      res.status(201).json({ data: room });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = idParamSchema.safeParse(req.params);
      if (!params.success) throw params.error;
      const body = updateRoomSchema.safeParse(req.body);
      if (!body.success) throw body.error;
      const room = await this.service.update(params.data.id, body.data);
      res.status(200).json({ data: room });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = idParamSchema.safeParse(req.params);
      if (!parsed.success) throw parsed.error;
      await this.service.delete(parsed.data.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}