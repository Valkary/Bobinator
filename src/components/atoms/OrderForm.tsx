import React, { useState } from 'react'
import axios from 'axios';
import { useMutation } from 'react-query';
import { Button, Input } from '@mantine/core';


const OrderForm: React.FC = () => {
  const [metros, setMetros] = useState(1);
  const [isInputError, setIsInputError] = useState(false);

  const { mutate, isError, isLoading } = useMutation((metros: number) => {
    return axios.post(`http://localhost:4000/production/create_order?metros=${metros}`);
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(metros);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input_val = e.currentTarget.value;
    const new_val = parseInt(input_val, 10);
    setIsInputError(false);

    if (isNaN(new_val)) {
      setMetros(new_val);
      return setIsInputError(true);
    } else if (new_val > 100) {
      return setMetros(100);
    } else if (new_val < 0) {
      return setIsInputError(true);
    }
    if (input_val.length >= 4) return;
    setMetros(new_val);
    if (input_val.length === 0) return setIsInputError(true);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className=' flex flex-row font-code justify-end items-center'>
      <p className=' text-gray-50 text-lg'>Metros:</p>
      <Input
        type={'number'}
        min={1}
        max={100}
        step={1}
        placeholder={'Metros'}
        value={metros}
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
      />
      <Button
        variant='outline'
        type='submit'
        disabled={isInputError}
        loading={isLoading}
        color={isError ? 'red' : 'blue'}
      >Crear orden</Button>
    </form>
  )
}

export default OrderForm;