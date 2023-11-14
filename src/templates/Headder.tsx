import { useLocation, useNavigate } from "react-router-dom";
import { url } from "./Footer";

export const Headder = () => {
  const navigate = useNavigate();
  const getIsAdmin = localStorage.getItem("isAdmin");
  let isAdmin = false;
  if (getIsAdmin) {
    const isAdminData: any = JSON.parse(getIsAdmin);
    isAdmin = isAdminData.isAdmin;
  }

  const location = useLocation();
  const showHeader =
    location.pathname === "/habitacionInfo" ||
    location.pathname === "/reservas";

  const handleCloseAdmin = () => {
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  return (
    <header className={`${!showHeader ? "inicio site-header" : "site-header"}`}>
      <div className="contenedor contenido-header">
        <div className="barra">
          <button onClick={() => navigate("/")}>
            <h1 className="text-4xl md:text-4xl font-extralight">
              Reservas
              <span className="text-4xl md:text-4xl font-bold">Docentes</span>
            </h1>
          </button>
          <nav
            id="navegacion"
            style={{ color: "white" }}
            className="text-4xl md:text-2xl "
          >
            <button
              onClick={() => window.open(url)}
              className="text-xl hover:text-green-500  text-white "
            >
              Contacto
            </button>

            {isAdmin && (
              <>
                <a className="cursor-pointer mr-5" onClick={handleCloseAdmin}>
                  Salir Modo Administrador
                </a>
                <button
                  onClick={() => navigate("/reservas")}
                  className="hover:text-green-500 mr-5"
                >
                  Reservas
                </button>
              </>
            )}
          </nav>
        </div>
        {!showHeader && <h1>Alojamientos Temporales</h1>}
      </div>
    </header>
  );
};
