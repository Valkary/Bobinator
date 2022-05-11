import { useQuery } from 'react-query';
import axios from 'axios';

import { OrderCount } from '../interfaces';

const fetchOrderCount = async () => {
  const data: OrderCount = await (await axios.get(
    `http://localhost:4000/orders/order_count`
  )).data;
  
  return data;
};

export default function useFetchOrderCount() {
  return useQuery("order_count", fetchOrderCount);
}