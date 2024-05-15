import React from 'react';
import withCombinedComponents from '../withCombinedComponents';
import ComponentA from '@/components/hocA';
import ComponentB from '@/components/hocB';

const WrappedAB = withCombinedComponents(ComponentA, ComponentB);

export default WrappedAB;