import env from 'dotenv';
env.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import productRoutes from './routes/products.js';

const app = express();

// built-in middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(process.env.PORT), () => console.log(`Server running on PORT ${process.env.PORT}`))
        .catch(err => console.log(err.message));

// //Bind connection to error event (to get notification of connection errors)
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));