import { useEffect, useState } from 'react';
import { useFetchApi } from './hooks/useFetchApi';
import { getRandomLocationById } from './lib/utils';
import Location from './components/Location';
import Residents from './components/Residents';
import Search from './components/Search';
import './App.css';

const BASE_URL = 'https://rickandmortyapi.com/api/location/';

function App() {
	const { fetchingData, data: location, loading } = useFetchApi();

	const [locationId, setLocationId] = useState(getRandomLocationById());

	useEffect(() => {
		fetchingData(`${BASE_URL}${locationId}`);
	}, [locationId]);

	const handleSearch = (newLocationId) => {
		setLocationId(newLocationId);
	};

	return (
		<>
			<header className="header" />
			<main>
				{/* Search section*/}
				<section className="section">
					<div className="container">
						<Search onSearch={handleSearch} />
					</div>
				</section>
				{/* Location section*/}
				<section className="section">
					<div className="container">
						{loading ? <h2>Loading...</h2> : <Location location={location} />}
					</div>
				</section>

				{/* Residents section*/}
				<section className="section">
					<div className="container">
						{location && location.residents && (
							<Residents residents={location.residents} />
						)}
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
