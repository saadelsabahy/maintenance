import axios from 'axios';

export default axios.create({
   baseURL: 'http://41.39.108.205:5565/MaintenanceAPI/api/',
   timeout: 30000,
   headers: {
      'Content-Type': 'application/json',
   },
});
