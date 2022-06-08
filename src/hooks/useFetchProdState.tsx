import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProdState = async () => {
  const data: any = await (await axios.get(
    `http://localhost:4000/prod_state`
  )).data;
  
  return data[0].name;
};

export default function useFetchProdState() {
  return useQuery("prod_state", fetchProdState);
}