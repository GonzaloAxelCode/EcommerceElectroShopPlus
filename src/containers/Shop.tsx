import React, { FC, useEffect } from "react";
import Layout from "../hocs/Layout";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { get_categories } from "../redux/actions/caegories";
import { get_products, get_filter_products } from "../redux/actions/product";
import { connect } from "react-redux";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { CategoryType } from "../redux/reducers/categoriesReducer";
import { ReducersStateType } from "../redux/reducers";
import { ProductType } from "../redux/reducers/productsReducer";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { prices } from "../helpers/fixedPrices";
import ProductEsqueleton from "../components/skeletons/ProductEsqueleton";
import CardElqueleton from "../components/skeletons/CardElqueleton";
interface Props {
  get_categories?: Function;
  get_products?: Function;
  get_filter_products?: Function;
  categories?: CategoryType[] | null;
  all_products?: ProductType[] | null;
  filtered_products: ProductType[] | null;
}

const Shop: FC<Props> = ({
  get_categories,
  categories,
  all_products,
  get_products,
  filtered_products,
  get_filter_products,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [changeFilter, setChangeFilter] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "0",
    price_range: "1 - 19",
    sort_by: "sold",
    order: "desc",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    get_categories?.();
    get_products?.();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setChangeFilter(true);
      setFiltered(true);
      await get_filter_products?.(category_id, price_range, sort_by, order);
      setChangeFilter(false);
    };
    fetch();
  }, [formData]);

  const { category_id, price_range, sort_by, order } = formData;
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setChangeFilter(true);
    await get_filter_products?.(category_id, price_range, sort_by, order);
    setChangeFilter(false);
    setFiltered(true);
  };
  const onChange = (e: any) => {
    setChangeFilter(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const ShowProducts = () => {
    let results = [];
    let display: any[] = [];
    if (
      filtered_products &&
      filtered_products !== null &&
      filtered_products !== undefined
    ) {
      filtered_products.map((product: ProductType, index: number) => {
        return display.push(
          <div key={index} className="">
            <ProductCard product={product} />
          </div>
        );
      });
    } else if (
      !filtered &&
      all_products &&
      all_products !== null &&
      all_products !== undefined
    ) {
      all_products.map((product: ProductType, index: number) => {
        return display.push(
          <div key={index} className="">
            <ProductCard product={product} />
          </div>
        );
      });
    }
    for (let i = 0; i < display.length; i += 3) {
      results.push(
        <div key={i} className="grid md:grid-cols-3 gap-x-8 mt-10">
          {display[i] ? display[i] : <div className=""></div>}
          {display[i + 1] ? display[i + 1] : <div className=""></div>}
          {display[i + 2] ? display[i + 2] : <div className=""></div>}
        </div>
      );
    }
    return results;
  };

  const FormOptions = (
    <>
      <h3 className="sr-only">Categories</h3>
      <ul role="list" className="font-medium text-gray-900 px-2 py-3">
        <div className="flex items-center h-5 my-5">
          <input
            onChange={(e) => onChange(e)}
            value={0}
            name="category_id"
            type="radio"
            checked={category_id === "0"}
            className="  cursor-pointer focus:ring-orange h-4 w-4 accent-orange-600 border-gray-300 rounded-full"
          />
          <label className="ml-3 min-w-0 flex-1 text-gray-400">All</label>
        </div>
        {categories &&
          categories !== null &&
          categories !== undefined &&
          categories.map((category: CategoryType) => {
            if (category.sub_categories.length === 0) {
              return (
                <div key={category.id} className="flex items-center h-5 my-5">
                  <input
                    onChange={(e) => onChange(e)}
                    value={category.id.toString()}
                    name="category_id"
                    type="radio"
                    className="focus:ring-orange h-4 w-4 accent-orange-600 border-gray-300 rounded-full cursor-pointer"
                  />
                  <label className="ml-3 min-w-0 flex-1 text-gray-400">
                    {category.name}
                  </label>
                </div>
              );
            } else {
              let result = [];
              result.push(
                <div key={category.id} className="flex items-center h-5">
                  <input
                    name="category_id"
                    type="radio"
                    className="focus:ring-orange h-4 w-4 accent-orange-600 border-gray-300 rounded-full cursor-pointer"
                    onChange={(e) => onChange(e)}
                    value={category.id.toString()}
                  />
                  <label className="ml-3 min-w-0 flex-1 text-gray-400">
                    {category.name}
                  </label>
                </div>
              );

              category.sub_categories.map((subcategory: CategoryType) => {
                result.push(
                  <div
                    key={subcategory.id}
                    className="flex items-center h-5 ml-5 my-5"
                  >
                    <input
                      name="category_id"
                      type="radio"
                      onChange={(e) => onChange(e)}
                      value={subcategory.id.toString()}
                      className="focus:ring-orange h-4 w-4 accent-orange-600 border-gray-300 rounded-full cursor-pointer"
                    />
                    <label className="ml-3 min-w-0 flex-1 text-gray-400">
                      {subcategory.name}
                    </label>
                  </div>
                );
              });
              return result;
            }
          })}
      </ul>

      <Disclosure
        as="div"
        className="border-t border-gray-200 dark:border-gray-800 px-4 py-6"
      >
        {({ open }) => (
          <>
            <h3 className="-mx-2 -my-3 flow-root">
              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 dark:bg-neutral-900">
                <span className="font-medium text-gray-900 dark:text-gray-400">
                  Precios
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-6">
                {prices &&
                  prices.map((price, index) => {
                    if (price.id === 0) {
                      return (
                        <div key={index} className="form-check">
                          <input
                            onChange={(e) => onChange(e)}
                            value={price.name}
                            name="price_range"
                            type="radio"
                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded-full accent-orange-600"
                            defaultChecked
                          />
                          <label className="ml-3 min-w-0 flex-1 text-gray-400 font-sofiapro-light">
                            {price.name}
                          </label>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="form-check">
                          <input
                            onChange={(e) => onChange(e)}
                            value={price.name}
                            name="price_range"
                            type="radio"
                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded-full cursor-pointer accent-orange-600"
                          />
                          <label className="ml-3 min-w-0 flex-1 text-gray-400 font-sofiapro-light">
                            {price.name}
                          </label>
                        </div>
                      );
                    }
                  })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure
        as="div"
        className="border-t border-gray-200 dark:border-gray-800  px-4 py-6"
      >
        {({ open }) => (
          <>
            <h3 className="-mx-2 -my-3 flow-root">
              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 dark:bg-neutral-900">
                <span className="font-medium text-gray-900 dark:text-gray-400">
                  Mas Filtros
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  <div className="form-group ">
                    <label
                      htmlFor="sort_by"
                      className="mr-3 min-w-0 flex-1 text-gray-500 dark:text-gray-400"
                    >
                      Ver por
                    </label>
                    <select
                      className="cursor-pointer my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-500 dark:bg-neutral-900 dark:border-gray-700 dark:text-gray-400"
                      id="sort_by"
                      name="sort_by"
                      onChange={(e) => onChange(e)}
                      value={sort_by}
                    >
                      <option value="date_created">Fecha</option>
                      <option value="price">Precio</option>
                      <option value="sold">Sold</option>
                      <option value="title">Nombre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="order"
                      className="mr-3 min-w-0 flex-1 text-gray-500 dark:text-gray-400"
                    >
                      Orden
                    </label>
                    <select
                      className=" cursor-pointer my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-500 dark:bg-neutral-900 dark:border-gray-700 dark:text-gray-400"
                      id="order"
                      name="order"
                      onChange={(e) => onChange(e)}
                      value={order}
                    >
                      <option value="asc">A - Z</option>
                      <option value="desc">Z - A</option>
                    </select>
                  </div>
                </div>
              </Disclosure.Panel>
            </h3>
          </>
        )}
      </Disclosure>
      <button
        type="submit"
        className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Buscar
      </button>
    </>
  );

  return (
    <Layout>
      <div className="bg-white dark:bg-neutral-900">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form
                    onSubmit={onSubmit}
                    className="mt-4 border-t border-gray-200"
                  >
                    <div>{FormOptions}</div>
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 ">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-400">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1"></div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form onSubmit={onSubmit} className="hidden lg:block">
                  <div>{FormOptions}</div>
                </form>

                {!filtered_products || changeFilter ? (
                  <div className="lg:col-span-3">
                    <div className="grid md:grid-cols-3 gap-x-8 mt-10">
                      {[1, 2, 3].map((e: number) => {
                        return <CardElqueleton key={e} />;
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-3  overflow-hidden">
                    {filtered_products && ShowProducts?.()}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  categories: state.Categories.categories,
  all_products: state.Products.products,
  filtered_products: state.Products.filtered_products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_filter_products,
})(Shop);
