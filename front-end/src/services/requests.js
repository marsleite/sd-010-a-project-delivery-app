const methods = ['POST', 'GET'];
const contentType = ['application/json'];

async function postUser(userData, rota) {
  const response = await fetch(`http://localhost:3001/${rota}`, {
    method: methods[0],
    headers: { 'Content-Type': contentType[0] },
    body: JSON.stringify(userData),
  });

  const { token, data, message } = await response.json();
  return { token, data, message, status: response.status };
}

export async function postSell(saleData, rota, token) {
  const response = await fetch(`http://localhost:3001/${rota}`, {
    method: methods[0],
    headers: { 'Content-Type': contentType[0], Authorization: token },
    body: JSON.stringify(saleData),
  });

  const { sale, message } = await response.json();
  return { sale, message, status: response.status };
}

export async function getPruducts() {
  const response = await fetch('http://localhost:3001/customer/products');
  const data = await response.json();
  return { response, data };
}

export async function getSellers() {
  const response = await fetch('http://localhost:3001/customer/checkout');
  const data = await response.json();
  return { response, data };
}

export async function createSale(token, data) {
  const response = await fetch('http://localhost:3001/sales', {
    method: methods[0],
    headers: { 'Content-Type': contentType[0], Authorization: token },
    body: JSON.stringify(data),
  });

  const { saleId, message } = await response.json();
  return { saleId, message, status: response.status };
}

export async function getSales(dataUser) {
  const { token } = dataUser;
  const response = await fetch('http://localhost:3001/sales', {
    method: methods[1],
    headers: { 'Content-Type': contentType[0], Authorization: token },
  });

  const sales = await response.json();
  return sales;
}

export async function getSaleById(token, id) {
  const response = await fetch(`http://localhost:3001/sales/${id}`, {
    method: methods[1],
    headers: { 'Content-Type': contentType[0], Authorization: token },
  });

  const sale = await response.json();
  return sale;
}

export default postUser;
