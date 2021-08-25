import Image from 'next/image';
import styles from './index.module.css'

type IProductProps = {
  name: string
  thumbnailImage: { file: { url: string } }
  colorFamily: [{ name: string }]
  categoryTags: [string]
  shopifyProductEu: any
  key: number
}
const imageLoader = ({ src, width, quality }) => {
  return `http://${src.replace(/^\/\//,'')}?w=${width}&q=${quality || 75}`
}
const ProductCard = (product: IProductProps) => (
  <section className={ styles.card }>
    <figure>
      <Image 
        loader={imageLoader}
        src={product.thumbnailImage.file.url}
        alt="product image" 
        height={400}
        width={400}
      />
      <figcaption className={styles.details}>
        <span className={styles.product_name}>{product.name}</span>
        <span className={styles.product_price}>{product.shopifyProductEu.variants.edges[0].node.price}</span>
      </figcaption>
    </figure>

  </section>
)
export default ProductCard;