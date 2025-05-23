require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const verifyToken = require('./middleware/authenticateToken'); // Importar o middleware de autenticação
const NodeCache = require("node-cache");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN_1, process.env.PROD_ORIGIN_2];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization' // Inclua outros cabeçalhos personalizados, se houver
}));
app.use(express.json());

// Cache Global
const userCache = new NodeCache({ stdTTL: 600 });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware para logar todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Middleware para configurar COOP e COEP
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });
app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  next();
});

// Routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const eventRoutes = require('./routes/events');
const barracaRoutes = require('./routes/barracas');
const cardapioRoutes = require('./routes/cardapios');
const pedidoRoutes = require('./routes/pedidos');
const curtidasRoutes = require('./routes/curtidas'); // Nova rota para curtidas
const amizadesRoutes = require('./routes/amizades'); // Nova rota para amizades

app.use('/api/users', userRoutes); // A rota de usuários já tem tratamento específico
app.use('/api/transactions', verifyToken, transactionRoutes);
app.use('/api/events', verifyToken, eventRoutes);
app.use('/api/events/:eventId/barracas', verifyToken, barracaRoutes); // Proteger a rota
app.use('/api/events/:eventId/barracas/:barracaId/cardapios', verifyToken, cardapioRoutes); // Proteger a rota
app.use('/api/pedidos', verifyToken, pedidoRoutes); // Proteger a rota
app.use('/api/curtidas', verifyToken, curtidasRoutes); // Nova rota para curtidas
app.use('/api/amizades', verifyToken, amizadesRoutes); // Nova rota para amizades

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro no console
  res.status(err.status || 500).json({ message: err.message }); // Retorna o erro em formato JSON
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});