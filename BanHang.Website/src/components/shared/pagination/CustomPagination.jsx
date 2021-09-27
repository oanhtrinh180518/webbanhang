import React, {useEffect, useState} from 'react';
import {Pagination} from 'react-bootstrap'

function CustomPagination({pagination,setPage, page}) {
  // console.log({pagination, setPage, page})
  const totalPage = Math.ceil(pagination.totalRecords / pagination.pageSize);
  const nextPage = () => {
    setPage(page + 1);
  }
  const prevPage = () => {
    setPage(page - 1);
  }
  const firstPage = () => {
    setPage(1);
  }
  const lastPage = () => {
    setPage(totalPage);
  }
  // console.log(page);
	useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])
  return (
    <>
      <Pagination>
        {
          page > 1 ? <><Pagination.Prev onClick={() => {
            prevPage();
          }} /></> :<><Pagination.Prev disabled={true}  /></>
        }
        {
          page <= 2 ? <></> : <Pagination.Item onClick={() => {
            firstPage()
          }}>{1}</Pagination.Item>
        }
        {
          page <= 3 ? <></>
          :
            <>
              <Pagination.Ellipsis />

            </>
        }
        {page >= 2 ? <Pagination.Item onClick={() => {
          prevPage()
        }}>{page-1}</Pagination.Item> : <></>}
        <Pagination.Item active>{page}</Pagination.Item>
        {
          page < totalPage ? <Pagination.Item onClick={() => {
            nextPage()
          }}>{page+1}</Pagination.Item> : <></>
        }

        {
          page <= totalPage - 3 ? <Pagination.Ellipsis /> : <></>
        }
        {
          page <= totalPage - 2 ? <Pagination.Item onClick={() => {
            lastPage()
          }}>{totalPage}</Pagination.Item> : <></>
        }
        {
          page < totalPage ?  <Pagination.Next onClick={() => {
            nextPage()
          }}/> : <Pagination.Next disabled={true} />
        }
      </Pagination>
    </>
  );
}

export default CustomPagination;