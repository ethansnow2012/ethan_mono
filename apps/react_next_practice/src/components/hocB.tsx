import React from 'react';

interface ComponentAProps {
  textB: string;
}

const ComponentA: React.FC<ComponentAProps> = ({ textB }) => {
  return <div>Component A: {textB}</div>;
};

export default ComponentA;