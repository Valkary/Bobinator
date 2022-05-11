import React, { useState, useRef } from 'react';
import Logo from '../atoms/Logo';

import { Input, Button } from '@mantine/core';
import { EyeFill, EyeSlashFill } from 'styled-icons/bootstrap';
import { useMutation } from 'react-query';
import axios from 'axios';


const LoginPage: React.FunctionComponent<{ enoughWidth: boolean, setLoggedIn: React.SetStateAction<any> }> = ({ enoughWidth, setLoggedIn }) => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = "Usuario o contraseña incorrectos!";
  const passwordInputRef = useRef<any>();

  const userMutation = useMutation((username: string) => {
    return axios.post(`http://localhost:4000/users/login_user?username=${username}&password=${password}`);
  });  

  if (userMutation.isSuccess) setLoggedIn(userMutation.data?.data?.success);

  const handleEyeClick = () => {
    passwordInputRef.current.type = !eyeOpen ? "text" : "password";
    setEyeOpen(!eyeOpen);
  };
  return (
    <div className=' bg-darkBackground w-screen h-screen grid grid-cols-loginFullCols grid-rows-6'>
      <div className=' bg-gray-600 col-start-2 row-start-2 row-span-3 rounded-2xl pt-10 font-code text-gray-50'>
        <div className=' max-h-10 flex flex-row'>
          <span className=' flex-grow bg-lightBackground max-h-[0.2rem] my-[1.15rem] ml-5' />
          <h1 className=' font-extrabold text-4xl px-6'>Bobinator Control App</h1>
          <span className=' flex-grow bg-lightBackground max-h-[0.2rem] my-[1.15rem] mr-5' />
        </div>
        <div className=' flex flex-col justify-center items-center mt-10 text-lg'>
          <form className=' w-2/3' onSubmit={(e) => e.preventDefault()}>
            <div className=' h-full'>
              <div className=' w-full'>
                <label htmlFor='username-input'>Nombre de usuario</label>
                <Input
                  className=' py-4'
                  placeholder=' Ingrese su nombre de usuario...'
                  id='username-input'
                  value={username}
                  onChange={(e: any) => setUsername(e.currentTarget.value)}
                />
              </div>
              <div className=' w-full mt-3'>
                <label htmlFor='password-input'>Contraseña</label>
                <div className=' flex flex-row items-center justify-center bg-[#2C2E33] h-full mt-4 pr-2 rounded-md'>
                  <Input
                    className=' flex-grow'
                    placeholder=' Ingrese su contraseña...'
                    id='password-input'
                    type={"password"}
                    ref={passwordInputRef}
                    value={password}
                    onChange={(e: any) => setPassword(e.currentTarget.value)}
                  />
                  {
                    !eyeOpen ?
                    <button
                    onClick={handleEyeClick}
                      >
                        <EyeFill size={"1.5rem"}/>
                      </button> :
                      <button
                      onClick={handleEyeClick}
                      >
                        <EyeSlashFill className='' size={"1.5rem"}/>
                      </button>
                  }
                </div>
              </div>
              {
                !userMutation.data?.data?.success &&
                <div className=' flex flex-row justify-end items-end text-sm text-red-500 underline underline-offset-2 mt-2 animate-pulse'>{errorMessage}</div>
              }
              <div className=' w-full flex flex-row justify-end items-end mt-10 text-sm'>
                  <Button 
                    variant='outline'
                    onClick={() => userMutation.mutate(username)}
                    loading={userMutation.isLoading}
                  >
                    Iniciar sesión
                  </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=' flex flex-col justify-center items-center col-start-3 row-start-2 row-span-4 py-10'>
        <div className=' h-full hover:rotate-2 transition-all duration-150'>
          <Logo height='90%'/>
        </div>
        <h1 className=' font-extrabold text-4xl px-6 text-gray-50 mt-8'>Bobinator</h1>
      </div>
    </div>
  )
};

export default LoginPage;