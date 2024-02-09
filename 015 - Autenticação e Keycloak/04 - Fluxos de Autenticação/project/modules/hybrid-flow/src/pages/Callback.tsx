import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export function Callback() {
	const { hash } = useLocation();
	const { login, auth } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (auth) {
			navigate('/admin');
			return;
		}

		const params = new URLSearchParams(hash.substring(1));
		const accessToken = params.get('access_token');
		const idToken = params.get('id_token');
		const state = params.get('state');
		const code = params.get('code') as string;

		if (!accessToken || !idToken || !state) {
			navigate('/login');
			return;
		}

		login(accessToken, idToken, code, state);
	}, [hash, login, auth, navigate]);

	return <div>Loading...</div>;
}
