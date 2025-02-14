## Setup

```bash
npm i --legacy-peer-deps

composer i

cp .env.example .env

php artisan key:generate

php artisan migrate --seed
```

## Run Program
jalankan pada 2 terminal yang berbeda.
```bash
composer run dev

php artisan reverb:start
```

## Login
email : test@example.com

password : password


## Description
Studi Kasis 1 : Pada Navbar ada Product dan Transaction, serta icon keranjang dikanan navbar

Studi Kasus 2 : http://127.0.0.1:8000/crawl-kurs

Studi Kasus 3 : Untuk Admin yang akan melakukan input sport event atau peruhan score ada pada Scores pada navbar, **dan pada halaman home tempat melihat realtime scorenya**. Untuk  melihat Log perubahan score ada pada http://127.0.0.1:8000/scores/log berupa Json
