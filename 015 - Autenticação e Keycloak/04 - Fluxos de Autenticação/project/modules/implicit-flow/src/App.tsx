import { AuthProvider } from './providers/AuthProvider';
import { Routers } from './routes/Routes';


function App() {
	return <AuthProvider>
    <Routers />
  </AuthProvider>
}

export default App;
