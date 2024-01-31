import express from 'express';
import session from 'express-session';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const app = express();

app.use(session({ resave: true, secret: '123456', saveUninitialized: true }));

// login default
app.get('/login', (req, res) => {
	const params = new URLSearchParams({
		client_id: 'kama-bakka',
		redirect_uri: 'http://localhost:3000/callback',
		response_type: 'code',
		scope: 'openid',
	});

	const url = 'http://localhost:8080/realms/Kamabakka/protocol/openid-connect/auth?' + params.toString();

	console.log(url);

	res.redirect(url);
});
app.get('/callback', async (req, res) => {
	const body = {
		client_id: 'kama-bakka',
		grant_type: 'authorization_code',
		code: req.query.code as string,
		redirect_uri: 'http://localhost:3000/callback',
	};

	const url = 'http://host.docker.internal:8080/realms/Kamabakka/protocol/openid-connect/token';

	const result = await fetch(url, {
		method: 'POST',
		body: new URLSearchParams(body),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then((response) => response.json());

	res.send(result);
});

// login with nonce
app.get('/login-nonce', (req, res) => {
	const nonceCode = crypto.randomBytes(16).toString('base64');

	// @ts-expect-error - type mismatch
	req.session.nonce = nonceCode;
	req.session.save();

	const params = new URLSearchParams({
		client_id: 'kama-bakka',
		redirect_uri: 'http://localhost:3000/callback-once',
		response_type: 'code',
		scope: 'openid',
		nonce: nonceCode,
	});

	const url = 'http://localhost:8080/realms/Kamabakka/protocol/openid-connect/auth?' + params.toString();

	console.log(url);

	res.redirect(url);
});
app.get('/callback-once', async (req, res) => {
	const body = {
		client_id: 'kama-bakka',
		grant_type: 'authorization_code',
		code: req.query.code as string,
		redirect_uri: 'http://localhost:3000/callback-once',
	};

	const url = 'http://host.docker.internal:8080/realms/Kamabakka/protocol/openid-connect/token';

	const result = await fetch(url, {
		method: 'POST',
		body: new URLSearchParams(body),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then((response) => response.json());

	const payloadAccessToken = jwt.decode(result.access_token) as any;
	const payloadRefreshToken = jwt.decode(result.refresh_token) as any;
	const payloadIdToken = jwt.decode(result.id_token) as any;

	// @ts-expect-error - type mismatch
	const nonce = req.session.nonce;

	if (payloadIdToken.nonce !== nonce || payloadAccessToken.nonce !== nonce || payloadRefreshToken.nonce !== nonce) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	// @ts-expect-error - type mismatch
	req.session.user = payloadIdToken;
	// @ts-expect-error - type mismatch
	req.session.access_token = result.access_token;
	// @ts-expect-error - type mismatch
	req.session.refresh_token = result.refresh_token;
	// @ts-expect-error - type mismatch
	req.session.id_token = result.id_token;

	req.session.save();

	res.json(result);
});

app.listen(3000, () => {
	console.log('[Authorization Code] Server is running');
});
