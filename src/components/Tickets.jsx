import { useEffect, useState } from "react";
import { obtenerCasos } from "../services/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    obtenerCasos().then(data => setTickets(data));
  }, []);

  return (
    <div>
      <h2>Listado de Tickets</h2>

      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <strong>Nombre:</strong> {t.nombre} <br />
            <strong>Correo:</strong> {t.correo} <br />
            <strong>Asunto:</strong> {t.asunto} <br />
            <strong>Descripción:</strong> {t.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
