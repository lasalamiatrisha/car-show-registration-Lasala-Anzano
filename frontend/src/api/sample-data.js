const NAMES = [
  "Juan Dela Cruz", "Maria Santos", "Carlos Reyes", "Angela Bautista", "Mark Mendoza",
  "Sofia Garcia", "Rafael Torres", "Camille Flores", "Gabriel Ramos", "Patricia Cruz",
  "Daniel Aquino", "Kristine Navarro", "Miguel Villanueva", "JasmineCastro", "Antonio Morales",
  "Bianca Domingo", "Jose Fernandez", "Clarissa Lopez", "Patrick Gonzales", "Nicole Perez",
  "Christian Castillo", "Andrea Rivera", "Joshua Santiago", "tricia Lim", "Vincent Tan"
];

const CARS = [
  "Toyota Supra MK4", "Honda Civic Type R", "Nissan GT-R R35", "Mazda RX-7 FD", "Mitsubishi Lancer Evo IX",
  "Subaru WRX STI", "Ford Mustang GT", "Chevrolet Camaro SS", "BMW M3 E46", "Porsche 911 GT3",
  "Toyota GR86", "Honda NSX", "Nissan Silvia S15", "Hyundai Elantra N", "Volkswagen Golf R"
];

const TYPES = ["Exhibitor", "Competitor", "VIP"];
const STATUSES = ["Pending", "Confirmed", "CheckedIn", "Cancelled"];

const FEES = { Exhibitor: 1500, Competitor: 2500, VIP: 5000 };

// Sample records 
export const SAMPLE_REGISTRATIONS = Array.from({ length: 25 }, (_, i) => {
  const num = String(i + 1).padStart(4, "0");
  const type = TYPES[i % TYPES.length];
  const status = STATUSES[i % STATUSES.length];
  const fee = FEES[type];
  
  // Mix of Paid, Partial, and Unpaid
  const paid = i % 3 === 0 ? fee : i % 3 === 1 ? 1000 : 0;
  const paymentStatus = paid === 0 ? "Unpaid" : paid < fee ? "Partial" : "Paid";

  return {
    id: `3f2c9a1e-0000-4000-8000-00000000${num}`,
    registrationNumber: `CS27-${num}`,
    registrationDate: new Date(Date.UTC(2027, 1, 10 + (i % 10), 8 + (i % 8), 30)).toISOString(),
    participantName: NAMES[i],
    contactNumber: `0917${String(1234567 + i * 111).slice(0, 7)}`,
    email: `${NAMES[i].toLowerCase().replace(/\s+/g, ".")}@example.com`,
    address: `${100 + i} Rizal St., Sorsogon City`,
    carMakeModel: CARS[i % CARS.length],
    plateNumber: `ABC ${1234 + i}`,
    registrationType: type,
    status,
    registrationFee: fee,
    amountPaid: paid,
    paymentStatus,
  };
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getRegistrations({ participantName = "", type = "", status = "", page = 1, pageSize = 10 }) {
  await delay(300); // Simulates network loading state

  let filtered = [...SAMPLE_REGISTRATIONS];

  if (participantName.trim()) {
    const q = participantName.toLowerCase();
    filtered = filtered.filter((r) => r.participantName.toLowerCase().includes(q));
  }
  if (type && type !== "All") {
    filtered = filtered.filter((r) => r.registrationType === type);
  }
  if (status && status !== "All") {
    filtered = filtered.filter((r) => r.status === status);
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    page: safePage,
    pageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary() {
  await delay(200);
  const totalRegistrations = SAMPLE_REGISTRATIONS.length;
  const totalPayments = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.amountPaid, 0);
  const totalFees = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.registrationFee, 0);
  const uncollectedPayments = totalFees - totalPayments;
  const confirmed = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Confirmed").length;
  const checkedIn = SAMPLE_REGISTRATIONS.filter((r) => r.status === "CheckedIn").length;

  return {
    totalRegistrations,
    totalPayments,
    uncollectedPayments,
    confirmed,
    checkedIn,
    totalFees,
  };
}
export async function getRegistrationById(id) {
  await delay(200);
  const found = SAMPLE_REGISTRATIONS.find((r) => r.id === id);
  if (!found) throw new Error("Registration not found");
  return found;
}

export async function createRegistration(payload) {
  await delay(300);

  // Simulate 400 Validation Errors
  const errors = {};
  if (!payload.participantName?.trim()) errors.participantName = ["Participant name is required."];
  if (!payload.contactNumber?.trim()) errors.contactNumber = ["Contact number is required."];
  if (!payload.email?.trim() || !payload.email.includes("@")) errors.email = ["Valid email is required."];
  if (!payload.carMakeModel?.trim()) errors.carMakeModel = ["Car make/model is required."];
  if (!payload.plateNumber?.trim()) errors.plateNumber = ["Plate number is required."];

  if (Object.keys(errors).length > 0) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.errors = errors;
    throw err;
  }

  // Simulate 409 Duplicate Plate Error
  const duplicate = SAMPLE_REGISTRATIONS.some(
    (r) => r.plateNumber.toLowerCase().replace(/\s+/g, "") === payload.plateNumber.toLowerCase().replace(/\s+/g, "")
  );
  if (duplicate) {
    const err = new Error("Duplicate plate number");
    err.status = 409;
    err.field = "plateNumber";
    err.message = `Plate number "${payload.plateNumber}" is already registered.`;
    throw err;
  }

  const nextNum = String(SAMPLE_REGISTRATIONS.length + 1).padStart(4, "0");
  const fee = FEES[payload.registrationType] || 1500;
  const paid = Number(payload.amountPaid) || 0;
  const paymentStatus = paid === 0 ? "Unpaid" : paid < fee ? "Partial" : "Paid";

  const newRecord = {
    id: crypto.randomUUID(),
    registrationNumber: `CS27-${nextNum}`,
    registrationDate: new Date().toISOString(),
    participantName: payload.participantName.trim(),
    contactNumber: payload.contactNumber.trim(),
    email: payload.email.trim(),
    address: payload.address?.trim() || "Sorsogon City",
    carMakeModel: payload.carMakeModel.trim(),
    plateNumber: payload.plateNumber.trim().toUpperCase(),
    registrationType: payload.registrationType,
    status: "Pending",
    registrationFee: fee,
    amountPaid: paid,
    paymentStatus,
  };

  SAMPLE_REGISTRATIONS.unshift(newRecord);
  return newRecord;
}