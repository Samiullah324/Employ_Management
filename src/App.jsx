import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppStoreProvider } from './store';
import './App.css';

function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppStoreProvider>
  );
}

export default App;
