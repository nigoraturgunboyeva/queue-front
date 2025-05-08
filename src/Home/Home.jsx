import React, { useState } from 'react';
import CatalogFilter from '../Pages/Card/Filter';
import ServiceCards from '../Pages/Card/Card';

export default function Home() {
  const [selectedCatalog, setSelectedCatalog] = useState(null);

  const handleCatalogSelect = (catalog) => {
    setSelectedCatalog(catalog);
  };

  return (
    <div>
      <CatalogFilter onSelect={handleCatalogSelect} />
      <ServiceCards selectedCatalog={selectedCatalog} />
    </div>
  );
}
