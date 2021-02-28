import React from 'react';
import PageHeader from '../../components/page-header-component/page-header.component';

const NotFound = () => {
    return (
        <div className="container">
			<PageHeader
				title="Página não encontrada"
				description="O endereço que você está buscando não exite." />
        </div>
    );
};

export default NotFound;
