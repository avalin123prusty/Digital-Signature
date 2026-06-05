import express from 'express';
import { 
  getAuditTrail, 
  getUserAuditTrail 
} from '../controllers/auditController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:documentId', getAuditTrail);
router.get('/user/trail', getUserAuditTrail);

export default router;
