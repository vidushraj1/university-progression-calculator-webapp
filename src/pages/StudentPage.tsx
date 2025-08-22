import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CreditForm from '../components/CreditForm';
import { calculateProgression, type CreditData } from '../api/progressionService';
import { AxiosError } from 'axios';

const StudentPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreditData) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await calculateProgression(data);
      setResult(response.data.outcome);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response) {
        setError(axiosError.response.data.error);
      } else {
        setError("An unexpected error occurred. Is the backend server running?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <h1 className="text-4xl font-bold mb-2 text-cyan-400">Student Portal</h1>
        <p className="text-lg text-gray-400 mb-8">Enter your credits to see your progression outcome.</p>
      </motion.div>
      
      <CreditForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-8 text-center h-24">
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-500/20 border border-green-500 text-green-300 px-6 py-4 rounded-lg"
            >
              <h2 className="text-2xl font-semibold">Outcome: {result}</h2>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-500/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold">Error: {error}</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Link to="/" className="mt-8 text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
        ← Back to Home
      </Link>
    </div>
  );
};

export default StudentPage;