import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { saludos } from "./data/saludos.json";
import logo from "./assets/rolling-logo.png";
import "./App.css";

function App() {
  const MySwal = withReactContent(Swal);
  const [mensaje, setMensaje] = useState("");
  const opcion = useRef("");

  useEffect(() => {
    if (mensaje) {
      alertaMensaje();
    }
  }, [mensaje]);

  const mensajeHola = (e) => {
    if (e.target.value) {
      const index = Number(e.target.value);
      setMensaje(saludos[index].saludo);
    }
  };

  const alertaMensaje = () => {
    MySwal.fire({
      title: `${mensaje}`,
      confirmButtonText: "Ok",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setMensaje("");
        opcion.current.value = "";
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row vh-100 justify-content-center pt-5">
          <div className="col-12 col-md-8 text-center box">
            <img className="logo" src={logo} alt="logo" />
            <h1 className="my-2">Día mundial del saludo 👋</h1>

            <form>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                onChange={mensajeHola}
                ref={opcion}
              >
                <option value="">Elige el idioma del saludo🤔</option>
                {saludos.map((saludo, index) => (
                  <option key={index} value={index}>
                    {saludo.idioma}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
