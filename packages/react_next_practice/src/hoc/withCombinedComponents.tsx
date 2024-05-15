import React from 'react';

const withCombinedComponents = <P1 extends object, P2 extends object>(
  Component1: React.ComponentType<P1>,
  Component2: React.ComponentType<P2>
) => {
  const CombinedComponent: React.FC<P1 & P2> = (props) => {
    // Destructure the props for each component
    const { ...props1 } = props as P1;
    const { ...props2 } = props as P2;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Component1 {...props1} />
        <Component2 {...props2} />
      </div>
    );
  };

  return CombinedComponent;
};

export default withCombinedComponents;