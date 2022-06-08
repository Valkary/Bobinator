import React from 'react';
import { Settings2Outline } from '@styled-icons/evaicons-outline/Settings2Outline';
import { Production } from '@styled-icons/fluentui-system-filled/Production';
import { Archive } from '@styled-icons/bootstrap/Archive';
import { Dashboard } from '@styled-icons/boxicons-solid/Dashboard';
import { Server } from '@styled-icons/boxicons-regular/Server';
import { LogOutOutline } from 'styled-icons/evaicons-outline';
import { QuestionCircle } from '@styled-icons/bootstrap/QuestionCircle';

import { Link } from 'react-router-dom';
import Logo from './Logo';

const menuSections = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard className="text-gray-50" size="1.75em" />,
  },
  {
    title: 'Producción',
    path: '/production',
    icon: <Production className="text-gray-50" size="1.75em" />,
  },
  {
    title: 'Servidor',
    path: '/server',
    icon: <Server className="text-gray-50" size="1.75em" />,
  },
  {
    title: 'Bobinator App',
    path: '/about',
    icon: <QuestionCircle className="text-gray-50" size="1.75em" />,
  },
];

const Menu: React.FunctionComponent<{ enoughWidth: boolean }> = ({ enoughWidth }) => {
  if(enoughWidth) {
    return (
      <div className=" w-full h-full bg-gray-800 flex flex-col">
        <div className="px-8 flex-grow">
          <div className="h-16 w-full flex items-center mt-5">
            <Logo height="80%" />
            <h1 className=" text-gray-50 font-bold text-3xl pl-4">Bobinator</h1>
          </div>
          <ul className="mt-12">
            {menuSections.map((section) => {
              const { title, path, icon } = section;

              return (
                <Link to={path} key={path}>
                  <li className="flex w-full justify-between text-gray-300 hover:bg-gray-500 cursor-pointer items-center p-2 rounded-md mb-6">
                    <div className="flex items-center">
                      {icon}
                      <span className="text-md  ml-2">{title}</span>
                    </div>
                    <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                      :D
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="px-8 border-t border-gray-700">
          <ul className="w-full flex items-center justify-around bg-gray-800">
            <li className="cursor-pointer pt-5 pb-3">
              <Link to="/settings">
                <Settings2Outline className=" text-gray-50" size="1.25em" />
              </Link>
            </li>
            <li className="cursor-pointer pt-5 pb-3">
              <Link to="/vault">
                <Archive className=" text-gray-50" size="1.25em" />
              </Link>
            </li>
            <li className="cursor-pointer pt-5 pb-3">
              <Link to="/loggout">
                <LogOutOutline className=" text-gray-50" size="1.25em" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-around flex-no-wrap h-full bg-gray-800 items-center">
        <div className=' flex flex-row h-full items-center'>
          <Logo height={'50%'} />
          <h1 className=" text-gray-50 font-bold text-3xl pl-4">Bobinator</h1>
        </div>
        {menuSections.map((section) => {
          const { path, icon } = section;

          return (
            <Link to={path} key={path}>
              <div className=" h-full w-full text-gray-300 hover:bg-gray-500 cursor-pointer flex-grow p-5 rounded-full">
                {icon}
              </div>
            </Link>
          );
        })}
      </div>
    )
  }
};

export default Menu;
