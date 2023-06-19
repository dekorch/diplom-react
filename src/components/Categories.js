import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, changeCategories } from "../actions/actionCreators";
import Loader from "../components/Loader";

export default function Categories() {
  const { categories, categorie, categoriesLoading, categoriesError } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (id) => {
    dispatch(changeCategories(id));
  };

  if (categoriesLoading) return <Loader />;
  if (categoriesError) return <h2 class="text-center">Возникла ошибка</h2>;

  return (
    <React.Fragment>
      {categories && (
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a
              className={categorie === "" ? "nav-link active" : "nav-link"}
              href="#"
              onClick={() => handleChange("")}
            >
              Все
            </a>
          </li>
          {categories.map((o) => (
            <li className="nav-item" key={o.id}>
              <a
                className={categorie === o.id ? "nav-link active" : "nav-link"}
                href="#"
                onClick={() => handleChange(o.id)}
              >
                {o.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}