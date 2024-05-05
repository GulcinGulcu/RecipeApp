import { useForm } from 'react-hook-form';
import { v4 as createId } from 'uuid';
import { useState } from 'react';
import { ConfirmMessage } from '../../../Components/ConfirmMessage';
import { Main } from '../../../Components/Main';
import { Categories } from '../models';
import './styles.css';

interface FormValues {
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: Categories;
  strInstructions: string;
  ingredientsAndMeasures: string;
  strArea: string;
  strMealThumb: string;
  strTags: string;
  strIngredients?: string;
}

export const NewRecipe = () => {
  const [confirmMessage, setComfirmMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const ingredientIndexes = Array.from({ length: 20 }, (_, i) => i + 1);

  const onFormSubmit = (data: FormValues) => {
    const ingredientAndMeasures = data.strIngredients
      ?.replaceAll(' ', '')
      .split(',');

    const splittedIngredients: any[] = [];
    ingredientAndMeasures?.forEach((item) => {
      splittedIngredients.push(item.split('-'));
    });

    const ingredients = ingredientIndexes.map((ingIndex) => {
      return {
        [`strIngredient${ingIndex}`]: splittedIngredients[ingIndex - 1]
          ? splittedIngredients[ingIndex - 1][0]
          : '',
      };
    });
    const measures = ingredientIndexes.map((ingIndex) => {
      return {
        [`strMeasure${ingIndex}`]: splittedIngredients[ingIndex - 1]
          ? splittedIngredients[ingIndex - 1][1]
          : '',
      };
    });

    ingredients.forEach((ing) => {
      Object.assign(data, ing);
    });

    measures.forEach((measure) => {
      Object.assign(data, measure);
    });

    delete data.strIngredients;
    console.log({ ...data, idMeal: createId() });
    setComfirmMessage(true);
  };

  const MealCategory = ['Dessert', 'Main Dish', 'Side Dish'];
  const areaOfRecipe = [
    'British',
    'French',
    'Turkish',
    'American',
    'Italian',
    'Chinese',
    'Indian',
    'German',
    'Other',
  ];

  return (
    <Main className='main-pattern'>
      {confirmMessage ? (
        <ConfirmMessage title='Your recipe is saved!' />
      ) : (
        <form
          noValidate
          className='recipe-form'
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strMeal'>Recipe Name</label>
              <input
                id='strMeal'
                type='text'
                placeholder='Pasta with souce'
                {...register('strMeal', { required: true, minLength: 5 })}
              />
            </div>
            {errors.strMeal?.type === 'required' && (
              <span className='error-message'>Recipe Name is required</span>
            )}
            {errors.strMeal && errors.strMeal.type === 'minLength' && (
              <span className='error-message'>
                Recipe Name should be at least 5 characters long
              </span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strDrinkAlternate'>Drink Alternate</label>
              <input
                id='strDrinkAlternate'
                type='text'
                placeholder='Lemonade'
                {...register('strDrinkAlternate')}
              />
            </div>
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strCategory'>Category</label>
              <select
                id='strCategory'
                {...register('strCategory', { required: 'Choose a category' })}
              >
                <option value=''>Select Category</option>
                {MealCategory.map((category) => (
                  <option
                    key={category.replaceAll(' ', '')}
                    value={category.replaceAll(' ', '')}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {errors.strCategory && (
              <span className='error-message'>
                {errors.strCategory.message}
              </span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strInstructions'>Instructions</label>
              <textarea
                id='strInstructions'
                placeholder='Instructions here...'
                {...register('strInstructions', {
                  required: 'Instructions are required',
                  minLength: {
                    value: 50,
                    message:
                      'Please enter Instructions at least 50 characters long',
                  },
                })}
              />
            </div>
            {errors.strInstructions && (
              <span className='error-message'>
                {errors.strInstructions.message}
              </span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor=''>Ingredients and measures</label>
              <textarea
                placeholder='Milk - 500ml, eggs - 2, sugar - 2 tbsp'
                {...register('strIngredients', {
                  required: 'Ingredients are required',
                  minLength: {
                    value: 10,
                    message: 'Please enter ingredients and measures',
                  },
                })}
              />
            </div>
            {errors.strIngredients && (
              <span className='error-message'>
                {errors.strIngredients.message}
              </span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strArea'>Area</label>
              <select
                id='strArea'
                {...register('strArea', { required: 'Please, choose an area' })}
              >
                <option value=''>Select Area</option>
                {areaOfRecipe.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            {errors.strArea && (
              <span className='error-message'>{errors.strArea.message}</span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strMealThumb'>Photo of the recipe</label>
              <input
                type='text'
                id='strMealThumb'
                placeholder='URL of the photo'
                {...register('strMealThumb', { required: 'Photo is required' })}
              />
            </div>
            {errors.strMealThumb && (
              <span className='error-message'>
                {errors.strMealThumb.message}
              </span>
            )}
          </fieldset>
          <fieldset className='fieldset'>
            <div className='input-area'>
              <label htmlFor='strTags'>Tags</label>
              <input
                type='text'
                id='strTags'
                placeholder='Pudding, dessert'
                {...register('strTags', { required: 'Tags are required.' })}
              />
            </div>
            {errors.strTags && (
              <span className='error-message'>{errors.strTags.message}</span>
            )}
          </fieldset>

          <button type='submit' className='save-recipe-btn'>
            Save Recipe
          </button>
        </form>
      )}
    </Main>
  );
};
