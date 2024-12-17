import axios from 'axios';
import { config } from 'dotenv';
config();

export const http = axios.create({
  baseURL: 'http://localhost:' + process.env.JSON_SERVER_PORT,
  headers: {
    'Content-Type': 'application/json',
  },
});
