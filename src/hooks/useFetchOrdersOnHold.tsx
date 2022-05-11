import { useQuery } from 'react-query';
import axios from 'axios';

import { Order } from '../interfaces';

const fetchOrdersOnHold= async () => {
  const data: Order[] = await (await axios.get(
    `http://localhost:4000/orders/on-hold`
  )).data;
  
  return data;
};

export default function useFetchOrdersOnHold() {
  return useQuery("holding_orders", fetchOrdersOnHold);
}