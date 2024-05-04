import { useEffect, useState } from "react"
import { Ingredients } from "./ingredients";
import { useParams } from "react-router";
import { Main } from "../../../Components/Main";
import { Recipe } from "../models";
import './styles.css';

export const RecipeDetails = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {id} = useParams(); 

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.meals) {
                    setRecipe(data.meals[0]);
                    setLoading(false);
                } else {
                    setErrorMessage('No recipe.');
                    setLoading(false);
                }
            }
            ).catch(err => {
                console.log(err)
            });
    }, [id])

   

    return (
        <>
            {loading &&  <h1>Loading...</h1>}
            {recipe ? (
                <Main className="recipe-details">
                    <h2>{recipe.strMeal.toUpperCase()}</h2>
                    <section className="img-ingredients">
                        <div className="recipe-ingredients">
                            <h3>Ingredients</h3>
                            <Ingredients recipe={recipe} />
                        </div>
                        <div className="recipe-img"><img alt={recipe.strMeal} src={recipe.strMealThumb} /></div>
                    </section>
                    <p className="recipe-text">{recipe.strInstructions}</p>
                </Main>

            ) : <h1>{errorMessage}</h1>
            }
        </>
    )
}