import { Head } from '@inertiajs/react';
import { Header } from 'components/header';
import { AppLayout } from 'layouts';
import React from 'react';
import { Card, Container } from 'ui';

export default function Show({ product }: any) {
  return (
    <>
      <Head title={`Show product ${product.name}`} />
      <Header title={`Show product ${product.name}`} />
      <Container>
        <Card className="p-6">
          The price of the product is {product.price} with {product.stock} pcs remaining in stock.
        </Card>
      </Container>
    </>
  );
}

Show.layout = (page: React.ReactNode) => <AppLayout children={page} />;
