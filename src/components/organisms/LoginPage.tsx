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

  if (enoughWidth) {
    return (
      <div className=' bg-darkBackground w-screen h-screen flex flex-col justify-center items-center overflow-hidden text-gray-50 font-code'>
        <div className=' w-2/3 pt-[30%] mt-[20%]'>
          <div className=' h-[30%] flex flex-col items-center justify-end pb-5'>
            <Logo height='50%'/>
            <p className=' text-4xl mt-3'>Bobinator Control System</p>
          </div>

          <form className=' w-full flex flex-col justify-center items-center' onSubmit={(e) => e.preventDefault()}>
            <div className=' h-full w-[40%]'>
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
              <div className=' w-full flex flex-row justify-center items-center mt-10 text-sm'>
                  <Button 
                    className=' w-full'
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
    )
  } else {
    return (
      <div className=' bg-darkBackground w-screen h-screen flex flex-col justify-center items-center overflow-hidden text-gray-50 font-code'>
        <div className=' w-2/3 pt-[30%]'>
          <div className=' h-[30%] flex flex-col items-center justify-end pb-5'>
            <Logo height='50%'/>
            <p className=' text-4xl mt-3'>Bobinator Control System</p>
          </div>

          <form className=' w-ful' onSubmit={(e) => e.preventDefault()}>
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
              <div className=' w-full flex flex-row justify-center items-center mt-10 text-sm'>
                  <Button 
                    className=' w-full'
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
    )
  }
};

export default LoginPage;