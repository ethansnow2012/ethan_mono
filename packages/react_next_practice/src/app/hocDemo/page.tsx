
import React from 'react';
import WrappedWithExtraProp from '@/hoc/wrapped/wrappedWithExtraProp';
import WrappedCollapseWrapper from '@/hoc/wrapped/wrappedCollapseWrapper';
import WrappedWithDefaultProp from '@/hoc/wrapped/wrappedWithDefaultProp';
import WrappedAB from '@/hoc/wrapped/wrappedAB';

const Page: React.FC = () => {
  return (
    <div className='flex flex-col gap-2'>
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
      <div>
        <WrappedWithDefaultProp A={'A is here'}></WrappedWithDefaultProp>
      </div>
      <div>
        <WrappedAB textA={'A is here'} textB={'B is here'}></WrappedAB>
      </div>
    </div>
  );
};

export default Page;