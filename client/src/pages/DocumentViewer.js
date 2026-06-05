import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { documentAPI, signatureAPI, auditAPI } from '../services/api';
import PDFEditor from '../components/PDFEditor';
import AuditTrail from '../components/AuditTrail';

const DocumentViewer = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [auditTrail, setAuditTrail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAudit, setShowAudit] = useState(false);
  const [generationMessage, setGenerationMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docRes, sigRes, auditRes] = await Promise.all([
        documentAPI.getDocument(id),
        signatureAPI.getSignatures(id),
        auditAPI.getAuditTrail(id),
      ]);

      setDocument(docRes.data.document);
      setSignatures(sigRes.data.signatures);
      setAuditTrail(auditRes.data.auditTrail);
    } catch (err) {
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleGenerateSignedPdf = async () => {
    try {
      const response = await documentAPI.generateSignedPdf(id);
      setGenerationMessage(response.data.message || 'Signed PDF generated successfully');
      await fetchData();
    } catch (err) {
      setError('Failed to generate signed PDF');
    }
  };

  const handleSignature = async (signatureData) => {
    try {
      await signatureAPI.saveSignature({
        ...signatureData,
        documentId: id,
      });
      await fetchData();
    } catch (err) {
      setError('Failed to save signature');
    }
  };

  if (loading) return <div className="text-center py-8">Loading document...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!document) return <div className="text-center py-8">Document not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{document.fileName}</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="card">
            <PDFEditor
              documentPath={document.filePath}
              onSignature={handleSignature}
              signatures={signatures}
              currentPage={currentPage}
              numPages={numPages}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {numPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
              disabled={currentPage === numPages}
              className="btn-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Document Info</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong> {document.status}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Uploaded:</strong> {new Date(document.uploadedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Signatures:</strong> {signatures.length}
            </p>
            <button
              onClick={handleGenerateSignedPdf}
              className="btn-primary w-full"
            >
              Generate Signed PDF
            </button>
            {generationMessage && (
              <p className="mt-3 text-sm text-green-600">{generationMessage}</p>
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Signatures</h3>
            {signatures.length === 0 ? (
              <p className="text-sm text-gray-600">No signatures yet</p>
            ) : (
              <ul className="space-y-2">
                {signatures.map((sig) => (
                  <li key={sig._id} className="text-sm border-b pb-2">
                    <p className="font-semibold">{sig.signerEmail}</p>
                    <p className="text-gray-600">Status: {sig.status}</p>
                    {sig.reason && (
                      <p className="text-sm text-red-600">Reason: {sig.reason}</p>
                    )}
                    {sig.signedAt && (
                      <p className="text-gray-600">
                        Signed: {new Date(sig.signedAt).toLocaleDateString()}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setShowAudit(!showAudit)}
            className="btn-primary w-full"
          >
            {showAudit ? 'Hide' : 'View'} Audit Trail
          </button>

          {showAudit && (
            <AuditTrail auditTrail={auditTrail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
