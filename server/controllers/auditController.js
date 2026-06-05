import Audit from '../models/Audit.js';

export const getAuditTrail = async (req, res) => {
  try {
    const { documentId } = req.params;

    const auditTrail = await Audit.find({ documentId })
      .sort({ timestamp: -1 })
      .populate('userId', 'name email');

    res.json({ auditTrail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserAuditTrail = async (req, res) => {
  try {
    const auditTrail = await Audit.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({ auditTrail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
