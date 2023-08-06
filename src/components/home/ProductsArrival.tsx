import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../redux/reducers/productsReducer";
import CardElqueleton from "../skeletons/CardElqueleton";

interface Props {
  products: any;
}

const ProductsArrival: FC<Props> = ({ products }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-300">
          Lo mas reciente
        </h2>
        {products === null || products === undefined || !products ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3].map((e: number) => {
              return <CardElqueleton key={e} />;
            })}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products !== null &&
              products !== undefined &&
              products.map((product: ProductType) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="group relative">
                    <div className="border w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <img
                        src={product.get_thumbnail}
                        alt=""
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-md text-gray-700 dark:text-white">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 "
                          />
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xl font-medium text-gray-900 dark:text-white">
                        <b>${product.price}</b>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsArrival;
