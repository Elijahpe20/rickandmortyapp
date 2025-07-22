import { useRef, useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
	const inputRef = useRef(null);
	const [error, setError] = useState('');

	const handleSubmit = () => {
		const value = inputRef.current.value.trim();
		setError('');

		if (!value) {
			setError('Please enter a location id');
			return;
		}

		if (value < 1 || value > 126) {
			setError('Please enter a location id between 1 and 126');
			return;
		}

		onSearch(inputRef.current.value);
		inputRef.current.value = '';
	};

	return (
		<>
			<div className="form__container">
				<input
					type="text"
					placeholder="type a location id"
					ref={inputRef}
					className="form__input"
				/>
				<button onClick={handleSubmit} className="form__button">
					Search
				</button>
			</div>
			{error && <p className="error">{error}</p>}
		</>
	);
}

export default Search;
