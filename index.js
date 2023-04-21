import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'


mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.jclvzgg.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));


const app = express();

// читаем json из нашего запроса
app.use(express.json())

// авторизация
app.post('/auth/login', UserController.login);
// регистрация с валидацией
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe());

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});