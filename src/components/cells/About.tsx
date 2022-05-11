import React from 'react';

import AboutTitle from '../atoms/AboutTitle';
import AboutContent from '../atoms/AboutContent';

const About: React.FunctionComponent<{ enoughWidth: boolean }> = ({ enoughWidth }) => {
  return (
    <div className=" w-full h-full flex flex-col flex-no-wrap justify-start items-center pt-5 px-5 overflow-y-scroll">
      <AboutTitle />
      <AboutContent />
    </div>
  );
};

export default About;
