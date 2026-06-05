import express from 'express';
import { 
  saveSignature, 
  getSignatures, 
  updateSignatureStatus 
} from '../controllers/signatureController.js';
import { authMiddleware, auditMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(auditMiddleware);

router.post('/', saveSignature);
router.get('/:documentId', getSignatures);
router.patch('/:signatureId', updateSignatureStatus);

export default router;
