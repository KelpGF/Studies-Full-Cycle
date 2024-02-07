import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, Admin, Callback, Logout } from './pages';
import { AuthProvider } from './providers/AuthProvider';

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
		element: <Admin />,
	},
	{
		path: 'callback',
		element: <Callback />,
	},
]);

function App() {
	return <AuthProvider>
    <RouterProvider router={router} />;
  </AuthProvider>
}

export default App;
