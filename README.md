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
