import { Routes, Route } from 'react-router-dom';
import { NewRecipe } from './modules/recipes/NewRecipe';
import { RegistrationForm } from './modules/user/RegistrationForm';
import { LoginForm } from './modules/user/LoginForm';
import { Settings } from './modules/user/Settings';
import { Header } from './Components/Header';
import { RecipeList } from './modules/recipes/RecipeList';
import { RecipeDetails } from './modules/recipes/RecipeDetails';
import { Home } from './Components/Home';
import { Navigate } from 'react-router-dom';
import { Recipe } from './modules/recipes/models';

interface AppRouterProps {
  recipes: Recipe[];
  setRecipes: any;
  setSearchError: any;
  searchError?: string;
}

export const AppRouter = ({
  recipes,
  setRecipes,
  setSearchError,
  searchError,
}: AppRouterProps) => {
  return (
    <Routes>
      <Route path='user'>
        <Route
          path='register'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <RegistrationForm />
            </>
          }
        />
        <Route
          path='login'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <LoginForm />
            </>
          }
        />
        <Route path='settings' element={<Settings />} />
      </Route>

      <Route path='admin'>
        <Route path='users'>
          <Route
            path=':id'
            element={<Navigate to='details' replace={true} />}
          />
          <Route
            path=':id/details'
            element={<h1>Details of the user with id :id</h1>}
          />
          <Route index element={<h1>List of all users</h1>} />
        </Route>
        <Route path='login' element={<LoginForm />} />
        <Route
          path='settings'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <Settings />
            </>
          }
        />
      </Route>

      <Route path='recipes'>
        <Route
          path='new'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <NewRecipe />
            </>
          }
        />
        <Route
          path=':id/details'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <RecipeDetails />
            </>
          }
        />
        <Route
          path='search/:input'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <RecipeList recipes={recipes} searchError={searchError} />
            </>
          }
        />
        <Route
          path='recipelist'
          element={
            <>
              <Header setRecipes={setRecipes} setSearchError={setSearchError} />
              <RecipeList recipes={recipes} searchError={searchError} />
            </>
          }
        />
        <Route index element={<Navigate to='/' replace={true} />} />
      </Route>

      <Route
        path='/'
        element={
          <>
            <Header setRecipes={setRecipes} setSearchError={setSearchError} />
            <Home />
          </>
        }
      />
    </Routes>
  );
};
