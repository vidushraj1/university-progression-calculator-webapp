import React, { useMemo } from 'react';
import { type StudentRecord } from '../pages/StaffPage';
import { motion } from 'framer-motion';

interface ReportProps {
  records: StudentRecord[];
}

const Report: React.FC<ReportProps> = ({ records }) => {
  const summary = useMemo(() => {
    const counts = {
      Progress: 0,
      'Progress (module trailer)': 0,
      'Module retriever': 0,
      Exclude: 0,
    };
    records.forEach(record => {
      if (record.outcome in counts) {
        counts[record.outcome as keyof typeof counts]++;
      }
    });
    return counts;
  }, [records]);

  const totalOutcomes = records.length;
  const maxCount = Math.max(...Object.values(summary));

  const categories = [
    { name: 'Progress', count: summary.Progress, color: 'bg-green-500' },
    { name: 'Trailer', count: summary['Progress (module trailer)'], color: 'bg-yellow-500' },
    { name: 'Retriever', count: summary['Module retriever'], color: 'bg-blue-500' },
    { name: 'Excluded', count: summary.Exclude, color: 'bg-red-500' },
  ];

  const handleDownload = () => {
    let fileContent = "Progression Report\n";
    fileContent += "==================\n\n";
    records.forEach(record => {
      fileContent += `${record.outcome} - ${record.pass_credit}, ${record.defer_credit}, ${record.fail_credit}\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Progression.txt';
    document.body.appendChild(a);
    
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mt-12 bg-gray-800 p-8 rounded-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Progression Report</h2>
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Download Report
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Horizontal Histogram</h3>
      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.name} className="flex items-center gap-4">
            <span className="w-24 font-semibold text-gray-300">{cat.name}</span>
            <div className="flex-grow bg-gray-700 rounded h-6 flex items-center">
              <motion.div
                className={`${cat.color} h-6 rounded`}
                initial={{ width: 0 }}
                animate={{ width: totalOutcomes > 0 ? `${(cat.count / totalOutcomes) * 100}%` : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="w-8 text-right font-mono">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-700 my-8"></div>

      <h3 className="text-xl font-semibold mb-4">Vertical Histogram</h3>
      <div className="flex justify-around items-end h-64 pt-4">
        {categories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center w-1/4 text-center">
            <div className="w-full h-48 flex items-end justify-center">
              <motion.div
                className={`${cat.color} w-1/2 rounded-t-md`}
                initial={{ height: 0 }}
                animate={{ height: maxCount > 0 ? `${(cat.count / maxCount) * 100}%` : '0%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
            </div>
            <span className="mt-2 font-semibold text-gray-300">{cat.name}</span>
            <span className="font-mono text-gray-400">{cat.count}</span>
          </div>
        ))}
      </div>

      <p className="text-center mt-6 text-gray-400 font-semibold">{totalOutcomes} outcomes in total.</p>
    </motion.div>
  );
};

export default Report;