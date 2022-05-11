import { useQuery } from 'react-query';
import axios from 'axios';

import { Order } from '../interfaces';

const fetchApprovedOrders = async () => {
  const data: Order[] = await (await axios.get(
    `http://localhost:4000/orders/approved`
  )).data;
  
  return data;
};

export default function useFetchApprovedOrders() {
  return useQuery("approved_orders", fetchApprovedOrders);
}