import React, { useState, useRef } from 'react';

const PDFEditor = ({ documentPath, onSignature, signatures, currentPage, numPages, onPageChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureMode, setSignatureMode] = useState(null); // 'draw', 'type', null
  const [signatureText, setSignatureText] = useState('');
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleCanvasMouseDown = (e) => {
    if (signatureMode !== 'draw') return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setLastPos({ x, y });
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing || signatureMode !== 'draw') return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastPos({ x, y });
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    const signatureImage = canvas.toDataURL();

    // compute relative coordinates as percentages so server can map to PDF
    const rect = canvas.getBoundingClientRect();
    const relX = Math.round((lastPos.x / rect.width) * 10000) / 10000; // 4 decimal places
    const relY = Math.round((lastPos.y / rect.height) * 10000) / 10000;

    onSignature({
      coordinates: {
        x: relX,
        y: relY,
        page: currentPage,
      },
      signatureImage,
      signatureText: signatureText || `Signed by user on ${new Date().toLocaleDateString()}`,
    });

    // Reset
    clearCanvas();
    setSignatureMode(null);
    setSignatureText('');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <div className="mb-4 space-y-2">
        <p className="font-semibold">Add Signature (Page {currentPage})</p>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (signatureMode === 'draw') {
                setSignatureMode(null);
                clearCanvas();
              } else {
                setSignatureMode('draw');
              }
            }}
            className={`px-3 py-2 rounded ${signatureMode === 'draw' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Draw Signature
          </button>

          <button
            onClick={() => setSignatureMode(signatureMode === 'type' ? null : 'type')}
            className={`px-3 py-2 rounded ${signatureMode === 'type' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Type Signature
          </button>
        </div>

        {signatureMode === 'draw' && (
          <div>
            <canvas
              ref={canvasRef}
              width={300}
              height={150}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              className="border-2 border-gray-300 cursor-crosshair"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={clearCanvas}
                className="btn-secondary px-3 py-1 text-sm"
              >
                Clear
              </button>
              <button
                onClick={handleSaveSignature}
                className="btn-primary px-3 py-1 text-sm"
              >
                Save Signature
              </button>
            </div>
          </div>
        )}

        {signatureMode === 'type' && (
          <div>
            <input
              type="text"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              placeholder="Enter your signature text"
              className="input-field mb-2"
            />
            <button
              onClick={handleSaveSignature}
              className="btn-primary px-3 py-1 text-sm"
            >
              Save Signature
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded min-h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>PDF Preview Area</p>
          <p className="text-sm">(Integrated PDF renderer coming soon)</p>
          <p className="text-xs mt-2">Page {currentPage} of {numPages || 1}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFEditor;
