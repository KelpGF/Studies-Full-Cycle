import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export function Login() {
	const { auth, makeLoginUrl } = useContext(AuthContext);

	useEffect(() => {
		if (!auth) window.location.href = makeLoginUrl();
	}, [auth, makeLoginUrl]);

	return auth ? <Navigate to="/admin" /> : <div>Loading...</div>;
}
