import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './views/LoginPage';
import { PolizaPage } from './views/PolizaPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/polizas"
          element={<PolizaPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
