import { useQuery } from 'react-query';
import axios from 'axios';

import { Order } from '../interfaces';

const fetchFinishedOrders = async () => {
  const data: Order[] = await (await axios.get(
    `http://localhost:4000/orders/finished`
  )).data;
  
  return data;
};

export default function useFetchFinishedOrders() {
  return useQuery("finished_orders", fetchFinishedOrders);
}