import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/CustomerNavBar';

function OrdersDetails({ match }) {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const { id } = match.params;
  const statsDTid = 'customer_order_details__element-order-details-label-delivery-status';

  async function getOrder() {
    const request = await axios.get(`http://localhost:3001/user/sale/${id}`);
    const mySale = request.data;
    setOrder(mySale);
  }

  async function setSaleStatus(status) {
    await axios.patch(`http://localhost:3001/sale/${id}`, { status });
    setOrderStatus(status);
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      <NavBar fixed="top" />
      <h3>Detalhe do Pedido</h3>
      <br />
      <Table>
        <th>
          PEDIDO 000
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {id}
          </span>
        </th>
        <th
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {order.seller}
        </th>
        <th
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {order.sale_date}
        </th>
        <th
          data-testid={ statsDTid }
        >
          {orderStatus}
        </th>
        <th>
          <Button
            variant="success"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ () => setSaleStatus('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </Button>
        </th>
      </Table>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            order.products.map((item, index) => (
              <tr key={ item.name }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { item.name }
                </td>
                <td>
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { item.quantity }
                  </span>
                </td>
                <td>
                  R$
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { item.price.replace('.', ',') }
                  </span>
                </td>
                <td>
                  R$
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { (item.price * item.quantity)
                      .toFixed(2).toString().replace('.', ',') }
                  </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

OrdersDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default OrdersDetails;
