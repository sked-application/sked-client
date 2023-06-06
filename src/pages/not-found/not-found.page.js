import React from 'react';
import PageHeader from '../../shared/components/page-header';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Página não encontrada"
        description="O endereço que você está buscando não exite."
      />
    </div>
  );
};

export default NotFound;
