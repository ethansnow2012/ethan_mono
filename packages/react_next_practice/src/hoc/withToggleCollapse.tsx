import React, { useState, FC } from 'react';

interface WithToggleProps {
  isOpen?: boolean;
  onToggleCollapse?: () => void;
}

const withToggle = <P extends object>(Component: React.ComponentType<P>) => {
  const WithToggle: FC<Omit<P, keyof WithToggleProps>> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleCollapse = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Component
        {...(props as P)}
        isOpen={isOpen}
        onToggleCollapse={handleToggleCollapse}
      />
    );
  };

  return WithToggle;
};

export default withToggle;