import express from 'express';
import { 
  uploadDocument, 
  getDocuments, 
  getDocument, 
  generateSignedPdf,
  downloadDocument 
} from '../controllers/documentController.js';
import { authMiddleware, auditMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(auditMiddleware);

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.post('/:id/generate', generateSignedPdf);
router.get('/:id/download', downloadDocument);

export default router;
