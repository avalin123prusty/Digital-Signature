import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4">Digital Signature Solution</h1>
        <p className="text-xl mb-8 opacity-90">
          Secure, legally binding digital signatures for your documents
        </p>

        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3">🔒 Secure</h3>
            <p>End-to-end encryption and audit trails for complete security</p>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3">⚡ Fast</h3>
            <p>Sign documents instantly with our easy-to-use interface</p>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3">✓ Legal</h3>
            <p>Compliant with international digital signature standards</p>
          </div>
        </div>

        <div className="mt-16">
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
