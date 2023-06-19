import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  changeOwnerField,
  fetchSubmitOrder,
} from "../actions/actionCreators";

export default function CartPage() {
  const { items, owner, success, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleRemove = (name) => {
    dispatch(removeFromCart(name));
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    dispatch(changeOwnerField(id, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchSubmitOrder());
  };

  if (loading) return <h2 className="text-center">Отправка запроса...</h2>;
  if (success) return <h2 className="text-center">Успешная покупка</h2>;
  if (error) return <h2 className="text-center">Возникла ошибка</h2>;
  if (!items.length) return <h2 className="text-center">Корзина пуста</h2>;

  return (
    <React.Fragment>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.size}</td>
                <td>{item.count}</td>
                <td>{`${item.price} руб.`}</td>
                <td>{`${item.price * item.count} руб.`}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item.name)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{`${total} руб.`}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
                value={owner.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
                value={owner.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                required
              />
              <label
                className="form-check-label"
                htmlFor="agreement"
                onChange={handleChange}
              >
                Согласен с правилами доставки
              </label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Оформить
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}