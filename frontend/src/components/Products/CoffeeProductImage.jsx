import { getProductImageSource } from "../../lib/productMedia";

const CoffeeProductImage = ({
  product,
  alt,
  className = "",
  imageClassName = "",
  preferUploaded = false,
}) => {
  const src = getProductImageSource(product, { preferUploaded });

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt || product?.name || "Coffee product"}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
};

export default CoffeeProductImage;
