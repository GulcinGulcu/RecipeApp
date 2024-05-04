import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './styles.css';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
	setRecipes: any;
	setSearchError: any;
}

export const SearchBar = ({ setRecipes, setSearchError }: SearchBarProps) => {
	const [mainIngredient, setMainIngredient] = useState<string>('');
	const [inputError, setInputError] = useState<string | null>(null);
	const navigate = useNavigate();

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const cleansedInput = mainIngredient.trim().replace(/\s/g, '_');

		fetch(
			`https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleansedInput}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.meals && data.meals.length > 0) {
					setRecipes(data.meals);
					setSearchError(null);
					navigate(`/recipes/search/${cleansedInput}`);
				} else {
					setSearchError(
						`Could not find any meals with main ingredient ${mainIngredient}`
					);
					setRecipes([]);
				}
			});

	};

	useEffect(() => {
		if (mainIngredient) {
			const trimmedSearchInput = mainIngredient.trim();
			const numberOfSpaces = mainIngredient.length - trimmedSearchInput.length;
			if (numberOfSpaces > 1) {
				setInputError('Main ingredient should not have more than one white space in a row.');
			} else {
				setInputError(null);
			}
		}
	}, [mainIngredient]);

	return (
		<>
			<form className='search-form' onSubmit={handleSubmit}>
				<div className='search-box'>
					<input
						type='text'
						name='main-ingredient'
						id='main-ingredient'
						placeholder='Search...'
						onChange={(event) => setMainIngredient(event.target.value)}
					/>
					{inputError && <span className='input-error-message'>{inputError}</span>}
					<button type='submit' className='search-btn'><CiSearch /></button>
				</div>
			</form>
		</>
	);
};
