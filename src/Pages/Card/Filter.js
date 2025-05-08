import React, { useEffect, useState } from 'react';
import Service from '../../service/service';
import './Card.css';

export default function CatalogFilter({ onSelect }) {
  const [catalogs, setCatalogs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const getAllCatalogs = async () => {
      try {
        const data = await Service.getCategory(); // Make sure this returns array of strings or objects with `title`
        setCatalogs(data);
      } catch (err) {
        console.error('Failed to fetch catalogs:', err.message);
      }
    };
    getAllCatalogs();
  }, []);

  const handleClick = (catalogTitle) => {
    setActive(catalogTitle);
    onSelect(catalogTitle);
  };

  return (
    <div className="service-filter-wrapper">
      <div className="service-filter">
        <button
          className={active === null ? 'active' : ''}
          onClick={() => handleClick(null)}
        >
          All
        </button>
        {catalogs.map((cat) => (
          <button
            key={cat._id || cat.title}
            className={active === cat.title ? 'active' : ''}
            onClick={() => handleClick(cat.title)}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
