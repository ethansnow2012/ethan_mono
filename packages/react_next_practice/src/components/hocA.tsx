import React from 'react';

interface ComponentAProps {
  textA: string;
}

const ComponentA: React.FC<ComponentAProps> = ({ textA }) => {
  return <div>Component A: {textA}</div>;
};

export default ComponentA;