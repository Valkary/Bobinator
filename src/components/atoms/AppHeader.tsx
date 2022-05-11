import React from "react";
import Logo from './Logo';

const AppHeader: React.FunctionComponent = ({}) => {
  return (
    <div className="flex justify-start content-center py-2 pl-5">
      <div className="mr-5">
        <Logo height={"6vh"} />
      </div>
      <h1 style={{ fontSize: '5vh', color: 'white', display: 'block', alignSelf: 'center', fontWeight: 'bold' }}>Bobinator</h1>
    </div>
);
};

export default AppHeader;