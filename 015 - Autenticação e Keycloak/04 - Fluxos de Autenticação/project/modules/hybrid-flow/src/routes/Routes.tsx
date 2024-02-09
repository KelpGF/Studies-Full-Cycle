import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Logout, Admin, Callback } from '../pages';
import { AuthRoute } from './AuthRoute';

const router = createBrowserRouter([
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'logout',
		element: <Logout />,
	},
	{
		path: 'admin',
		element: (
			<AuthRoute>
				<Admin />
			</AuthRoute>
		),
	},
	{
		path: 'callback',
		element: <Callback />,
	},
]);

export function Routers() {
	return <RouterProvider router={router} />;
}
