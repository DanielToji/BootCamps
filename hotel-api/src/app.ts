import express from 'express';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { RoomsRouter } from './routes/rooms.routes';

const app = express();
app.use(express.json());

const roomsRepository = new RoomsRepository();
const roomsService = new RoomsService(roomsRepository);
const roomsController = new RoomsController(roomsService);

app.use('/api/v1/rooms', RoomsRouter(roomsController));

export default app;