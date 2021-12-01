import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SellerOrdCard from '../components/SellerOrdCard';
import * as request from '../services/requests';

function Orders() {
  const [sales, setSales] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getSale = async () => {
      const saleData = await request.getSales(dataUser);
      setSales(saleData);
    };
    getSale();
  }, []);

  return (
    <section>
      <nav>
        <NavBar dataUser={ dataUser } />
      </nav>

      <div>
        {Object.values(sales).map((sale) => (
          <SellerOrdCard
            key={ sale.id }
            sale={ sale }
          />
        ))}
      </div>
    </section>
  );
}

export default Orders;
