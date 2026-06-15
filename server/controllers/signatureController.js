import Signature from '../models/Signature.js';
import Document from '../models/Document.js';
import Audit from '../models/Audit.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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
    const documentId = req.params.documentId || req.query.documentId;

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

// Generate a tokenized public signing link and (optionally) email it to signer
export const generatePublicLink = async (req, res) => {
  try {
    const { documentId, signerEmail, message } = req.body;

    if (!documentId || !signerEmail) {
      return res.status(400).json({ error: 'Missing documentId or signerEmail' });
    }

    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    // Create a pending signature record
    const signature = new Signature({
      documentId,
      signerEmail,
      status: 'pending'
    });
    await signature.save();

    const token = jwt.sign({
      signatureId: signature._id.toString(),
      documentId: documentId,
      email: signerEmail
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const base = process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const link = `${base}/public/sign/${token}`;

    // Try to send email if SMTP configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: signerEmail,
        subject: `Please sign document: ${document.title || 'Document'}`,
        text: `${message || 'Please sign the document'}\n\nSign here: ${link}`,
        html: `<p>${message || 'Please sign the document'}</p><p><a href="${link}">Click to sign</a></p>`
      };

      await transporter.sendMail(mailOptions);
    }

    // Create audit log for invite
    await Audit.create({
      documentId,
      userId: req.userId,
      userEmail: req.userEmail,
      action: 'invite_sent',
      ipAddress: req.ipAddress,
      userAgent: req.userAgent
    });

    res.json({ message: 'Invite created', link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept a public signing request using token
export const publicSign = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: 'Missing token' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { signatureId, documentId, email } = payload;

    // If GET, return token info (document + signature preview)
    if (req.method === 'GET') {
      const document = await Document.findById(documentId);
      const signature = signatureId ? await Signature.findById(signatureId) : null;
      return res.json({ document, signature, email });
    }

    // POST: perform signing
    const { coordinates, signatureText, signatureImage } = req.body;

    let signature = null;
    if (signatureId) signature = await Signature.findById(signatureId);

    if (!signature) {
      // fallback: create a new signature if missing
      signature = new Signature({ documentId, signerEmail: email, status: 'pending' });
    }

    signature.coordinates = coordinates || signature.coordinates;
    signature.signatureText = signatureText || signature.signatureText;
    signature.signatureImage = signatureImage || signature.signatureImage;
    signature.status = 'signed';
    signature.signedAt = new Date();

    await signature.save();

    // Update document status if needed
    const document = await Document.findById(documentId);
    if (document) {
      document.status = 'signed';
      await document.save();
    }

    // Audit
    await Audit.create({
      documentId,
      userEmail: email,
      action: 'public_signed',
      ipAddress: req.ipAddress,
      userAgent: req.userAgent
    });

    res.json({ message: 'Document signed', signature });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
