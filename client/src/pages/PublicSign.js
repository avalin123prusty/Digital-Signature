import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentAPI, signatureAPI } from '../services/api';
import PDFEditor from '../components/PDFEditor';

const PublicSign = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [document, setDocument] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetchTokenInfo();
  }, [token]);

  const fetchTokenInfo = async () => {
    try {
      const res = await signatureAPI.getPublicInfo(token);
      setInfo(res.data);
      if (res.data.document && res.data.document._id) {
        const docRes = await documentAPI.getDocument(res.data.document._id);
        setDocument(docRes.data.document);
      }
      if (res.data.signature) setSignatures([res.data.signature]);
    } catch (err) {
      setError('Invalid or expired signing link');
    }
  };

  const handleSignature = async (signatureData) => {
    try {
      const res = await signatureAPI.publicSign(token, {
        ...signatureData,
      });
      // after signing, navigate to a success page or show message
      navigate('/');
    } catch (err) {
      setError('Failed to sign document');
    }
  };

  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!info || !document) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Document: {document.fileName}</h1>

      <PDFEditor
        documentPath={document.filePath}
        onSignature={handleSignature}
        signatures={signatures}
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PublicSign;
