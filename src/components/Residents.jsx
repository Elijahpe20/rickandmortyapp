import { useState } from 'react';
import ResidentCard from './ResidentCard';
import './Residents.css';

function Residents({ residents = [] }) {
	const [currentPage, setCurrentPage] = useState(1);
	const residentsPerPage = 6;

	// Calcular índices para la paginación
	const indexOfLastResident = currentPage * residentsPerPage;
	const indexOfFirstResident = indexOfLastResident - residentsPerPage;
	const currentResidents = residents.slice(
		indexOfFirstResident,
		indexOfLastResident,
	);

	// Calcular número total de páginas
	const totalPages = Math.ceil(residents.length / residentsPerPage);

	// Funciones para cambiar página
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToPage = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Mostrar paginación solo si hay más de 6 residentes
	const showPagination = residents.length > residentsPerPage;

	return (
		<>
			<div className="residents">
				{currentResidents.map((resident) => (
					<ResidentCard key={resident} url={resident} />
				))}
			</div>

			{residents.length === 0 && (
				<p className="not--found">Not residents found</p>
			)}

			{showPagination && (
				<div className="pagination">
					<button
						className="pagination__button"
						onClick={goToPreviousPage}
						disabled={currentPage === 1}
					>
						← Previous
					</button>

					<div className="pagination__info">
						<span className="pagination__current">
							Page {currentPage} of {totalPages}
						</span>
						<span className="pagination__total">
							({residents.length} residents)
						</span>
					</div>

					<button
						className="pagination__button"
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
					>
						Next →
					</button>
				</div>
			)}
		</>
	);
}

export default Residents;
