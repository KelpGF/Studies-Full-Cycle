import express from 'express';

const app = express();

app.get('/login', (req, res) => {
  const params = new URLSearchParams({
    client_id: 'kama-bakka',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid',
  });

  const url = 'http://localhost:8080/realms/Kamabakka/protocol/openid-connect/auth?'+ params.toString();

  console.log(url);

  res.redirect(url);
})

app.get('/callback', async (req, res) => {
  const body = {
    client_id: 'kama-bakka',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback',
  }

  const url = 'http://host.docker.internal:8080/realms/Kamabakka/protocol/openid-connect/token';

  const result = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => response.json());

  res.send(result);
})

app.listen(3000, () => {
  console.log('[Authorization Code] Server is running');
})
