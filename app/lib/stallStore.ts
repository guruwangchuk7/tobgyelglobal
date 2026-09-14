"use client";

// Client-side data access for stall bookings. Mirrors the pattern used by
// registrationStore.ts: talk to the API routes, keep a lightweight localStorage
// backup, and surface failures to the caller.

export interface StallBooking {
  id: string;
  stallId: string;
  stallLabel: string;
  zone: string;
  size: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

// Public availability record — NO personal data, safe for the anon website.
export interface StallAvailability {
  stallId: string;
  status: "Pending" | "Approved";
}

const STORAGE_KEY = "tobgyel_stall_bookings";

// -------------------- PUBLIC: availability --------------------
// Returns the list of stall ids that are currently taken (Pending or Approved).
export const fetchStallAvailability = async (): Promise<StallAvailability[]> => {
  try {
    const res = await fetch("/api/book-stall", { cache: "no-store" });
    if (res.ok) {
      const { taken } = await res.json();
      if (Array.isArray(taken)) {
        return taken
          .map((d: any) => ({ stallId: d.stall_id, status: d.status }))
          .filter((d: any) => d.stallId);
      }
    }
  } catch (err) {
    console.error("Error fetching stall availability:", err);
  }
  return [];
};

export interface BookStallInput {
  stallId: string;
  stallLabel: string;
  zone: string;
  size: string;
  country: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  notes: string;
  website?: string; // honeypot — must stay empty
}

// -------------------- PUBLIC: create a booking --------------------
export const bookStall = async (data: BookStallInput): Promise<void> => {
  const res = await fetch("/api/book-stall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result?.error) {
    throw new Error(result?.error || "Failed to submit stall booking.");
  }
};

// -------------------- ADMIN --------------------
export const getStallBookings = (): StallBooking[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as StallBooking[];
  } catch {
    return [];
  }
};

export const fetchStallBookingsAsync = async (): Promise<StallBooking[]> => {
  try {
    const res = await fetch("/api/admin/stall-bookings");
    if (res.ok) {
      const { records } = await res.json();
      if (Array.isArray(records)) {
        const mapped: StallBooking[] = records.map((d: any) => ({
          id: d.id,
          stallId: d.stall_id,
          stallLabel: d.stall_label,
          zone: d.zone,
          size: d.size || "",
          contactName: d.contact_name,
          companyName: d.company_name || "",
          email: d.email,
          phone: d.phone,
          country: d.country || "",
          notes: d.notes || "",
          status: d.status || "Pending",
          submittedAt: d.created_at
            ? new Date(d.created_at).toLocaleString()
            : new Date().toLocaleString(),
        }));
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        }
        return mapped;
      }
    }
  } catch (err) {
    console.error("Error fetching stall bookings:", err);
  }
  return getStallBookings();
};

export const updateStallBookingStatus = async (
  id: string,
  status: "Pending" | "Approved" | "Rejected"
) => {
  try {
    await fetch("/api/admin/stall-bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  } catch (err) {
    console.error("Error updating stall booking status:", err);
  }
};

export const deleteStallBooking = async (id: string) => {
  try {
    await fetch("/api/admin/stall-bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  } catch (err) {
    console.error("Error deleting stall booking:", err);
  }
};
