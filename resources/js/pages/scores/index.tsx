import { Head, router } from '@inertiajs/react';
import { AppLayout } from 'layouts';
import React from 'react';
import { Button, buttonStyles, Card, Container, Link } from 'ui';

export interface Scores {
  id: number;
  sport: string;
  team_a: string;
  team_b: string;
  score_a: number;
  score_b: number;
}

interface ScoresProps {
  scores: Scores[];
}

export default function Index({ scores }: ScoresProps) {
  const handleEdit = (score: any) => {
    router.get(route('scores.edit', score));
  };

  return (
    <>
      <Head title="Score List" />
      <Container className="pt-6">
        <div className={'flex justify-end mb-4'}>
          <Link className={(renderProps) => buttonStyles({ ...renderProps, intent: 'primary' })} href="/scores/create">
            Add New Sport Event
          </Link>
        </div>
        {scores.map((score) => (
          <Card key={score.id} className="p-6 mb-4">
            <Card.Header>
              <div className="flex justify-between">
                <Card.Title>{score.sport}</Card.Title>
                <Button intent="warning" onPress={() => handleEdit(score)}>
                  Update Score
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="text-center bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{score.team_a}</td>
                    <td className="border border-gray-300 px-4 py-2">{score.team_b}</td>
                  </tr>
                  <tr className="text-center border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-blue-600">{score.score_a}</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-red-600">{score.score_b}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Content>
          </Card>
        ))}
      </Container>
    </>
  );
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page} />;
