import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutProductsTable from '../components/CheckoutProductsTable';
import DeliveryDetailsTable from '../components/DeliveryDetailsTable';
import NavBar from '../components/NavBar';
import { CartContext } from '../context/cart';
import * as requests from '../services/requests';

function Checkout() {
  const { cartStorage = {}, totalCart, setSaleDetail } = useContext(CartContext);
  const [sellers, setSellers] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [saleCreated, setSaleCreated] = useState(false);
  const [saleId, setSaleId] = useState();

  const dataUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getSellers = async () => {
      const { data } = await requests.getSellers();
      setSellers(data);
    };
    getSellers();
  }, []);

  const createSale = async () => {
    const sale = {
      ...deliveryDetails,
      total_price: totalCart.replace(',', '.'),
      products: Object.values(cartStorage),
    };

    const data = await requests.createSale(dataUser.token, sale);
    const CREATED_STATUS = 201;
    if (data.status === CREATED_STATUS) {
      setSaleId(data.saleId);
      setSaleCreated(true);
      localStorage.removeItem('carrinho');
    }
    // montando um objeto com todos os dados da vendo para mandar para o estado global
    // o problema está quando eu mando outro objeto sobrescreve o anterior
    setSaleDetail([
      ...saleDetail,
      {
        numPedido: data.saleId,
        vendedor: 'antonio',
        produtos: sale.products,
      },
    ]);
  };

  const handleChange = ({ target: { name, value } }) => {
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  if (saleCreated) {
    return <Redirect to={ `/customer/orders/${saleId}` } />;
  }

  return (
    <main>
      <NavBar dataUser={ dataUser } />
      <section>
        <h1>Finalizar Pedido</h1>
        <CheckoutProductsTable products={ cartStorage } />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          Total: R$
          {totalCart}
        </span>
      </section>
      <section>
        <h1>Detalhes da Entrega</h1>
        <DeliveryDetailsTable
          sellers={ sellers }
          handleChange={ handleChange }
        />
      </section>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ createSale }
        disabled={
          cartStorage ? !Object.keys(cartStorage).length : !cartStorage
        }
      >
        Finalizar Pedido
      </button>
    </main>
  );
}

export default Checkout;
