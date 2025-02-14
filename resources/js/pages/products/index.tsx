import { Props } from '@/src/types';
import { Head, router } from '@inertiajs/react';
import { NumberFormatter } from '@internationalized/number';
import { IconDotsVertical } from 'justd-icons';
import { AppLayout } from 'layouts';
import React from 'react';
import { buttonStyles, Card, Container, Link, Menu, Pagination, Table } from 'ui';

export default function Index({ products }: Props) {
  const formatter = new NumberFormatter('id-ID', { style: 'currency', currency: 'IDR' });

  const priceFormat = (price: number) => formatter.format(price);

  const handleView = (product: any) => {
    router.get(route('products.show', product));
  };

  const handleEdit = (product: any) => {
    router.get(route('products.edit', product));
  };

  const handleDelete = (product: any) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      router.delete(route('products.destroy', product));
    }
  };
  return (
    <>
      <Head title="Product List" />
      <Container className="pt-6">
        <Card className="p-6">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Product Information's</Card.Title>
                <Card.Description>Create, Update or Delete product from database.</Card.Description>
              </div>
              <div>
                <Link
                  className={(renderProps) => buttonStyles({ ...renderProps, intent: 'primary' })}
                  href="/products/create"
                >
                  Add New Product
                </Link>
              </div>
            </div>
          </Card.Header>
          <Table aria-label="Products" className="mb-6">
            <Table.Header>
              <Table.Column className="w-0">#</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Stock (pcs)</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={products.data}>
              {(item) => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{priceFormat(item.price)}</Table.Cell>
                  <Table.Cell>{item.stock}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-end">
                      <Menu>
                        <Menu.Trigger>
                          <IconDotsVertical />
                        </Menu.Trigger>
                        <Menu.Content aria-label="Actions" placement="left top">
                          <Menu.Item onAction={() => handleView(item)}>View</Menu.Item>
                          <Menu.Item onAction={() => handleEdit(item)}>Edit</Menu.Item>
                          <Menu.Separator />
                          <Menu.Item onAction={() => handleDelete(item)} isDanger>
                            Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Pagination>
            <Pagination.List>
              <Pagination.Item
                segment="first"
                href={products.first_page_url ?? '#'}
                isCurrent={products.prev_page_url === null}
              />
              <Pagination.Item
                segment="previous"
                href={products.prev_page_url ?? '#'}
                isCurrent={products.prev_page_url === null}
              />

              <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
                <Pagination.Item segment="label">{products.current_page}</Pagination.Item>
                <Pagination.Item segment="separator" />
                <Pagination.Item className="text-muted-fg" segment="label">
                  {products.last_page}
                </Pagination.Item>
              </Pagination.Section>

              <Pagination.Item
                segment="next"
                href={products.next_page_url ?? '#'}
                isCurrent={products.next_page_url === null}
              />
              <Pagination.Item
                segment="last"
                href={products.last_page_url ?? '#'}
                isCurrent={products.next_page_url === null}
              />
            </Pagination.List>
          </Pagination>
        </Card>
      </Container>
    </>
  );
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page} />;
