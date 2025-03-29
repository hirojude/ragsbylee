function ProductCard({ product }) {
  // Now safe to use timestamps
  const createdAt = new Date(product.timestampCreate);
  
  return (
    <div>
      <h2>{product.title}</h2>
      <time dateTime={product.timestampCreate}>
        {createdAt.toLocaleDateString()}
      </time>
    </div>
  );
}

export default ProductCard;  