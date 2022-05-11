import React from 'react';
import { Nodejs, Javascript, ReactLogo } from 'styled-icons/boxicons-logos';
import { LogoElectron } from '@styled-icons/ionicons-solid/LogoElectron';

const AboutTitle: React.FunctionComponent = () => {
  return (
    <div
      id="about_title"
      className=" w-full flex flex-row flex-no-wrap items-center justify-center"
    >
      <div>
        <Nodejs
          className={` h-title-icon text-node transform translate-y-10 hover:-translate-y-1 ease-in-out duration-300`}
        />
        <LogoElectron
          className={` h-title-icon text-electron transform hover:skew-x-12 ease-in-out duration-300`}
        />
      </div>
      <div>
        <h1 className={` text-5xl text-gray-50 font-bold font-code`}>
          Bobinator
        </h1>
      </div>
      <div className="">
        <Javascript
          className={` h-title-icon text-javascript transform hover:scale-110 ease-in-out duration-300`}
        />
        <ReactLogo
          className={` h-title-icon text-react transform translate-y-10 hover:rotate-180 ease-in-out duration-500`}
        />
      </div>
    </div>
  );
};

export default AboutTitle;
