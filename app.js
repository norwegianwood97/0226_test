// /app.js

import express from 'express';
import connect from './schemas/index.js';
import UsersRouter from './routes/users.router.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3001;

connect();

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'Hi!' });
});

app.use('/api', [UsersRouter]);
app.use(ErrorHandlerMiddleware);
app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
