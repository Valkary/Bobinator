import React, { useState, useEffect, useRef } from 'react';

export const LimitedTimeComponent: React.FunctionComponent<{ WrappedComponent: any, delay: number }> = ({ WrappedComponent, delay }) => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef: any = useRef(null);
  
  useEffect(() => {
    console.log("here!");
    setIsVisible(true);
    timeoutRef.current = setTimeout(
      () => setIsVisible(false),
      delay
    );

    return () => clearTimeout(timeoutRef.current);
  }, [ WrappedComponent, delay ]);

  if (!isVisible) {
    return null;
  }

  return <WrappedComponent />;
};