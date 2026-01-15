import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 group relative">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{product.name}</h2>
            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">
              ${product.price}
            </span>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {product.description?.substring(0, 60)}...
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Product;
