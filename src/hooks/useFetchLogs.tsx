import { useQuery } from 'react-query';
import axios from 'axios';

import { Log } from '../interfaces';

const fetchLogs = async () => {
  const data: Log[] = await (await axios.get(
    `http://localhost:4000/todays_logs`
  )).data;
  
  return data;
};

export default function useFetchLogs() {
  return useQuery("logs", fetchLogs);
}