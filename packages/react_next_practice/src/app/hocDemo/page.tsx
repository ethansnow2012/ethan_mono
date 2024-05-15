
import React from 'react';
import WrappedWithExtraProp from '@/hoc/wrapped/wrappedWithExtraProp';

const Page: React.FC = () => {
  return (
    <div>
      <h1>HOC Demo</h1>
      <WrappedWithExtraProp otherProp={'other props still work'}/>
    </div>
  );
};

export default Page;