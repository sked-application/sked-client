import React from 'react';
import PageHeader from '../../common/components/page-header';

const NotFound = () => {
  return (
    <div className="container">
      <PageHeader
        title="Página não encontrada"
        description="O endereço que você está buscando não exite."
      />
    </div>
  );
};

export default NotFound;
