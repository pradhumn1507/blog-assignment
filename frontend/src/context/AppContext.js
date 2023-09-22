import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null);
  const [loading, isLoading] = useState(false);
  const [userName,setUserName] = useState("")
  const value = {
    blogs,
    setBlogs,
    loading,
    isLoading,
    setUserName,
    userName
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
