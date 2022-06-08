import React, { useState } from 'react'
import 'tailwindcss/tailwind.css';
import './App.css';

import { SocketContext, socket } from './context/socket';

import { useMantineTheme, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Menu from './components/atoms/Menu';
import DisplayTerminal from './components/atoms/DisplayTerminal';
import About from './components/cells/About';
import Orders from './components/ecosystems/Orders';
import LoginPage from './components/organisms/LoginPage';
import Dashboard from './components/organisms/Dashboard';

const queryClient = new QueryClient();

const Router: React.FC<{ enoughWidth: boolean, setLoggedIn: React.SetStateAction<any> }> = ({ enoughWidth, setLoggedIn }) => {
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/server' element={<DisplayTerminal />} />
      <Route path='/about' element={<About enoughWidth={enoughWidth} />} />
      <Route path='/production' element={<Orders enoughWidth={enoughWidth}/>} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login' element={<LoginPage enoughWidth={enoughWidth} setLoggedIn={setLoggedIn} />}/>
    </Routes>
  );
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const theme = useMantineTheme();
  theme.colorScheme = 'dark';

  const [enoughWidth, setEnoughWidth] = useState(window.innerWidth >= 1920);

  const handleResize = () => {
    setEnoughWidth(window.innerWidth >= 1800);
  };

  window.addEventListener('resize', handleResize);

  if(loggedIn) {
    return (
      <HashRouter>
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <SocketContext.Provider value={socket}>
              <MantineProvider>
              {
                enoughWidth ?
                <div className={`grid grid-cols-main justify-items-start h-screen w-screen overflow-y-hidden`}>
                  <div className={`col-span-1 col-start-1 row-start-1 row-span-1 w-full h-full ${theme.colorScheme === "dark" ? 'bg-darkBackground' : 'bg-lightBackground'} flex flex-col border-r-2 border-gray-700`}>
                    <Menu enoughWidth={enoughWidth} />
                  </div>
                  <div className={`col-span-1 col-start-2 row-start-1 row-span-1 w-full h-full ${theme.colorScheme === "dark" ? 'bg-darkBackground' : 'bg-lightBackground'} overflow-auto`}>
                    <Router enoughWidth={enoughWidth} setLoggedIn={setLoggedIn} />
                  </div>
                </div> :
                <div className={` grid grid-cols-smMain grid-rows-smMain justify-items-start h-screen w-screen overflow-y-hidden ${theme.colorScheme === "dark" ? 'bg-darkBackground' : 'bg-lightBackground'}`}>
                  <div className=" col-start-1 row-start-1 w-full h-full">
                    <Router enoughWidth={enoughWidth} setLoggedIn={setLoggedIn} />
                  </div>
                  <div className=" col-start-1 row-start-2 border-t-2 border-gray-700 w-full h-full">
                    <Menu enoughWidth={enoughWidth} />
                  </div>
                </div>
              }
              </MantineProvider>
            </SocketContext.Provider>
          </QueryClientProvider>
        </NotificationsProvider>
      </HashRouter>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
          <MantineProvider>
            <LoginPage enoughWidth={enoughWidth} setLoggedIn={setLoggedIn}/>
          </MantineProvider>
        </SocketContext.Provider>
      </QueryClientProvider>
    )
  }
}

export default App;
