import { useEffect, useState } from 'react';
import api from '../services/api';

const HistoryPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get('/sales/')
      .then(response => setSales(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Sales History</h1>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            Sale {sale.id} - Total: ${sale.total} - {sale.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
