import { Head, useForm } from '@inertiajs/react';
import { Header } from 'components/header';
import { AppLayout } from 'layouts';
import React from 'react';
import { Button, Card, Container, Form, TextField } from 'ui';

export default function Create() {
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    sport: '',
    team_a: '',
    team_b: ''
  });

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    post(route('scores.store'), {
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
            <TextField
              id="sport"
              label="Sport"
              type="text"
              value={data.sport}
              className="mt-1 w-full"
              onChange={(v) => setData('sport', v)}
              isRequired
              errorMessage={errors.sport}
              autoFocus
              autoComplete="name"
            />
            <div className="flex gap-4">
              <TextField
                id="team_a"
                label="Team A"
                type="text"
                value={data.team_a}
                className="mt-1 w-full"
                onChange={(v) => setData('team_a', v)}
                isRequired
                errorMessage={errors.team_a}
                autoFocus
                autoComplete="name"
              />
              <TextField
                id="team_b"
                label="Team B"
                type="text"
                value={data.team_b}
                className="mt-1 w-full"
                onChange={(v) => setData('team_b', v)}
                isRequired
                errorMessage={errors.team_b}
                autoComplete="team_b"
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

Create.layout = (page: React.ReactNode) => <AppLayout children={page} />;
