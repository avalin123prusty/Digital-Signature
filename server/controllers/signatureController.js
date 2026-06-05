import Signature from '../models/Signature.js';
import Document from '../models/Document.js';
import Audit from '../models/Audit.js';

export const saveSignature = async (req, res) => {
  try {
    const { documentId, coordinates, signatureText, signatureImage } = req.body;

    if (!documentId || !coordinates) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const signature = new Signature({
      documentId,
      signerId: req.userId,
      signerEmail: req.userEmail,
      coordinates,
      signatureText,
      signatureImage,
      status: 'signed',
      signedAt: new Date()
    });

    await signature.save();

    // Update document status
    document.status = 'signed';
    await document.save();

    // Create audit log
    await Audit.create({
      documentId,
      userId: req.userId,
      userEmail: req.userEmail,
      action: 'signed',
      ipAddress: req.ipAddress,
      userAgent: req.userAgent
    });

    res.status(201).json({
      message: 'Signature saved successfully',
      signature
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSignatures = async (req, res) => {
  try {
    const { documentId } = req.params;

    const signatures = await Signature.find({ documentId })
      .populate('signerId', 'name email');

    res.json({ signatures });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSignatureStatus = async (req, res) => {
  try {
    const { signatureId } = req.params;
    const { status, reason } = req.body;

    if (!['pending', 'signed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const signature = await Signature.findById(signatureId);
    if (!signature) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    signature.status = status;
    if (status === 'rejected') {
      signature.reason = reason;
    } else if (status === 'signed') {
      signature.signedAt = new Date();
    }

    await signature.save();

    // Create audit log
    await Audit.create({
      documentId: signature.documentId,
      userId: req.userId,
      userEmail: req.userEmail,
      action: status === 'rejected' ? 'rejected' : 'signed',
      ipAddress: req.ipAddress,
      userAgent: req.userAgent
    });

    res.json({
      message: `Signature ${status} successfully`,
      signature
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
