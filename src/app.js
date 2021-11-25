import express from "express";
import morgan from "morgan";
import pkg from '../package.json';

import productRoutes from './routes/product.routes';

const app = express();


app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json()); // with this middleware you can interpretate the json request

// app.get('/', (req, res) => {
//     res.json({
//         Name: app.get('pkg').name,
//         Author: app.get('pkg').author,
//         Description: app.get('pkg').description,
//         Version: app.get('pkg').version
//     });
// });

app.use('/products', productRoutes); // when the endpoint products is called go to routes


export default app;