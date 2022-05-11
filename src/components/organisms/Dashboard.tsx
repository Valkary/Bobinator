import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import HistoryTable from '../atoms/HistoryTable';
import ProductionGraph from '../atoms/ProductionGraph';
import OrdersSkeleton from '../atoms/OrdersSkeleton';

const Dashboard: React.FC = ({}) => {
  const [tableData, setTableData] = useState();
  
  const fetchHistory = async () => {
    const data = await (await axios.get('http://localhost:4000/orders/order_history')).data;
    
    const formatted_data = data.map((reg: any) => {
      const { id, vueltas, etapa, prod_time } = reg;
      const formatted_date = format(new Date(prod_time), "yyyy-MM-dd");
      const formatted_time = format(new Date(prod_time), "HH:mm:ss");
  
      return {
        id,
        vueltas,
        etapa,
        date: formatted_date,
        time: formatted_time
      }
    });

    setTableData(formatted_data);
    return;
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className=' w-full h-full overflow-auto scrollbar flex flex-col items-center'>
      <ProductionGraph />
      {
        tableData ?
          <HistoryTable order_history={tableData} /> :
          <OrdersSkeleton />
      }
    </div>
  );
}

export default Dashboard;