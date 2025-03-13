const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const verifyToken = require('./middleware/authenticateToken'); // Importar o middleware de autenticação

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware para logar todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const eventRoutes = require('./routes/events');
const barracaRoutes = require('./routes/barracas');
const cardapioRoutes = require('./routes/cardapios');
const pedidoRoutes = require('./routes/pedidos');

app.use('/api/users', userRoutes); // A rota de usuários já tem tratamento específico
app.use('/api/transactions', verifyToken, transactionRoutes);
app.use('/api/events', verifyToken, eventRoutes);
app.use('/api/events/:eventId', verifyToken, barracaRoutes); // Proteger a rota
app.use('/api/events/:eventId/barracas/:barracaId', verifyToken, cardapioRoutes); // Proteger a rota
app.use('/api/pedidos', verifyToken, pedidoRoutes); // Proteger a rota

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});