import React, { useState, useEffect } from 'react';
import { RingProgress } from '@mantine/core';
import OrdersSkeleton from './OrdersSkeleton';

import useFetchOrderCount from '../../hooks/useFetchOrderCount';
import { OrderCount } from '../../interfaces';

const ProductionGraph: React.FC = ({}) => {
  const [orderCount, setOrderCount] = useState<OrderCount>();
  const { data, isSuccess } = useFetchOrderCount();

  useEffect(() => {
    setOrderCount(data);
  }, [data]);
  
  if (isSuccess && typeof orderCount !== 'undefined') {
    const { total_orders, approved_count, not_approved_count, in_prod_count, finished_count } = orderCount;
  
    const sections_maker = () => {
      const { approved, not_approved, in_prod, finished } = orderCount;
 
      const sections = [
        { value: approved ?? 0, color: 'blue' },
        { value: not_approved ?? 0, color: 'red' },
        { value: in_prod ?? 0, color: 'yellow' },
        { value: finished ?? 0, color: 'green' },
      ];
  
      return sections;
    }
  
    const sections = sections_maker();
  
    return (
      <div className=' w-[95%] flex flex-row items-center justify-start font-code mb-10 text-gray-50'>
        <div className='flex flex-row text-2xl flex-grow justify-center items-center'>
          <p>ESTADO GLOBAL DE LA PRODUCCIÓN</p>
        </div>
        <div className=' flex-grow flex flex-col items-center justify-start h-[80%]'>
          <div className=' flex flex-row items-center justify-start'>
            <RingProgress
              sections={sections}
              size={300}
            />
            <div className=' flex-grow flex flex-col text-gray-50 h-full'>
              <div className=' flex-grow flex flex-row w-full justify-start items-center'>
                <span className=' bg-red-600 h-5 w-5 rounded-sm border-2 mr-5'>{''}</span>
                <p className=' mr-5'>{sections[1].value.toFixed(2)}%</p>
                <p>No aprobados ({not_approved_count})</p>
              </div>
              <div className=' flex-grow flex flex-row w-full justify-start items-center'>
                <span className=' bg-blue-500 h-5 w-5 rounded-sm border-2 mr-5'>{''}</span>
                <p className=' mr-5'>{sections[0].value.toFixed(2)}%</p>
                <p>Aprobados ({approved_count})</p>
              </div>
              <div className=' flex-grow flex flex-row w-full justify-start items-center'>
                <span className=' bg-yellow-500 h-5 w-5 rounded-sm border-2 mr-5'>{''}</span>
                <p className=' mr-5'>{sections[2].value.toFixed(2)}%</p>
                <p>En producción ({in_prod_count})</p>
              </div>
              <div className=' flex-grow flex flex-row w-full justify-start items-center'>
                <span className=' bg-green-500 h-5 w-5 rounded-sm border-2 mr-5'>{''}</span>
                <p className=' mr-5'>{sections[3].value.toFixed(2)}%</p>
                <p>Terminados ({finished_count})</p>
              </div>
            </div>
        </div>
        <p className=''>Total de órdenes: {total_orders}</p>
        </div>
      </div>
    );
  } else {
    return <OrdersSkeleton />
  }
  return <OrdersSkeleton />
}

export default ProductionGraph;