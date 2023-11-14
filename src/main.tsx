import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import "firebase/auth";
import { Headder } from "./templates/Headder";
import { Footer } from "./templates/Footer";
import "tailwindcss/tailwind.css";
import { HabitacionByObjectPage } from "./pages/HabitacionByObjectPage";
import { LoginPage } from "./pages/LoginPage";
import { LoadingProvider } from "./context/LoadingContext";
import "normalize.css";
import { ReservasPage } from "./pages/Reservas.page";
import React from "react";

const AppHeader = () => {
  // Mostrar el encabezado solo en rutas específicas
  const location = useLocation();
  const showHeader = location.pathname !== "/build/login";

  return showHeader ? <Headder /> : null;
};

const AppFooter = () => {
  // Mostrar el pie de página solo en rutas específicas
  const location = useLocation();
  const showFooter = location.pathname !== "/build/login";

  return showFooter ? <Footer /> : null;
};

const App: React.FC = () => {
  return (
    <Router>
      <LoadingProvider>
        {/* Renderiza el encabezado y el pie de página en todas las rutas */}
        <AppHeader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habitacionInfo" element={<HabitacionByObjectPage />} />
          <Route path="/build/login" element={<LoginPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoadingProvider>
      <AppFooter />
    </Router>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(<App />);
