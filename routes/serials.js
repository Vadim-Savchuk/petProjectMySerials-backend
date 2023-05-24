import { Router } from 'express';
import { addSerial, getById, removeSerial, updateSerial } from '../controllers/serials.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Add serial
// http://localhost:3001/api/serials/add
router.post('/add', checkAuth, addSerial);

// Get all post by id
// http://localhost:3001/api/serials/user/me
router.get('/user/me', checkAuth, getById);

// Get delate post by id
// http://localhost:3001/api/serials/:id
router.delete('/:id', checkAuth, removeSerial);

// Update serial
// http://localhost:3001/api/serials/:id
router.put('/:id', checkAuth, updateSerial);

export default router;