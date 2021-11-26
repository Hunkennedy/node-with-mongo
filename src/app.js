import express from "express";
import morgan from "morgan";
import pkg from '../package.json';

import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetup';

const app = express();
createRoles();

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json()); // with this middleware you can interpretate the json request
app.use('/products', productRoutes); // when the endpoint products is called go to routes
app.use('/auth', authRoutes);


export default app;