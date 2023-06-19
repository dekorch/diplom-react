import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCatalogItem, addToCart } from "../actions/actionCreators";
import Loader from "../components/Loader";
import NotFoundPage from "./NotFoundPage";

export default function ProductItemPage() {
  const params = useParams();
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSizes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { item, loading, error } = useSelector((state) => state.catalogItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCatalogItem(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (item && item.sizes) setSizes(item.sizes.filter((i) => i.avalible));
  }, [item]);

  const handleSelectSize = (size) => {
    if (selectedSize === size) setSelectedSizes("");
    else setSelectedSizes(size);
  };

  const handleDecr = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleIncr = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleToCart = () => {
    const cart = {
      name: `${item.id}_${selectedSize}`,
      id: item.id,
      title: item.title,
      size: selectedSize,
      count: quantity,
      price: item.price,
    };
    dispatch(addToCart(cart));
    navigate("/cart");
  };

  if (loading) return <Loader />;
  if (!item) return <NotFoundPage />;
  if (error) return <h2 className="text-center">Возникла ошибка</h2>;

  return (
    <React.Fragment>
      {item && item.id ? (
        <section className="catalog-item">
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={item.images[0]}
                className="img-fluid"
                alt={item.title}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              {sizes.length > 0 ? (
                <React.Fragment>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {sizes.map((o) => (
                        <span
                          key={o.size}
                          className={
                            selectedSize === o.size
                              ? "catalog-item-size selected"
                              : "catalog-item-size"
                          }
                          onClick={() => handleSelectSize(o.size)}
                        >
                          {o.size}
                        </span>
                      ))}
                    </p>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={handleDecr}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">
                          {quantity}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={handleIncr}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    disabled={selectedSize === "" || quantity === 0}
                    onClick={handleToCart}
                  >
                    В корзину
                  </button>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  );
}