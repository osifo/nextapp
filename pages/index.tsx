
import {useEffect, useState} from 'react';
import ProductCard from '../src/components/ProductCard';
import Pagination from '../src/components/Pagination';
import ProductFilter from '../src/components/ProductFilter';
import prodData from '../src/data/products.json'
import styles from './products.module.css'
import { filter } from '../src/utils/filter' 
import { paginate } from '../src/utils/paginate'

const PRODUCT_DATA = JSON.parse(JSON.stringify(prodData));;

const ProductListing = () => {
  const PAGE_SIZE = 20
  
  const [productList, setProductList] = useState([]);
  const [pageNumber,  setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [activeFilters, setActiveFilters] = useState({})

  useEffect(() => {
    const dataset = PRODUCT_DATA.data.allContentfulProductPage.edges;
    loadProducts(dataset);
  }, [pageNumber, pageCount, activeFilters])


  const loadProducts = (dataset) => {
    let filteredResult = filter(dataset, activeFilters);
    
    const pageSize = filteredResult.length > PAGE_SIZE ? 
      PAGE_SIZE : 
      filteredResult.length;

    setPageCount(Math.ceil(filteredResult.length / pageSize));
    
    const result = filteredResult.length ? paginate(filteredResult, pageNumber, pageCount, pageSize) : [];

    setProductList(result);
  };

  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber)
  }
  

  const handleFilterAction = (filterCriteria) => {
    setActiveFilters(filterCriteria);
    loadProducts(productList);
  }
  
  const renderResult = () => (
    <>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={handlePageChange} activePage={pageNumber} />
      </section>
      <section className={styles.container}>
        { productList.length ? 
          productList.map((item, index) => (<ProductCard {...item.node} key={index} />))
          : '' 
        }
      </section>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={handlePageChange} activePage={pageNumber} />
      </section>
    </>
  );

  const renderEmpty = () => (
    <section>
      <p>Your search returned no results</p>
    </section>
  )

  return (
    <div>
      <h2>{ "This is the products listing page" }</h2>

      <section className={styles.filter}>
        <ProductFilter 
          triggerFilter={handleFilterAction}
          activePageFilters={activeFilters}
         />
      </section>
      {productList.length ? renderResult() : renderEmpty() }
    </div>
  );
  
}

export default ProductListing;



export async function getStaticProps(context) {
  // const {data} = matter(path.join(__dirname, '../', PRODUCT_LISTING_PATH))
  return {
    props: {
      products: ''
    }
  }
}
