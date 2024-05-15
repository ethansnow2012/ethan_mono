
import React from 'react';
import WrappedWithExtraProp from '@/hoc/wrapped/wrappedWithExtraProp';
import WrappedCollapseWrapper from '@/hoc/wrapped/wrappedCollapseWrapper';

const Page: React.FC = () => {
  return (
    <div>
      <h1>HOC Demo</h1>
      <div>
        <WrappedWithExtraProp otherProp={'other props still work'}/>
      </div>
      <div>
      <WrappedCollapseWrapper title={'sdfadfas'} >
        <div>conte
            sdfadsfdasfas
            sdfasf
            dsfasdfnt</div>
      </WrappedCollapseWrapper>
      </div>
    </div>
  );
};

export default Page;