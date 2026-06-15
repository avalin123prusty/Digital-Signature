import express from 'express';
import {
  saveSignature,
  getSignatures,
  updateSignatureStatus,
  generatePublicLink,
  publicSign
} from '../controllers/signatureController.js';
import { authMiddleware, auditMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply audit middleware to all routes (doesn't require auth)
router.use(auditMiddleware);

// Protected routes (require auth)
router.post('/invite', authMiddleware, generatePublicLink);
router.post('/', authMiddleware, saveSignature);
router.get('/', authMiddleware, getSignatures);
router.get('/:documentId', authMiddleware, getSignatures);
router.patch('/:signatureId', authMiddleware, updateSignatureStatus);

// Public signing endpoint (tokenized)
router.get('/public/:token', publicSign); // GET returns token info
router.post('/public/:token', publicSign);

export default router;
