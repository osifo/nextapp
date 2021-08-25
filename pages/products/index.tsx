
import {useEffect, useState} from 'react';
import ProductCard from '../../src/components/ProductCard';
import Pagination from '../../src/components/Pagination';
import prodData from '../../src/data/products.json'
import styles from './products.module.css'
import { filterData, paginateData } from '../../src/utils'
const PAGE_SIZE = 20

const ProductListing = () => {
  const fileData = JSON.parse(JSON.stringify(prodData));
  const [productList, setProductList] = useState([]);
  const [pageNumber,  setPageNumber] = useState(1);
  const [pageCount, setPageCount ] = useState(1);

  useEffect(() => {
    const dataset = fileData.data.allContentfulProductPage.edges
    setPageCount(Math.ceil(dataset.length / PAGE_SIZE))

    const paginatedResult = paginateData(dataset, pageNumber, pageCount, PAGE_SIZE)
    setProductList(paginatedResult);

  }, [pageNumber, PAGE_SIZE, pageCount])
  
  return (
    <div>
      <h2>{ "This is the products listing page" }</h2>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={setPageNumber} activePage={pageNumber} />
      </section>
      <section className={styles.container}>
        { productList.map((item, index) => <ProductCard {...item.node} key={index} />) }
      </section>
      <section className={styles.pager}>
        <Pagination pageCount={pageCount} gotoPage={setPageNumber} activePage={pageNumber} />
      </section>
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
