import React, { FC, useEffect } from "react";
import Layout from "../hocs/Layout";
import { ProductType } from "../redux/reducers/productsReducer";
import { connect } from "react-redux";
import { ReducersStateType } from "../redux/reducers";
import Banner from "../components/home/Banner";
import {
  get_products_by_arrival,
  get_products_by_sold,
} from "../redux/actions/product";
import ProductsArrival from "../components/home/ProductsArrival";
import ProductsSold from "../components/home/ProductsSold";
interface Props {
  get_products_by_arrival?: Function;
  get_products_by_sold?: Function;
  products_by_sold?: ProductType[] | null;
  products_arrival?: ProductType[] | null;
}

const Home: FC<Props> = ({
  get_products_by_arrival,
  get_products_by_sold,
  products_by_sold,
  products_arrival,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_products_by_arrival && get_products_by_arrival();
    get_products_by_sold && get_products_by_sold();
  }, []);
  return (
    <Layout>
      <Banner />
      <ProductsArrival products={products_arrival} />
      <ProductsSold products={products_by_sold} />
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  products_arrival: state.Products.products_arrival,
  products_by_sold: state.Products.products_sold,
});
export default connect(mapStateToProps, {
  get_products_by_sold,
  get_products_by_arrival,
})(Home);
