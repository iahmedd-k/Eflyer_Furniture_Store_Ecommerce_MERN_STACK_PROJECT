import dotenv from 'dotenv';
dotenv.config();
import express from 'express'

import connectDb from './Utils/db.js'
import user_router from './Routes/User_Router.js';
import router from './Routes/Product_Router.js';
import c_router from './Routes/category_router.js';
import cors from 'cors';
import o_router from './Routes/Order_router.js';
const app = express()
app.use(express.json())
app.use(cors(
{
      origin: "http://localhost:5173", // or wherever your frontend runs
  credentials: true
}
));
const port = process.env.PORT || 5000; 

app.use('/api/user', user_router);
app.use('/api/products', router);
app.use('/api/categories', c_router);
app.use('/api/orders', o_router);
connectDb();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))