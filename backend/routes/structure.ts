import { Router } from 'express';
const router = Router();

import structure from '../controllers/structure/index';

// Get structure
// Gets structure
router.post('/get_structure', (req, res) => {
    return structure.get_structure(req, res);
});

// Update structure
// Updates structure
router.post('/update_structure', (req, res) => {
    return structure.update_structure(req, res);
});
export default router;