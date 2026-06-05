import React from 'react';

const AuditTrail = ({ auditTrail }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'viewed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-4">Audit Trail</h3>

      {auditTrail.length === 0 ? (
        <p className="text-sm text-gray-600">No audit records</p>
      ) : (
        <div className="space-y-3">
          {auditTrail.map((audit, index) => (
            <div key={audit._id} className="border-l-4 border-gray-300 pl-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm">{audit.userEmail}</p>
                  <p className="text-xs text-gray-600">{formatDate(audit.timestamp)}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getActionColor(audit.action)}`}>
                  {audit.action.charAt(0).toUpperCase() + audit.action.slice(1)}
                </span>
              </div>
              {audit.ipAddress && (
                <p className="text-xs text-gray-600 mt-1">IP: {audit.ipAddress}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditTrail;
