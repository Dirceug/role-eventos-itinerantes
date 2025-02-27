const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const eventRoutes = require('./routes/events');
const barracaRoutes = require('./routes/barracas');
const cardapioRoutes = require('./routes/cardapios');
const pedidoRoutes = require('./routes/pedidos');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events/:eventId/barracas', barracaRoutes);
app.use('/api/events/:eventId/barracas/:barracaId/cardapios', cardapioRoutes);
app.use('/api/pedidos', pedidoRoutes);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});