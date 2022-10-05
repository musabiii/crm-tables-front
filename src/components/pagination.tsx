import React, { FC } from "react";

interface PaginationProps {
  page: number;
  setPage: Function;
  infinityScroll: boolean;
  handleChangeInfinityScroll: Function;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  infinityScroll,
  handleChangeInfinityScroll,
}) => {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      <div className={`pagination-box ${!!infinityScroll?"pagination-disabled":""}`}>
        <div className="pagination-btn prev" onClick={handlePrevPage}>
          prev
        </div>
        <div className="pagination-btn current">{page}</div>
        <div className="pagination-btn next" onClick={handleNextPage}>
          next
        </div>
      </div>
      {/* <div className="pagination-infinoty">
        <input
          checked={infinityScroll}
          onChange={() => handleChangeInfinityScroll()}
          type="checkbox"
          name="scroll"
          id="scroll"
        />
        <label htmlFor="scroll">infinity</label>
      </div> */}
    </div>
  );
};
