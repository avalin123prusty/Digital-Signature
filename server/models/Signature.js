import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  signerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  signerEmail: {
    type: String
  },
  coordinates: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    }
  },
  signatureText: {
    type: String
  },
  signatureImage: {
    type: String // Base64 or image path
  },
  status: {
    type: String,
    enum: ['pending', 'signed', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String // For rejection reason
  },
  signedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Signature', signatureSchema);
