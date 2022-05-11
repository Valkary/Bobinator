import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import { ProgressEmpty, ProgressOne, ProgressTwo, ProgressFull } from "@styled-icons/entypo";

const IconsArray = [ 
  <ProgressEmpty className=" h-12" />, 
  <ProgressOne className=" h-12" />, 
  <ProgressTwo className=" h-12" />, 
  <ProgressFull className=" h-12" />,
];

const ProgressIcons: React.FunctionComponent = ({}) => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  
  const changeIcon = () => {
    const array_lenght = IconsArray.length;
    const next_pos = selectedIcon === array_lenght - 1 ? 0 : selectedIcon + 1;
    setSelectedIcon(next_pos);
  };

  useInterval(changeIcon, 500);

  return (
    IconsArray[selectedIcon]
  );
};

export default ProgressIcons;