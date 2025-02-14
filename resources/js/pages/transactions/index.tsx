import { Props } from '@/src/types';
import { Head, router } from '@inertiajs/react';
import { NumberFormatter } from '@internationalized/number';
import { IconDotsVertical } from 'justd-icons';
import { AppLayout } from 'layouts';
import React from 'react';
import { Card, Container, Menu, Pagination, Table } from 'ui';

export default function Index({ transactions }: Props) {
  const formatter = new NumberFormatter('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  const priceFormat = (price: number) => formatter.format(price);

  const handleView = (transaction: any) => {
    router.get(route('transactions.show', transaction));
  };

  const handleEdit = (transaction: any) => {
    router.get(route('transactions.edit', transaction));
  };

  const handleDelete = (transaction: any) => {
    if (window.confirm(`Are you sure you want to delete ${transaction.name}?`)) {
      router.delete(route('transactions.destroy', transaction));
    }
  };
  return (
    <>
      <Head title="transaction List" />
      <Container className="pt-6">
        <Card className="p-6">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Transaction Information's</Card.Title>
                <Card.Description>Create, Update or Delete transaction from database.</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Table aria-label="transactions" className="mb-6">
            <Table.Header>
              <Table.Column className="w-0">#</Table.Column>
              <Table.Column isRowHeader>Code</Table.Column>
              <Table.Column isRowHeader>Products</Table.Column>
              <Table.Column isRowHeader>Quantity</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={transactions.data}>
              {(item) => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.code}</Table.Cell>
                  <Table.Cell>{item.products.map((product: any) => product.name).join(' ,')}</Table.Cell>
                  <Table.Cell>
                    {item.products.reduce((sum: any, product: any) => sum + product.pivot.quantity, 0)}
                  </Table.Cell>
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
                href={transactions.first_page_url ?? '#'}
                isCurrent={transactions.prev_page_url === null}
              />
              <Pagination.Item
                segment="previous"
                href={transactions.prev_page_url ?? '#'}
                isCurrent={transactions.prev_page_url === null}
              />

              <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
                <Pagination.Item segment="label">{transactions.current_page}</Pagination.Item>
                <Pagination.Item segment="separator" />
                <Pagination.Item className="text-muted-fg" segment="label">
                  {transactions.last_page}
                </Pagination.Item>
              </Pagination.Section>

              <Pagination.Item
                segment="next"
                href={transactions.next_page_url ?? '#'}
                isCurrent={transactions.next_page_url === null}
              />
              <Pagination.Item
                segment="last"
                href={transactions.last_page_url ?? '#'}
                isCurrent={transactions.next_page_url === null}
              />
            </Pagination.List>
          </Pagination>
        </Card>
      </Container>
    </>
  );
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page} />;
