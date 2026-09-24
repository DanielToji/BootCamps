import express from 'express';
import { morganMiddleware } from './config/logger';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { RoomsRouter } from './routes/rooms.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

const roomsRepository = new RoomsRepository();
const roomsService = new RoomsService(roomsRepository);
const roomsController = new RoomsController(roomsService);

app.use('/api/v1/rooms', RoomsRouter(roomsController));

app.use(notFound);
app.use(errorHandler);

export default app;