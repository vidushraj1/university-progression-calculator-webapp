import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CreditForm from '../components/CreditForm';
import Report from '../components/Report';
import { calculateProgression, type CreditData } from '../api/progressionService';
import { AxiosError } from 'axios';

export interface StudentRecord extends CreditData {
  outcome: string;
}

const StaffPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [lastOutcome, setLastOutcome] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = async (data: CreditData) => {
    setIsLoading(true);
    setError(null);
    setLastOutcome(null);

    try {
      const response = await calculateProgression(data);
      const newRecord: StudentRecord = {
        ...data,
        outcome: response.data.outcome,
      };
      
      setRecords(prevRecords => [...prevRecords, newRecord]);
      setLastOutcome(response.data.outcome);

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold mb-2 text-purple-400">Staff Portal</h1>
        <p className="text-lg text-gray-400 mb-8">Enter student credits to build a progression report.</p>
      </motion.div>

      <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center">
          <CreditForm onSubmit={handleSubmit} isLoading={isLoading} />
          <div className="mt-6 text-center h-20">
            <AnimatePresence>
              {lastOutcome && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400"
                >
                  ✓ Successfully added outcome: <strong>{lastOutcome}</strong>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/20 border border-red-500 text-red-300 px-6 py-3 rounded-lg"
                >
                  <p className="font-semibold">Error: {error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Progression Records ({records.length})
          </h2>
          <div className="max-h-96 overflow-y-auto pr-2">
            {records.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No records added yet.</p>
            ) : (
              <ul>
                <AnimatePresence>
                  {records.map((record, index) => (
                    <motion.li
                      key={index}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-between items-center p-3 mb-2 bg-gray-700 rounded"
                    >
                      <span className="font-mono text-sm text-gray-400">
                        {record.pass_credit}, {record.defer_credit}, {record.fail_credit}
                      </span>
                      <span className="font-semibold text-cyan-300">{record.outcome}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {records.length > 0 && (
        <div className="w-full max-w-4xl flex justify-center mt-8">
          {!showReport ? (
            <button
              onClick={() => setShowReport(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              Generate Report
            </button>
          ) : (
            <Report records={records} />
          )}
        </div>
      )}

      <Link to="/" className="mt-12 text-purple-400 hover:text-purple-300 transition-colors duration-300">
        ← Back to Home
      </Link>
    </div>
  );
};

export default StaffPage;