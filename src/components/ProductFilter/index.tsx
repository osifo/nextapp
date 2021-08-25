import { useRef } from 'react';
import { Dispatch, SetStateAction } from "react";

import styles from './index.module.css'

type FilterProps = {
  colorName?: string
  priceMin?: string
  priceMax?: string
  categoryTags?: string
}

type ProductFilterProps = {
  activePageFilters: any
  triggerFilter: (filter: FilterProps) => void
}

const ProductFilter = (props: ProductFilterProps) => {
  const colorFilter = useRef(null);
  const minPriceFilter = useRef(null);
  const maxPriceFilter = useRef(null);
  const categoryFilter = useRef(null);

  const buildFilter = (colorName, priceMin, priceMax, categoryTags) => {
    const filterCriteria = {};

    if(colorName) filterCriteria['colorName'] = colorName;
    if(priceMin) filterCriteria['priceMin'] = priceMin;
    if(priceMax) filterCriteria['priceMax'] = priceMax;
    if(categoryTags) filterCriteria['categoryTags'] = categoryTags;

    return filterCriteria;
  }

  const handleFilterTrigger = () => {
    const colorValue = colorFilter.current.value;
    const minPriceValue = minPriceFilter.current.value;
    const maxPriceValue = maxPriceFilter.current.value;
    const categoryValue = categoryFilter.current.value

    const filterCriteria = buildFilter(colorValue, minPriceValue, maxPriceValue, categoryValue);
    props.triggerFilter(filterCriteria)

  }

  return (
    <>
      <header><label>Filter by:</label></header>
      <div className={styles.container}>
        <section className={styles.filter_group}>
          <label>Color </label>
          <input 
          type="text" 
          placeholder="enter color name" 
          data-filter="color"
          ref={colorFilter}
          />
        </section>
        <section className={styles.filter_group}>
          <label>Minimum price</label>
          <input 
            type="number" 
            min='0' 
            data-filter="price-min"
            ref={minPriceFilter}
          />
        </section>
        <section className={styles.filter_group}>
          <label>Minimum price</label>
          <input 
            type="number" 
            min='0'  
            data-filter="price-max"
            ref={maxPriceFilter}
          />
        </section>
        <section className={styles.filter_group}>
          <label>Category Tags</label>
          <input 
            type="text" 
            placeholder='enter tags separated by commas' 
            data-filter="categories"
            ref={categoryFilter}
          />
        </section>
        <section className={styles.filter_group}>
          <label></label>
          <button onClick={handleFilterTrigger}>Filter</button>
        </section>
      </div>
    </>
  )
}

export default ProductFilter;
