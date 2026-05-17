import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            border: "1px solid #fee2e2",
            borderRadius: "14px",
            color: "#374151",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
