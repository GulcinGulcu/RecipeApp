export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: Categories;
  strArea: Areas;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: `strIngredient${number}`]: string | undefined; // This syntax allows to include index signatures for dynamic properties
  [key: `strMeasure${number}`]: string | undefined; // This syntax allows to include index signatures for dynamic properties
  strSource: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export enum Categories {
  Main = 'Main',
  Dessert = 'Dessert',
  Beef = 'Beef',
  Chicken = 'Chicken',
}

export const allCategories = [
  Categories.Beef,
  Categories.Chicken,
  Categories.Dessert,
];

export enum Areas {
  British = 'British',
  Indian = 'Indian',
  Canada = 'Canada',
  Malaysian = 'Malaysian',
  Turkish = 'Turkish',
}
