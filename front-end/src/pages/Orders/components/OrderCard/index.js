import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import StyledOrderCard from './styles';

const OrderCard = ({ id, status, saleDate, totalPrice }) => {
  const history = useHistory();

  const goToOrderDetails = () => {
    history.push(`/customer/orders/${id}`);
  };

  return (
    <StyledOrderCard onClick={ goToOrderDetails }>
      <div data-testid={ `customer_orders__element-order-id-${id}` }>{id}</div>
      <div data-testid={ `customer_orders__element-delivery-status-${id}` }>{status}</div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>{saleDate}</div>
      <div>{totalPrice}</div>
    </StyledOrderCard>
  );
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default OrderCard;
