import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchCocktail, setSearchCocktail] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${url}${searchCocktail}`);
      const { drinks } = await res.json();

      console.log(drinks);
      if (drinks.length < 1) setCocktails([]);
      else {
        setCocktails(drinks);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, [searchCocktail]);

  return (
    <AppContext.Provider value={{ cocktails, loading }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
