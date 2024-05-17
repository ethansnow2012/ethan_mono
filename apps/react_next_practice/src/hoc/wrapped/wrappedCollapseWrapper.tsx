"use client"
import HocCollapseWrapper from '@/components/hocCollapseWrapper';
import withToggleCollapse from '@/hoc/withToggleCollapse';

const WrappedCollapseWrapper = withToggleCollapse(HocCollapseWrapper);

export default WrappedCollapseWrapper;