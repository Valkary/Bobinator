import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import { useMutation } from 'react-query';
import axios from 'axios';

const ApproveOrderBtn: React.FunctionComponent<{ order_id: number, prod_state: string }> = ({ order_id, prod_state }) => {
  const updateOrder = useMutation((order_id: number) => {
    return axios.post(`http://localhost:4000/production/update_order?id=${order_id}`);
  });  

  if (updateOrder.isError) {
    return (
      <Button
        variant='outline'
        color={"red"}
        uppercase
        onClick={updateOrder.reset}
      >
        Error de conexión
      </Button>
    );
  } else if(updateOrder.isLoading) {
    return (
      <Button
        variant='outline'
        color={"green"}
        uppercase
        disabled
        loading
      >
        Aprobando pedido
      </Button>
    );
  } else {
    return (
      <Button
        variant='outline'
        color={"green"}
        uppercase
        onClick={() => updateOrder.mutate(order_id)}
      >
        Aprobar pedido
      </Button>
    );
  }
};

export default ApproveOrderBtn;