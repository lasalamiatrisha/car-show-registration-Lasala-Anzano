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
export async function getRegistrationById(id) {
  const response = await fetch(`${BASE_URL}/api/registrations/${id}`);
  if (!response.ok) throw new Error("Failed to fetch registration details");
  return response.json();
}

export async function createRegistration(payload) {
  const response = await fetch(`${BASE_URL}/api/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const err = new Error(data.title || data.message || "Failed to create registration");
    err.status = response.status;
    
    if (response.status === 400 && data.errors) {
      const normalized = {};
      for (const [key, val] of Object.entries(data.errors)) {
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
        normalized[camelKey] = Array.isArray(val) ? val : [val];
      }
      err.errors = normalized;
    }
    if (response.status === 409) {
      err.field = "plateNumber";
      err.message = data.detail || data.message || "This plate number is already registered.";
    }
    throw err;
  }

  return response.json();
}