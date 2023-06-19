import React from "react";
import PropTypes from "prop-types";
import Categories from "./Categories.js";
import ProductList from "./ProductList.js";
import Search from "./Search.js";

export default function Catalog({ withSearch }) {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withSearch && <Search />}
      <Categories />
      <ProductList />
    </section>
  );
}

Catalog.propTypes = {
  withSearch: PropTypes.bool,
};