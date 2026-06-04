import { Toaster } from 'react-hot-toast';
import AuthContext from './context/AuthContext';
import CartContext from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthContext>
      <CartContext>
        <div className="min-h-screen bg-white">
          <AppRoutes />
        </div>
        <Toaster position="top-right" />
      </CartContext>
    </AuthContext>
  );
}

export default App;
