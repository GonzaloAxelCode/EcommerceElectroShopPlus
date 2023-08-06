import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../redux/reducers/productsReducer";
import CardElqueleton from "../skeletons/CardElqueleton";

interface Props {
  products: any;
}
const ProductsSold: FC<Props> = ({ products }) => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto py-0 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-300">
            Lo mas vendidos
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block dark:text-zinc-300 "
          >
            Browse all favorites<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        {products === null || products === undefined || !products ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {[1, 2, 3].map((e: number) => {
              return <CardElqueleton key={e} />;
            })}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {products &&
              products !== null &&
              products !== undefined &&
              products.map((product: ProductType) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="group relative">
                    <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                      <img
                        src={product.get_thumbnail}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-md text-gray-700 dark:text-gray-800 dark:text-white">
                      <span className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xl text-gray-500 dark:text-white">
                      <b>${product.price}</b>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        )}

        <div className="mt-6 sm:hidden">
          <Link
            to="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Ver mas productos<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsSold;
