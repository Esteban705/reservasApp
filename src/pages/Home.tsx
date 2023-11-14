import React from "react";
import "../style/styleHome.css";
import { HabitacionesPage } from "./Habitaciones";

const Home: React.FC = () => {
  return (
    <div>
      {/*  <section className="contenedor seccion">
        <h2 className="fw-300 text-center">Mas Sobre Nosotros</h2>

        <div className="Iconos-Nosotros">
          <div className="Iconos">
            <img src="/img/icono2.svg" alt="Logo El Mejor Precio" />
            <h3>El Mejor Precio</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              animi ut, eos at atque blanditiis architecto ipsa sunt nisi esse
              exercitationem, neque modi eum in suscipit unde adipisci officiis
              molestias.
            </p>
          </div>
          <div className="Iconos">
            <img src="/img/icono3.svg" alt="Logo A Tiempo" />
            <h3>A Tiempo</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nesciunt commodi dolor quam! In amet repellendus, odio cupiditate
              necessitatibus quas, eius porro deleniti commodi error laboriosam
              illum soluta. Voluptas, laudantium?
            </p>
          </div>
          <div className="Iconos">
            <img src="/img/icono1.svg" alt="Logo Seguridad" />
            <h3>Seguridad</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis exercitationem dolor alias quas, dolorem maiores
              nihil velit. Molestias sequi quasi ab molestiae, ad, repellat nemo
              incidunt voluptatem suscipit similique minima.
            </p>
          </div>
        </div>
      </section> */}

      <main className="seccion contenedor">
        <HabitacionesPage />
      </main>
    </div>
  );
};

export default Home;
