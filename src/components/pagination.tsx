import React, { FC } from 'react'

interface PaginationProps {
  page:number,
  setPage:Function
}

export const Pagination:FC<PaginationProps>=({page,setPage})=> {

  const handlePrevPage = () => {
    if (page>1) {
      setPage(page-1)
    }
  }

  const handleNextPage = () => {
    setPage(page+1)
  }

  return (
    <div className='pagination'>

      <div className="pagination-btn prev" onClick={handlePrevPage}>prev</div>
      <div className="pagination-btn current">{page}</div>
      <div className="pagination-btn next" onClick={handleNextPage}>next</div>

    </div>
  )
}
