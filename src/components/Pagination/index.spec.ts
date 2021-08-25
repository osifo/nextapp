import { useState, useEffect } from 'react';
import styles from './index.module.css';

type IPaginationProps = {
  pageCount: number
  gotoPage: (page: number) => void
}


const Pagination = (props: IPaginationProps) => {
  const [activePage, setActivePage] = useState(1);
  const [pageList, setPageList] = useState([HTMLElement])

  const handlePageChange = (number) => {
    console.log('page change')
    setActivePage(number) 
  };

  const renderPageCard = (number: string) => {
    return (<span onClick={handlePageChange}>{number}</span>);
  };


  useEffect(() => {
    const pages = new Array(props.pageCount).map(page => renderPageCard(page));
    setPageList([...pages]);
  }, [pageList, props.pageCount])


  return (
   <section className={styles.page_container}>
     {pageList}
  </section>
  );
}

Pagination.defaultProps = {
  pageCount: 1
}

export default Pagination;