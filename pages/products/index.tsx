
import {useEffect, useState} from 'react';
import ProductCard from '../../src/components/ProductCard';
import Pagination from '../../src/components/Pagination';
import ProductFilter from '../../src/components/ProductFilter';
import prodData from '../../src/data/products.json'
import styles from './products.module.css'
import { filterData, paginateData } from '../../src/utils'

const PRODUCT_DATA = JSON.parse(JSON.stringify(prodData));;

const ProductListing = () => {
  const PAGE_SIZE = 20
  
  const [productList, setProductList] = useState([]);
  const [pageNumber,  setPageNumber] = useState(1);
  const [pageCount, setPageCount ] = useState(1);
  const[colorFilter, setColorFilter] = useState()
  const[minPriceFilter, setMinPriceFilter] = useState()
  const[maxPriceFilter, setMaxPriceFilter] = useState()
  const[categoryFilter, setCategoryFilter] = useState()
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    const dataset = PRODUCT_DATA.data.allContentfulProductPage.edges
    let filteredResult = filterData(dataset, colorFilter, minPriceFilter, maxPriceFilter, categoryFilter);
    setPageCount(Math.ceil(filteredResult.length / PAGE_SIZE))

    const result = filteredResult.length ? paginateData(filteredResult, pageNumber, pageCount, PAGE_SIZE) : []

    setProductList(result);

  }, [pageNumber, PAGE_SIZE, pageCount, colorFilter, minPriceFilter, maxPriceFilter, categoryFilter])

  const renderResult = () => (
    <>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={setPageNumber} activePage={pageNumber} />
      </section>
      <section className={styles.container}>
        { productList.length ? 
          productList.map((item, index) => {
            return ( <ProductCard {...item.node} key={index} />) 
          })
          : '' 
        }
      </section>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={setPageNumber} activePage={pageNumber} />
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
          setColorFilter={setColorFilter}
          setMinPriceFilter={setMinPriceFilter}
          setMaxPriceFilter={setMaxPriceFilter}
          setCategoryFilter={setCategoryFilter}
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
