import echo from '@/bootstrap';
import { Head } from '@inertiajs/react';
import { AppLayout } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Card, Container } from 'ui';
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

export default function Home({ scores: initialScores }: ScoresProps) {
  const [scores, setScores] = useState(initialScores);

  useEffect(() => {
    const channel = echo.channel('scores');

    channel.listen('.score.updated', (event: any) => {
      console.log('Full Event:', event);
      setScores((prevScores) => prevScores.map((s) => (s.id === event.score.id ? { ...s, ...event.score } : s)));
    });

    return () => {
      channel.stopListening('.score.updated');
      echo.leaveChannel('scores');
    };
  }, []);

  return (
    <>
      <Head title="Score List" />
      <Container className="pt-6">
        {scores.map((score) => (
          <Card key={score.id} className="p-6 mb-4">
            <Card.Header>
              <Card.Title>{score.sport}</Card.Title>
            </Card.Header>
            <Card.Content>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2" rowSpan={2}>
                      <strong>{score.sport}</strong>
                    </td>
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

Home.layout = (page: React.ReactNode) => <AppLayout children={page} />;
