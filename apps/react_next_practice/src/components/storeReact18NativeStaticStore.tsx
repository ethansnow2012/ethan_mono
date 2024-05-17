"use client";
import React, { useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import { getState, setState, subscribe } from '@/store/native/static/counterStoreWithText';

interface Props {
    serverText: string
}

const StoreReact18NativeStaticStore: React.FC<Props> = ({serverText}) => {
    const count = useSyncExternalStore(subscribe, getState);
    useEffect(() => {
        setState(0, serverText)
      },[])
  return <div>
            <div>
                StoreReact18NativeStaticStore
            </div>
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setState(count + 1)}>Increment</button>
                <button onClick={() => setState(count - 1)}>Decrement</button>
            </div>
            <div>
                {serverText}
            </div>
        </div>;
};

export default StoreReact18NativeStaticStore;