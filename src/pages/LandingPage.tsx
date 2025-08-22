import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 }
  }
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-5xl font-bold mb-2">University Progression Calculator</h1>
        <p className="text-xl text-gray-400 mb-12">Please select your role to continue</p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-10">
        <Link to="/student">
          <motion.div 
            className="w-80 h-96 bg-gray-800 rounded-lg p-8 flex flex-col justify-between items-center cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Student</h2>
              <p className="text-gray-300">Check your own progression outcome by entering your credits.</p>
            </div>
            <span className="text-lg font-semibold text-cyan-500">Get Started →</span>
          </motion.div>
        </Link>

        <Link to="/staff">
          <motion.div 
            className="w-80 h-96 bg-gray-800 rounded-lg p-8 flex flex-col justify-between items-center cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-purple-400 mb-4">Staff</h2>
              <p className="text-gray-300">Process multiple student outcomes and view summary histograms.</p>
            </div>
            <span className="text-lg font-semibold text-purple-500">Enter Data →</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;