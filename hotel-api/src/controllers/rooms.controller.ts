import { Request, Response } from 'express';
import { RoomsService } from '../services/rooms.service';

export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    // Si req.query.page o limit no existen, se usan los valores por defecto 1 y 10
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await this.service.getAll(page, limit);
    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const room = await this.service.getById(id);
    if (!room) {
      res.status(404).json({ error: 'Not Found', message: `Room ${id} not found` });
      return;
    }
    res.status(200).json({ data: room });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const room = await this.service.create(req.body);
      res.status(201).json({ data: room });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bad Request';
      res.status(400).json({ error: 'Bad Request', message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const room = await this.service.update(id, req.body);
      if (!room) {
        res.status(404).json({ error: 'Not Found', message: `Room ${id} not found` });
        return;
      }
      res.status(200).json({ data: room });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bad Request';
      res.status(400).json({ error: 'Bad Request', message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const deleted = await this.service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Room ${id} not found` });
      return;
    }
    res.status(204).send();
  };
}