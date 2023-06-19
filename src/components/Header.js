import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { changeSearchField } from "../actions/actionCreators";
import logo from "../img/header-logo.png";

const FIRST_INIT = {
  text: "",
  active: false,
};

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const [search, setSearch] = useState(FIRST_INIT);
  const novigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeField = (e) => {
    const { value } = e.target;
    setSearch((prev) => ({ ...prev, text: value }));
  };

  const onSearch = () => {
    if (search.active) {
      dispatch(changeSearchField(search.text));
      setSearch(FIRST_INIT);
      novigate("/catalog");
    } else setSearch((prev) => ({ ...prev, active: !search.active }));
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/info">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts">
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={onSearch}
                  ></div>
                  <NavLink
                    className="header-controls-pic header-controls-cart"
                    to="/cart"
                  >
                    {items && items.length !== 0 && (
                      <div className="header-controls-cart-full">
                        {items.length}
                      </div>
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </NavLink>
                </div>
                <form
                  data-id="search-form"
                  className={
                    search.active
                      ? "header-controls-search-form form-inline"
                      : "header-controls-search-form form-inline invisible"
                  }
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    onChange={onChangeField}
                    value={search.text}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}