import { useEffect, useState } from 'react';
import { AppRouter } from './AppRouter';
import { Recipe } from './modules/recipes/models';
import './App.css';

export const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchError, setSearchError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const DB_URL =
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    fetch(DB_URL)
      .then((data) => data.json())
      .then((recipeData) => setRecipes(recipeData.meals));
  }, []);

  return (
    <AppRouter
      recipes={recipes}
      setSearchError={setSearchError}
      setRecipes={setRecipes}
      searchError={searchError}
    />
  );
};
