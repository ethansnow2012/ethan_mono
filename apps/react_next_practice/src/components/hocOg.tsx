import React from 'react';

interface HocOgProps {
  extraProp: string;
  otherProp: string;
}

const HocOg: React.FC<HocOgProps> = ({ extraProp, otherProp }) => {
  return (
    <div>
        <div>og showing extra prop: {extraProp}</div>
        <div>other prop: {otherProp}</div>
    </div>
    
  );
};


export default HocOg;