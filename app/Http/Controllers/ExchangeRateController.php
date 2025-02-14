<?php

namespace App\Http\Controllers;

use App\Models\ExchangeRate;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\DomCrawler\Crawler;

class ExchangeRateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $client = new Client();
        $response = $client->request('GET', 'https://www.smartdeal.co.id/rates/dki_banten');

        $html = $response->getBody()->getContents();
        $crawler = new Crawler($html);

        $data = [];

        $crawler->filter('table#tableExchange .body')->each(function (Crawler $row) use (&$data) {
            $columns = $row->filter('td')->each(function (Crawler $col, $i) {
                return trim($col->text());
            });

            if (count($columns) === 4) {
                $currency = $columns[0];
                $denomination = $columns[1] ?? '';
                $buy = $columns[2];
                $sell = $columns[3];

                ExchangeRate::query()->updateOrCreate(
                    ['currency' => $currency, 'denomination' => $denomination],
                    ['buy' => $buy, 'sell' => $sell]
                );

                $data[] = [
                    'currency' => $currency,
                    'denomination' => $denomination,
                    'buy' => $buy,
                    'sell' => $sell,
                ];
            }
        });

        return response()->json($data);
    }
}
