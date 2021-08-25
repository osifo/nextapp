import { useState, useEffect } from 'react';
import styles from './index.module.css';

type IPaginationProps = {
  pageCount: number
  activePage: number
  gotoPage: (page: number) => void
}


const Pagination = ({ pageCount, activePage, gotoPage }: IPaginationProps) => {
  const [pageList, setPageList] = useState([])

  const renderPageCard = (page: number) => {
    return (
    <span 
      className={`${styles.page_item} ${page === activePage ? styles.active : '' }`}
      onClick={() => gotoPage(page)}
      key={page}>
        {page}
    </span>);
  };

  useEffect(() => {
    const pages = Array.from({length: pageCount}, (i, index) => renderPageCard(index+1))
    setPageList(pages);
  }, [pageCount, activePage]);


  return (
   <section className={styles.page_container}>
     {pageList}
  </section>
  );
}

// Pagination.defaultProps = {
//   pageCount: 1
// }

export default Pagination;