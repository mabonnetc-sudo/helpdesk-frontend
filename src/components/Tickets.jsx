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
            {ticket.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
