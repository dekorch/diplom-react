import React from "react";
import PropTypes from "prop-types";

export default function ProductItem({ item, isCatalog }) {
  const className = isCatalog ? "catalog-item-card card" : "card";

  return (
    <div className="col-4">
      <div className={className}>
        <div>
          <img
            src={item.images[0]}
            className="card-img-top img-fluid"
            alt={item.title}
          />
          <div className="card-body">
            <p className="card-text">{item.title}</p>
            <p className="card-text">{item.price} руб.</p>
            <a href={`/catalog/${item.id}`} className="btn btn-outline-primary">
              Заказать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.object,
};