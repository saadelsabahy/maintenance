import axios from 'axios';
export const BASE_URL = 'http://jeddahwcts.com:5556';
export default axios.create({
   baseURL: `${BASE_URL}/MaintenanceAPI/api/`,
   timeout: 30000,
   headers: {
      'Content-Type': 'application/json',
   },
});
