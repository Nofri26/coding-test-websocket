import { Head, router } from '@inertiajs/react';
import { Header } from 'components/header';
import { IconMinus, IconPlus } from 'justd-icons';
import { AppLayout } from 'layouts';
import React, { useState } from 'react';
import { Button, Card, Container, Form, NumberField, Select } from 'ui';

export interface Product {
  id: number;
  name: string;
}

interface ProductProps {
  products: Product[];
}

export default function Create({ products }: ProductProps) {
  const [selectedProducts, setSelectedProducts] = useState([{ id: '', quantity: 1 }]);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const addRow = () => {
    setSelectedProducts([...selectedProducts, { id: '', quantity: 1 }]);
  };

  const removeRow = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: string, value: string | number | boolean) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setSelectedProducts(newProducts);
  };

  const submit = (event: any) => {
    event.preventDefault();
    setProcessing(true);

    router.post(
      '/transactions',
      { products: selectedProducts },
      {
        onSuccess: () => {
          setRecentlySuccessful(true);
          setProcessing(false);
        },
        onError: (err) => {
          setErrors(err);
          setProcessing(false);
        }
      }
    );
  };
  return (
    <>
      <Head title="Add new product" />
      <Header title="Add new product" />
      <Container>
        <Card className="p-6">
          <Form validationErrors={errors} onSubmit={submit} className="space-y-6">
            <div className="flex flex-col gap-4">
              {selectedProducts.map((product, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-full">
                    <Select
                      label="Product"
                      placeholder="Select a product"
                      id={`product-${index}`}
                      onSelectionChange={(value) => updateRow(index, 'id', value)}
                    >
                      <Select.Trigger />
                      <Select.List items={products}>
                        {(item) => (
                          <Select.Option id={item.id} textValue={item.name}>
                            {item.name}
                          </Select.Option>
                        )}
                      </Select.List>
                    </Select>

                    {
                      // @ts-ignore
                      errors[`products.${index}.id`] && (
                        <p className="text-sm text-red-500 mt-1">
                          {
                            // @ts-ignore
                            errors[`products.${index}.id`]
                          }
                        </p>
                      )
                    }
                  </div>
                  <div>
                    <NumberField
                      label="Quantity"
                      placeholder="Quantity"
                      minValue={1}
                      id={`quantity-${index}`}
                      value={product.quantity}
                      onChange={(value) => updateRow(index, 'quantity', Number(value))}
                    />
                    {
                      // @ts-ignore
                      errors[`products.${index}.quantity`] && (
                        <p className="text-sm text-red-500 mt-1">
                          {
                            // @ts-ignore
                            errors[`products.${index}.quantity`]
                          }
                        </p>
                      )
                    }
                  </div>

                  <div className="flex justify-end items-end">
                    {index === selectedProducts.length - 1 ? (
                      <Button onPress={addRow}>
                        <IconPlus />
                      </Button>
                    ) : (
                      <Button onPress={() => removeRow(index)} intent="danger">
                        <IconMinus />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
