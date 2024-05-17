import React from 'react';

interface hocUnwrappedOgProps {
  A: string;
  B: string;
}

const hocUnwrappedOg: React.FC<hocUnwrappedOgProps> = ({ A, B }) => {
  return (
    <div>
        <div>A: {A}</div>
        <div>B: {B}</div>
    </div>
    
  );
};


export default hocUnwrappedOg;