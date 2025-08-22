import React, { useState } from 'react';
import type { CreditData } from '../api/progressionService';

interface CreditFormProps {
  onSubmit: (data: CreditData) => void; 
  isLoading: boolean;
}

const CreditForm: React.FC<CreditFormProps> = ({ onSubmit, isLoading }) => {
  const [credits, setCredits] = useState<CreditData>({
    pass_credit: 0,
    defer_credit: 0,
    fail_credit: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredits(prevCredits => ({
      ...prevCredits,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onSubmit(credits);
  };

  const creditOptions = [0, 20, 40, 60, 80, 100, 120];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="pass_credit">
            Pass Credits
          </label>
          <select
            id="pass_credit"
            name="pass_credit"
            value={credits.pass_credit}
            onChange={handleChange}
            className="block w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-cyan-500"
          >
            {creditOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="defer_credit">
            Defer Credits
          </label>
          <select
            id="defer_credit"
            name="defer_credit"
            value={credits.defer_credit}
            onChange={handleChange}
            className="block w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-cyan-500"
          >
            {creditOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="fail_credit">
            Fail Credits
          </label>
          <select
            id="fail_credit"
            name="fail_credit"
            value={credits.fail_credit}
            onChange={handleChange}
            className="block w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-cyan-500"
          >
            {creditOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500"
        >
          {isLoading ? 'Calculating...' : 'Calculate Progression'}
        </button>
      </div>
    </form>
  );
};

export default CreditForm;