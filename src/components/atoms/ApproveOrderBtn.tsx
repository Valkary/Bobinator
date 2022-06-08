import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import { useMutation } from 'react-query';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const ApproveOrderBtn: React.FunctionComponent<{ order_id: number, prod_state: string }> = ({ order_id, prod_state }) => {
  const updateOrder = useMutation((order_id: number) => {
    return axios.post(`http://localhost:4000/production/update_order?id=${order_id}`);
  });  

  const handleApprove = () => {
    updateOrder.mutate(order_id);

    showNotification({
      title: 'Pedido aprobado correctamente',
      message: `El pedido no. ${order_id} ha sido aprobado de manera correcta en la base de datos`,
      color: 'green'
    });
  }

  const approveReset = () => {
    updateOrder.reset();

    showNotification({
      title: 'Pedido re-aprobado correctamente',
      message: `El pedido no. ${order_id} ha sido aprobado de manera correcta en la base de datos`,
      color: 'green'
    });
  }

  if (updateOrder.isError) {
    return (
      <Button
        variant='outline'
        color={"red"}
        uppercase
        onClick={approveReset}
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
        onClick={handleApprove}
      >
        Aprobar pedido
      </Button>
    );
  }
};

export default ApproveOrderBtn;