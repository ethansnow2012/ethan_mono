// src/hoc/withExtraProp.tsx
import React from 'react';

const withExtraProp = <P extends {}>(Component: React.ComponentType<P>) => {
    return (props:  Omit<P,'extraProp'>) => {
        return <Component {...props as P} extraProp="This is an extra prop" />;
    };
};

export default withExtraProp;