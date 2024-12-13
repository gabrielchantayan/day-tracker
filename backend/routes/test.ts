import { Router } from 'express';
const router = Router();

import test from '../controllers/test/index';

// Test
// Test API
router.post('/test', (req, res) => {
    return test.test(req, res);
});
export default router;