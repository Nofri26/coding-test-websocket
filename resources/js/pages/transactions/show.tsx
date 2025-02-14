import { Head } from '@inertiajs/react';
import { Header } from 'components/header';
import { AppLayout } from 'layouts';
import React from 'react';
import { Card, Container } from 'ui';

export default function Show({ transaction }: any) {
  console.log(transaction);
  return (
    <>
      <Head title={`Show transaction ${transaction.code}`} />
      <Header title={`Show transaction ${transaction.code}`} />
      <Container>
        <Card className="p-6">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">No Transaction</th>
                  <th className="text-left py-2 px-4">{transaction.code}</th>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Created At</th>
                  <th className="text-left py-2 px-4">
                    {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr className="border-b hover:bg-gray-50">
                  <th className="py-2 px-4 text-left">No</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {transaction.products.map((product: any) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.pivot.quantity}</td>
                    <td className="py-2 px-4">{product.price}</td>
                    <td className="py-2 px-4">{product.pivot.quantity * product.price}</td>
                    <td className="py-2 px-4">#</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </>
  );
}

Show.layout = (page: React.ReactNode) => <AppLayout children={page} />;
