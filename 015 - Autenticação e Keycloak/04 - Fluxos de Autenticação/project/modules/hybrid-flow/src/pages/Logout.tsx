import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export function Logout() {
	const { makeLogoutUrl } = useContext(AuthContext);

	useEffect(() => {
		const logoutUrl = makeLogoutUrl();
		if (logoutUrl) window.location.href = logoutUrl;
	}, [makeLogoutUrl]);

	return (
		<div>
			<h1>Loading...</h1>
		</div>
	);
}
