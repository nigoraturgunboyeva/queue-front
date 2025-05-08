import React, { useState, useEffect } from 'react';
import Service from '../../service/service';
import './Card.css';

export default function ServiceCards({ selectedCatalog }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    try {
      const { data } = await Service.getCards();
      const filtered = selectedCatalog
        ? data.filter(card => card.catalog === selectedCatalog)
        : data;
      setCards(filtered);
    } catch (err) {
      console.error(err.message);
      setCards([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCards().finally(() => setLoading(false));

    const interval = setInterval(() => {
      fetchCards();
    }, 3000); // every 5 seconds

    return () => clearInterval(interval);
  }, [selectedCatalog]);

  return (
    <div className="cards-container">
      {loading ? (
        <p>Loading...</p>
      ) : cards.length > 0 ? (
        cards.map(card => (
          <div key={card._id} className="card">
            <h3>Nomi: {card.title}</h3>
            <p>Qishqacha: {card.description}</p>
            <h1>Navbat: {card.queue}</h1>
            <h5>Catalog: {card.catalog}</h5>
            <h5>Catalog: {card.price}</h5>
            <h5>Catalog: {card.product}</h5>
          </div>
        ))
      ) : (
        <p className="no-data">Ushbu katalog uchun hech qanday xizmatlar topilmadi.</p>
      )}
    </div>
  );
}
