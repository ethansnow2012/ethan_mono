"use client"
import {UserProvider}  from "@/hook/myContext"
import ContextCustom from "@/components/contextCustom"


import React, { createContext, useState, useContext, ReactNode } from 'react';

const ContextCustomPage: React.FC = async () => {
    // const user = useUser()
    return (
      <UserProvider> 
        <ContextCustom></ContextCustom>
      </UserProvider>
    );
  }
  
  export default ContextCustomPage;