import React, { useState, useEffect } from 'react';
import { documentAPI } from '../services/api';
import FileUploadZone from '../components/FileUploadZone';
import DocumentList from '../components/DocumentList';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentAPI.getDocuments();
      setDocuments(response.data.documents);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments([newDocument, ...documents]);
  };

  const filteredDocuments = filter === 'all'
    ? documents
    : documents.filter(doc => doc.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Document Dashboard</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <FileUploadZone onUploadSuccess={handleUploadSuccess} />

      <div className="mt-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Documents
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('signed')}
            className={`px-4 py-2 rounded ${filter === 'signed' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Signed
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Rejected
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading documents...</div>
        ) : (
          <DocumentList documents={filteredDocuments} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
