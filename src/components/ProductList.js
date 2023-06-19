import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCatalog, fetchLoadMore } from "../actions/actionCreators";
import ProductItem from "./ProductItem.js";
import Loader from "./Loader";

export default function ProductList() {
  const { items, categorie, searchText, loading, error, loadMore } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch, categorie, searchText]);

  const onLoadMore = () => {
    dispatch(fetchLoadMore());
  };

  if (loading) return <Loader />;
  if (error) return <h2 className="text-center">Возникла ошибка</h2>;
  if (!items.length) return <h2 className="text-center">Ничего не найдено</h2>;

  return (
    <React.Fragment>
      <div className="row">
        {items.map((o) => (
          <ProductItem key={o.id} item={o} isCatalog={true} />
        ))}
      </div>
      <div className="text-center">
        {loadMore && (
          <button className="btn btn-outline-primary" onClick={onLoadMore}>
            Загрузить ещё
          </button>
        )}
      </div>
    </React.Fragment>
  );
}