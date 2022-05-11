import { useQuery } from 'react-query';
import axios from 'axios';

import { Etapa } from '../interfaces';

const fetchStages = async () => {
  const data: Etapa[]  = await (await axios.get(
    `http://localhost:4000/etapas_prod`
  )).data;
  
  return data;
};

export default function useFetchOrderStages() {
  return useQuery("stages", fetchStages);
}