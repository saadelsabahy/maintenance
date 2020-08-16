import axios from 'axios';

export default axios.create({
   baseURL: 'http://192.168.50.123:5565/MaintenanceAPI/api/',
   timeout: 30000,
   headers: {
      'Content-Type': 'application/json',
   },
});
