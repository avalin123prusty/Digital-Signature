import React from 'react';
import { Link } from 'react-router-dom';

const DocumentList = ({ documents }) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No documents found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="grid gap-4">
      {documents.map((doc) => (
        <div key={doc._id} className="card flex justify-between items-center hover:shadow-lg transition">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{doc.fileName}</h3>
            <p className="text-sm text-gray-600">
              Uploaded: {formatDate(doc.uploadedAt)} | Size: {formatFileSize(doc.fileSize)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(doc.status)}`}>
              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
            </span>
            <Link
              to={`/document/${doc._id}`}
              className="btn-primary"
            >
              View & Sign
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
