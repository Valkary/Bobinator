import { useQuery } from 'react-query';
import axios from 'axios';

import { Order } from '../interfaces';

const fetchOrdersInProd = async () => {
  const data: Order[] = await (await axios.get(
    `http://localhost:4000/orders/in_prod`
  )).data;
  
  return data;
};

export default function useFetchOrdersInProd() {
  return useQuery("inprod_orders", fetchOrdersInProd);
}