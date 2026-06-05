import Document from '../models/Document.js';
import Signature from '../models/Signature.js';
import Audit from '../models/Audit.js';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const document = new Document({
      userId: req.userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    await document.save();

    // Create audit log
    await Audit.create({
      documentId: document._id,
      userId: req.userId,
      userEmail: req.userEmail,
      action: 'uploaded',
      ipAddress: req.ipAddress,
      userAgent: req.userAgent
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.userId })
      .sort({ uploadedAt: -1 });

    res.json({ documents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if user owns the document
    if (document.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ document });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if user owns the document
    if (document.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const filePath = document.filePath;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, document.fileName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateSignedPdf = async (req, res) => {
  try {
    const documentId = req.params.id;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    if (document.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const signatures = await Signature.find({ documentId, status: 'signed' });
    if (!signatures.length) {
      return res.status(400).json({ error: 'No signed signatures found for this document' });
    }

    const filePath = path.resolve(document.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Original document file not found' });
    }

    const existingPdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (const signature of signatures) {
      const pageIndex = Math.max(0, Math.min(signature.coordinates.page - 1, pdfDoc.getPageCount() - 1));
      const page = pdfDoc.getPage(pageIndex);
      const { x, y } = signature.coordinates;
      const text = signature.signatureText || `Signed by ${signature.signerEmail}`;

      page.drawText(text, {
        x: x || 50,
        y: y || 50,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      if (signature.signatureImage && signature.signatureImage.startsWith('data:image')) {
        const [header, base64Data] = signature.signatureImage.split(',');
        const imageBytes = Uint8Array.from(Buffer.from(base64Data, 'base64'));

        let embeddedImage;
        if (header.includes('image/png')) {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        }

        const imageDims = embeddedImage.scale(0.3);
        page.drawImage(embeddedImage, {
          x: x || 50,
          y: (y || 50) + 20,
          width: imageDims.width,
          height: imageDims.height
        });
      }
    }

    const signedFileName = `${path.parse(document.fileName).name}-signed${path.extname(document.fileName)}`;
    const signedFilePath = path.join(path.dirname(document.filePath), signedFileName);
    const signedPdfBytes = await pdfDoc.save();

    fs.writeFileSync(signedFilePath, signedPdfBytes);

    document.signedFilePath = signedFilePath;
    document.status = 'signed';
    document.signedAt = new Date();
    await document.save();

    res.json({
      message: 'Signed PDF generated successfully',
      signedFilePath,
      signedFileName
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
