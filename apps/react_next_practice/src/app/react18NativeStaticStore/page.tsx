import React, { useEffect } from 'react';
import StoreReact18NativeStaticStore from "@/components/storeReact18NativeStaticStore";


const Counter: React.FC = async () => {
  const { serverText } = await getData()
  return (
    <div>
      <StoreReact18NativeStaticStore serverText={serverText}></StoreReact18NativeStaticStore>
    </div>
  );
}

export default Counter;

async function getData() {
  return {
    serverText: 'I am server text'
  }
}

