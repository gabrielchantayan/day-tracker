import { Router } from 'express';
const router = Router();

import data from '../controllers/data/index';

// Update data
// Updates data
router.post('/update_data', (req, res) => {
    return data.update_data(req, res);
});

// Get data
// Gets data
router.post('/get_data', (req, res) => {
    return data.get_data(req, res);
});

// Get prefill
// Gets prefill
router.post('/get_prefill', (req, res) => {
    return data.get_prefill(req, res);
});
export default router;