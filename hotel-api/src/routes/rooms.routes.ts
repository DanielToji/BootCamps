import { Router } from 'express';
import { RoomsController } from '../controllers/rooms.controller';

export const RoomsRouter = (controller: RoomsController): Router => {
  const router = Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};