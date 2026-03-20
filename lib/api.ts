// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const API_BASE = `${BASE_URL}/v1/identity/kyc`;
const AUTH_API_BASE = `${BASE_URL}/v1/auth`;

// Helper to get token safely (Next.js client-side)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tchedes_auth_token") || "";
  }
  return "";
};

export async function login(data: any) {
  const res = await fetch(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Login failed");
  return res.json();
}

export async function registerBusiness(data: any) {
  const res = await fetch(`${AUTH_API_BASE}/register/business`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
  return res.json();
}

export async function registerIndividual(data: any) {
  const res = await fetch(`${AUTH_API_BASE}/register/individual`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
  return res.json();
}

export async function fetchSessions() {
  const res = await fetch(`${API_BASE}/sessions`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return res.json();
}

export async function fetchSession(id: string) {
  const res = await fetch(`${API_BASE}/sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }

  return res.json();
}

export async function generateHostedLink(data: any) {
  const res = await fetch(`${BASE_URL}/v1/hosted/verifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "idempotency-key": crypto.randomUUID()
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate hosted link");
  }

  return res.json();
}

export async function uploadHostedDocument(token: string, file: File, type: "front" | "back" | "selfie") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const res = await fetch(`${BASE_URL}/v1/hosted/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to upload document");
  }

  return res.json();
}

export async function submitHostedSession(token: string) {
  const res = await fetch(`${BASE_URL}/v1/hosted/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to submit session");
  }

  return res.json();
}
