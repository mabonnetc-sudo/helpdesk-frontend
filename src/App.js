import { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    descripcion: "",
  });

  const API = "https://helpdesk-51bi.onrender.com"; // apunta a tu backend

  // Obtener tickets al cargar
  useEffect(() => {
    fetch(`${API}/cases`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Tickets recibidos:", data);
        setTickets(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Manejar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar ticket
  const enviarTicket = (e) => {
    e.preventDefault();

    console.log("Enviando ticket:", form);

    fetch(`${API}/cases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.json();
      })
      .then((data) => {
        setTickets([...tickets, data]);
        setForm({
          nombre: "",
          correo: "",
          asunto: "",
          descripcion: "",
        });
      })
      .catch(() => alert("No se pudo guardar el ticket"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema HelpDesk</h1>

      <h2>Crear Ticket</h2>
      <form onSubmit={enviarTicket}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <br />

        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />
        <br />

        <input
          name="asunto"
          placeholder="Asunto"
          value={form.asunto}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Enviar Ticket</button>
      </form>

      <h2>Listado de Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            <strong>Asunto:</strong> {t.asunto} <br />
            <strong>Nombre:</strong> {t.nombre} <br />
            <strong>Correo:</strong> {t.correo} <br />
            <strong>Descripción:</strong> {t.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
