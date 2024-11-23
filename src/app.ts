import express, { Request, Response } from 'express';
import bikeRouter from './app/modules/bike/bike.router';
import orderRouter from './app/modules/order/order.router';

const app = express();

//middleware
app.use(express.json());

app.use('/api/products', bikeRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live',
  });
});

export default app;
