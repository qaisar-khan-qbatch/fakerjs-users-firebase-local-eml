import React, { useState, useEffect } from 'react'

import Pagination from 'react-bootstrap/Pagination';

function PaginationComp(props: any) {

    const [paginateClick, setPaginateClick] = useState<any>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    
    const totalCount = props.total
    const { paginate } = props

    useEffect(() => {
        (setTotalPages(Math.ceil(totalCount / 10)))
    }, [totalCount])

    useEffect(() => {
        if (paginateClick) {
            paginate(paginateClick)
            setPaginateClick(false)
        }
    }, [paginateClick])

    const handlePaginateClick = (value: string) => {
        if (value === 'prev') {
            if (currentPage >= 1) {
                setCurrentPage(currentPage - 1)
                setPaginateClick(-1)
            }
        } else if (value === 'next') {
            if (currentPage <= totalPages) {
                setCurrentPage(currentPage + 1)
                setPaginateClick(1)
            }
        }
    }

    return (
        <Pagination className='add-user'>
            {
                currentPage !== 1 &&
                <Pagination.Prev onClick={() => handlePaginateClick('prev')} />
            }
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {
                currentPage < totalPages &&
                <>
                    <Pagination.Next onClick={() => handlePaginateClick('next')} />
                    <Pagination.Item disabled >{totalPages}</Pagination.Item>
                </>
            }
        </Pagination>
    );
}

export default PaginationComp;