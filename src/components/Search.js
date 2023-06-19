import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../actions/actionCreators";

export default function Search() {
  const { searchText } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChangeField = (e) => {
    const { value } = e.target;
    dispatch(changeSearchField(value));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        value={searchText}
        onChange={onChangeField}
      />
    </form>
  );
}