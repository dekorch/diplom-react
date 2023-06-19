import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopSales } from "../actions/actionCreators";
import ProductItem from "./ProductItem.js";
import Loader from "./Loader";

export default function TopSales() {
  const { items, loading, error } = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <h2 class="text-center">Возникла ошибка</h2>;

  return items && items.length > 0 ? (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {items.map((o) => (
          <ProductItem key={o.id} item={o} isCatalog={false} />
        ))}
      </div>
    </section>
  ) : null;
}