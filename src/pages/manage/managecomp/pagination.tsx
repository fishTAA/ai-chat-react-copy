import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number; // Specify the maximum number of visible pages
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers.map((number) => (
        <li key={number}>
          <a
            className={`pagination-link ${currentPage === number ? "is-current" : ""}`}
            aria-label={`Goto page ${number}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </a>
        </li>
      ));
    }

    const visiblePages = Array.from(
      new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter((number) => number >= 1 && number <= totalPages))
    );

    return visiblePages
      .filter((number, index, array) => index === 0 || index === array.length - 1 || array[index] !== array[index - 1])
      .map((number, index) => (
        <React.Fragment key={index}>
          {index > 0 && number - visiblePages[index - 1] > 1 && (
            <li key={`ellipsis-${index}`}>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          )}
          <li key={number}>
            <a
              className={`pagination-link ${currentPage === number ? "is-current" : ""}`}
              aria-label={`Goto page ${number}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </a>
          </li>
        </React.Fragment>
      ));
  };

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a
        className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </a>
      <a
        className={`pagination-next ${currentPage === totalPages ? "is-disabled" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next page
      </a>
      <ul className="pagination-list">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
