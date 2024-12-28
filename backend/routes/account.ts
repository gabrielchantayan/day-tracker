import { Router } from 'express';
const router = Router();

import account from '../controllers/account/index';

// Register
// Registers a new account
router.post('/register', (req, res) => {
    return account.register(req, res);
});

// Login
// Logs in an account
router.post('/login', (req, res) => {
    return account.login(req, res);
});
export default router;