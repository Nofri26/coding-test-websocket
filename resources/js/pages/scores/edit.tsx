import { Head, useForm } from '@inertiajs/react';
import { Header } from 'components/header';
import { AppLayout } from 'layouts';
import React from 'react';
import { Button, Card, Container, Form, TextField } from 'ui';

export default function Edit({ score }: any) {
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    score_a: score.score_a,
    score_b: score.score_b
  });

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    put(route('scores.update', score), {
      preserveScroll: true
    });
  };
  return (
    <>
      <Head title="Add new sport event" />
      <Header title="Add new sport event" />
      <Container>
        <Card className="p-6">
          <Form validationErrors={errors} onSubmit={submit} className="space-y-6">
            <div className="flex gap-4">
              <TextField
                id="score_a"
                label="Score A"
                type="text"
                value={data.score_a}
                className="mt-1 w-full"
                onChange={(v) => setData('score_a', v)}
                isRequired
                errorMessage={errors.score_a}
                autoFocus
                autoComplete="name"
              />
              <TextField
                id="score_b"
                label="Score B"
                type="text"
                value={data.score_b}
                className="mt-1 w-full"
                onChange={(v) => setData('score_b', v)}
                isRequired
                errorMessage={errors.score_b}
                autoComplete="score_b"
              />
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

Edit.layout = (page: React.ReactNode) => <AppLayout children={page} />;
