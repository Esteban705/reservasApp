let telefono = "5493834250139";
export let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
          *Contacto* Quiero Mas Informacion `;

export const Footer = () => {
  return (
    <footer className="site-footer seccion text-sm">
      <div className="contenedor contenedor-footer">
        <nav>
          <button
            onClick={() => window.open(url)}
            className="text-xl hover:text-green-500  text-white "
          >
            Contacto
          </button>
        </nav>
        <p className="copiright">Todos los Derechos Reservados &copy;</p>
      </div>
    </footer>
  );
};
