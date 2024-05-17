import React, { createContext, useState, useContext, ReactNode } from 'react';


interface UserContextType {
  user: { name: string; age: number };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; age: number }>>;
}

// 創建一個用於存儲用戶信息的上下文
const UserContext = createContext<UserContextType | null>(null);

// 創建一個提供者組件
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ name: 'John Doe', age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 自定義 Hook 來使用上下文
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };