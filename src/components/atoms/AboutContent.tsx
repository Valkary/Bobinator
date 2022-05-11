import React from 'react';
import {
  Javascript,
  ReactLogo,
  TailwindCss,
  Nodejs,
} from 'styled-icons/boxicons-logos';
import { Typescript } from 'styled-icons/simple-icons';
import { Data } from '@styled-icons/boxicons-solid/Data';
import { Express } from 'styled-icons/simple-icons';
import { LogoElectron } from '@styled-icons/ionicons-solid/LogoElectron';

const AboutContent: React.FunctionComponent = () => {
  return (
    <div className=' mt-20 font-code text-lg text-gray-50 mb-20 max-h-full'>
      <p>Bobinator App es una aplicación para el rastreo, control, seguimiento y analisis de producción de una bobinadora automática en tiempo real.</p>
      <p className='  font-code text-xl font-bold underline mt-5'>Objetivo:</p>
      <p>Bobinator App muestra que la implementación de industria 4.0 e internet de las cosas en México para pequeñas y medianas empresas es posible a un precio razonable por medio de programación Web.</p>

      <p className='  font-code text-xl font-bold underline my-5'>¿Cómo funciona?</p>
      
      <div className=' w-full pl-5'>
        <div className=' hover:bg-gray-800 px-4 py-3 rounded-lg'>
          <p className='  font-code text-xl font-bold underline'>Frontend:</p>
          <div className=' flex flex-row flex-wrap w-full content-start mb-5'>
            <div className=' flex flex-row content-center justify-center'>
              <p>El frontend se refiere a la parte de la aplicación que esta en contacto directo con el usuario. Esta comprende todo con lo que el usuario puede ver o interactuar. Las tecnologías más prominentes utilizadas en esta aplicación son las siguientes:</p>
            </div>
            <div className=' w-full flex flex-row justify-center content-center pt-2'>
              <div className=' flex flex-row text-javascript content-center justify-center'>
                <p>Javascript</p> 
                <Javascript className=' h-8' />
              </div>,
              <div className=' flex flex-row text-electron content-center justify-center pl-2'>
                <p>Electron</p> 
                <LogoElectron className=' h-8' />
              </div>,
              <div className=' flex flex-row text-typescript content-center justify-center pl-2'>
                <p>TypeScript</p> 
                <Typescript className=' h-8 pl-2' />
              </div>,
              <div className=' flex flex-row text-react content-center justify-center pl-2 pr-2'>
                <p>React</p> 
                <ReactLogo className=' h-8' />
              </div>y
              <div className=' flex flex-row text-tailwind content-center justify-center pl-2'>
                <p>TailwindCSS</p> 
                <TailwindCss className=' h-8' />
              </div>.
            </div>
          </div>
        </div>

        <div className=' hover:bg-gray-800 px-4 py-3 rounded-lg'>
          <p className='  font-code text-xl font-bold underline'>Backend:</p>
          <div className=' flex flex-row flex-wrap w-full content-start mb-5'>
            <div className=' flex flex-row content-center justify-center'>
              <p>El backend de la aplicación comprende todo aquello que sucede del lado del servidor. Esto incluye; la creación de conexiones a la base de datos, autenticación de usuarios, peticiones de información al servidor, alteración de información guardada en la base de datos entre otras cosas. Las tecnologías de backend mas prominentes en Bobinator App son:</p>
            </div>
            <div className=' w-full flex flex-row justify-center content-center pt-2'>
              <div className=' flex flex-row text-node content-center justify-center'>
                <p>NodeJS</p> 
                <Nodejs className=' h-8' />
              </div>,
              <div className=' flex flex-row text-electron content-center justify-center pl-2 pr-2'>
                <p className=' text-mysql_1'>My</p> 
                <p className=' text-mysql_2'>Sql</p> 
                <Data className=' h-8' />
              </div>y
              <div className=' flex flex-row content-center justify-center pl-2'>
                <p>ExpressJS</p> 
                <Express className=' h-8 bg-lightBackground text-darkBackground px-1 ml-2' />
              </div>.
            </div>
          </div>
        </div>

        <div className=' hover:bg-gray-800 px-4 py-3 rounded-lg'>
          <p className='  font-code text-xl font-bold underline'>Hardware:</p>
          <div className=' flex flex-row flex-wrap w-full content-start'>
            <div className=' flex flex-row content-center justify-center'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eligendi nam itaque impedit optio inventore veritatis, maiores ut, voluptas eius et quae cum nulla cumque, odit cupiditate rerum delectus explicabo?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
