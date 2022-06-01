import React, { useState } from 'react'
import axios from 'axios';
import { useMutation } from 'react-query';
import { Button, Input } from '@mantine/core';


const OrderForm: React.FC = () => {
  const [metros, setMetros] = useState(1);
  const [isError, setIsError] = useState(false);

  const createOrder = useMutation((metros: number) => {
    return axios.post(`http://localhost:4000/production/create_order?metros=${metros}`);
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrder.mutate(metros);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input_val = e.currentTarget.value;
    const new_val = parseInt(input_val, 10);
    setIsError(false);

    if (isNaN(new_val)) {
      setMetros(new_val);
      return setIsError(true);
    } else if (new_val > 100) {
      return setMetros(100);
    } else if (new_val < 0) {
      return setIsError(true);
    }
    if (input_val.length >= 4) return;
    setMetros(new_val);
    if (input_val.length === 0) return setIsError(true);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className=' flex flex-row'>
      <Input
        type={'number'}
        min={1}
        max={100}
        step={1}
        placeholder={'Metros'}
        value={metros}
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        className='flex-grow'
      />
      <Button
        variant='outline'
        type='submit'
        disabled={isError}
      >Hacer Pedido!</Button>
    </form>
  )
}

export default OrderForm;