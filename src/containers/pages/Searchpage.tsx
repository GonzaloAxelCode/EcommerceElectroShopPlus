import React, { FC, useEffect, Fragment, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { ReducersStateType } from "../../redux/reducers";
import { ProductType } from "../../redux/reducers/productsReducer";
import { get_search_products } from "../../redux/actions/product";

import { Link } from "react-router-dom";
import CardElqueleton from "../../components/skeletons/CardElqueleton";

interface Props {
  search_products?: ProductType[] | null;
}

const SearchPage: FC<Props> = ({ search_products }) => {
  const [searchTerm, setSearchTerm] = useState<any>(
    localStorage.getItem("search_term")
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchTerm(localStorage.getItem("search_term"));
  }, [search_products]);

  return (
    <Layout>
      <div className="bg-white dark:bg-neutral-900">
        <div>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-800">
              <div className="">
                <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-400">
                    Busquedas para " <i>{searchTerm}</i> " (
                    {search_products?.length}) :
                  </h2>
                  {search_products === null ||
                  search_products === undefined ||
                  !search_products ? (
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {[1, 2, 3].map((e: number) => (
                        <CardElqueleton />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {search_products !== null &&
                        search_products !== undefined &&
                        search_products.map((product: ProductType) => (
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
                                  <h3 className="text-sm text-gray-700 dark:text-white">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 "
                                    />
                                    {product.name}
                                  </h3>
                                </div>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
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
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  search_products: state.Products.search_products,
});

export default connect(mapStateToProps, {
  get_search_products,
})(SearchPage);
