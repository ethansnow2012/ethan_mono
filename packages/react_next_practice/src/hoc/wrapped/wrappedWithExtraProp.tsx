// src/components/wrappedWithExtraProp.tsx
import React from 'react';
import withExtraProp from '../withExtraProp';
import HocOg from '@/components/hocOg';

const WrappedWithExtraProp = withExtraProp(HocOg);

export default WrappedWithExtraProp;