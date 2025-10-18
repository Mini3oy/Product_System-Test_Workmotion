import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();


app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));


app.use('/api', productRoutes);
app.use('/api', categoryRoutes);


app.get('/health', (req, res) => res.json({ ok: true }));


app.use(errorHandler);


export default app;