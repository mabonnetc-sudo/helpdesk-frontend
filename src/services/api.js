import API_URL from "../config";

export async function obtenerCasos() {
  const response = await fetch(`${API_URL}/cases`);
  return response.json();
}

