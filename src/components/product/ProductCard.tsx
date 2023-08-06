import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../redux/reducers/productsReducer";
interface Props {
  product: ProductType;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={product.get_thumbnail}
          alt=""
          className="w-full h-full object-center object-cover lg:w-full lg:h-full  border"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-white">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500"></p>
        </div>
        <p className="text-xl ml-5 font-medium text-gray-900 dark:text-white">
          <b>${product.price} </b>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
