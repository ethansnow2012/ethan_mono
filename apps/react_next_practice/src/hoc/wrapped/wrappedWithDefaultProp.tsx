// src/components/wrappedWithDefaultProp.tsx
import React from 'react';
import withDefaultProps from '../withDefaultProps';
import HocUnwrappedOg from '@/components/hocUnwrappedOg';

const WrappedDefaultProps = withDefaultProps(HocUnwrappedOg, {B: 'B to be default'});

export default WrappedDefaultProps;