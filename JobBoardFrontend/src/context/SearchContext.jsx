import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0); 

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchTrigger, setSearchTrigger }}>
      {children}
    </SearchContext.Provider>
  );
};
