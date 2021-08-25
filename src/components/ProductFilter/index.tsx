import { useRef } from 'react';
import styles from './index.module.css'

type ProductFilterProps = {
  setColorFilter: (value: string) => void
  setMinPriceFilter: (value: string) => void
  setMaxPriceFilter: (value: string) => void
  setCategoryFilter: (value: string) => void
  activePageFilters: any[]
}

const ProductFilter = (props: ProductFilterProps) => {
  const colorFilter = useRef(null);
  const minPriceFilter = useRef(null);
  const maxPriceFilter = useRef(null);
  const categoryFilter = useRef(null);

  const handleFilterTrigger = () => {
    const colorFilterValue = colorFilter.current.value;
    const minPriceFilterValue = minPriceFilter.current.value;
    const maxPriceFilterValue = maxPriceFilter.current.value;
    const categoryFilterValue = categoryFilter.current.value;

    props.setColorFilter(colorFilterValue ? colorFilterValue : '' )
    props.setMinPriceFilter(minPriceFilterValue ? minPriceFilterValue : '' )
    props.setMaxPriceFilter(maxPriceFilterValue ? maxPriceFilterValue : '' )
    props.setCategoryFilter(categoryFilterValue ? categoryFilterValue.split(',') : [])

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
