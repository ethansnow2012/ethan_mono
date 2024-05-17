// src/hoc/withDefaultProps.tsx
import React from 'react';

type Without<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

const withDefaultProps = <P extends object, DP extends object>(
  Component: React.ComponentType<P>,
  defaultProps: DP
) => {
  type TypeWithDefaultProps = Without<P, DP> & Partial<DP>;

  const WithDefaultProps: React.FC<TypeWithDefaultProps> = (props) => {
    return <Component {...(defaultProps as DP)} {...(props as P)} />;
  };


  return WithDefaultProps;
};

export default withDefaultProps;