import { Head, useForm } from '@inertiajs/react';
import { Header } from 'components/header';
import { AppLayout } from 'layouts';
import React from 'react';
import { Button, Card, Container, Form, TextField } from 'ui';

export default function Create() {
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    name: '',
    price: '',
    stock: ''
  });

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    post(route('products.store'), {
      preserveScroll: true
    });
  };
  return (
    <>
      <Head title="Add new product" />
      <Header title="Add new product" />
      <Container>
        <Card className="p-6">
          <Form validationErrors={errors} onSubmit={submit} className="space-y-6">
            <TextField
              id="name"
              label="Name"
              type="text"
              value={data.name}
              className="mt-1"
              onChange={(v) => setData('name', v)}
              isRequired
              errorMessage={errors.name}
              autoFocus
              autoComplete="name"
            />
            <TextField
              id="price"
              type="number"
              label="Price"
              value={data.price}
              className="mt-1"
              onChange={(v) => setData('price', v)}
              isRequired
              errorMessage={errors.price}
              autoComplete="price"
            />
            <TextField
              id="stock"
              type="number"
              label="Stock"
              value={data.stock}
              className="mt-1"
              onChange={(v) => setData('stock', v)}
              isRequired
              errorMessage={errors.stock}
              autoComplete="stock"
            />

            <div className="flex items-center gap-4">
              <Button type="submit" isDisabled={processing}>
                Save
              </Button>
              {recentlySuccessful && <p className="text-sm text-muted-fg">Saved.</p>}
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

Create.layout = (page: React.ReactNode) => <AppLayout children={page} />;
