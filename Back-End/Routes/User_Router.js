import express from 'express';
import { getme, loginUser, logout, registerUser } from '../Controllers/User_Controller.js';

const user_router = express.Router();


user_router.post('/register',  registerUser);
user_router.post('/login',  loginUser);
user_router.get('/me', getme);
user_router.post('/me', logout);



export default user_router;