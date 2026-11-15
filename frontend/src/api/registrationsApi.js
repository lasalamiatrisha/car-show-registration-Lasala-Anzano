const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5205";

export async function getRegistrations({ participantName = "", type = "", status = "", page = 1, pageSize = 10 }) {
  const params = new URLSearchParams();
  if (participantName) params.append("participantName", participantName);
  if (type && type !== "All") params.append("type", type);
  if (status && status !== "All") params.append("status", status);
  params.append("page", page);
  params.append("pageSize", pageSize);

  const response = await fetch(`${BASE_URL}/api/registrations?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch registrations");
  return response.json();
}

export async function getSummary() {
  const response = await fetch(`${BASE_URL}/api/registrations/summary`);
  if (!response.ok) throw new Error("Failed to fetch summary");
  return response.json();
}