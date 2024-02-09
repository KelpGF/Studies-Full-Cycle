import express from 'express';
import session from 'express-session';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({ resave: true, secret: '123456', saveUninitialized: true }));

const middlewareIsAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //@ts-expect-error - type mismatch
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;

	const response = await fetch('http://host.docker.internal:8080/realms/Kamabakka/protocol/openid-connect/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: 'kama-bakka',
			grant_type: 'password',
      scope: 'openid',
			username,
			password,
		}).toString(),
	});

  const result = await response.json();
  console.log(result);
  // @ts-ignore
  req.session.user = result;
  req.session.save();

  res.redirect('/admin');
});

app.get("/logout", async (req, res) => {
  await fetch(
    "http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/revoke",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "kama-bakka",
        //@ts-expect-error
        token: req.session.user.refresh_token,
      }).toString(),
    }
  );
  //response.ok verificar se a resposta está ok
  req.session.destroy((err) => {
    console.error(err);
  });
  res.redirect("/login");
});

app.get("/admin", middlewareIsAuth, (req, res) => {
  //@ts-expect-error - type mismatch
  res.json(req.session.user);
});

app.listen(3000, () => {
	console.log('[Direct Grant] Server is running');
});
