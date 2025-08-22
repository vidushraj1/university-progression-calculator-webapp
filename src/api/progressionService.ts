import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export interface CreditData {
  pass_credit: number;
  defer_credit: number;
  fail_credit: number;
}

interface SuccessResponse {
  outcome: string;
}

/**
 * @param {CreditData} data
 * @returns {Promise}
 */
export const calculateProgression = (data: CreditData) => {
  return axios.post<SuccessResponse>(`${API_URL}/api/calculate`, data);
};