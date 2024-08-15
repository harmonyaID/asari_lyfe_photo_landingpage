# Installation

## Pre-Deploy

Before doing the usual deploy process, copy `.env.example` to `.env.local`
```bash
cp .env.example .env.local
```
And set the value of `NEXT_PUBLIC_CAPTCHA_SITE_KEY` and `NEXT_PUBLIC_API_URL`

| Key | Description |
| --- | ----------- |
| `NEXT_PUBLIC_API_URL` | The url of backend service / admin page |
| `NEXT_PUBLIC_CAPTCHA_SITE_KEY` | The site key of reCaptcha v3. Can be obtained from https://www.google.com/recaptcha/admin/create |