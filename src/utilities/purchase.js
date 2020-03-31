import axios from 'axios';

const URI_STUB =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://www.chasingenglish.com';

const purchase = async (customer, lineItems) => {
  return await axios.post(`${URI_STUB}/shop`, { customer, lineItems });
};

export default purchase;
