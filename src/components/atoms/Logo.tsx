import React from 'react';

const Logo: React.FunctionComponent<{ height: string }> = ({ height }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 300 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="50" fill="#F8C56B" />
      <rect x="150" width="150" height="50" fill="#D8A14F" />
      <rect y="400" width="150" height="50" fill="#F8C56B" />
      <rect x="150" y="400" width="150" height="50" fill="#D8A14F" />
      <rect x="25" y="50" width="125" height="350" fill="#F5F2F1" />
      <rect x="150" y="50" width="125" height="350" fill="#EDDFD2" />
      <path d="M25 50V123.312L150 144.156V74.6172L25 50Z" fill="#ECE0D4" />
      <path d="M275 165V99.2344L150 74.6172V144.156L275 165Z" fill="#C6B3B0" />
      <path d="M25 280V353.312L150 374.156V304.617L25 280Z" fill="#ECE0D4" />
      <path d="M275 395V329.234L150 304.617V374.156L275 395Z" fill="#C6B3B0" />
      <path d="M25 165V238.312L150 259.156V189.617L25 165Z" fill="#ECE0D4" />
      <path d="M275 280V214.234L150 189.617V259.156L275 280Z" fill="#C6B3B0" />
    </svg>
  );
};

export default Logo;
