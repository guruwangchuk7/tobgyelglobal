"use client";


export interface ExhibitorSubmission {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: string;
  boothSize: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface SponsorSubmission {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  tier: "Gold ($2,500)" | "Silver ($1,500)" | "Bronze ($500)" | "Official Partner" | string;
  budget: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface VisitorSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  profession: string;
  purpose: string;
  daysAttending: string[];
  passCode: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEYS = {
  EXHIBITORS: "tobgyel_exhibitors",
  SPONSORS: "tobgyel_sponsors",
  VISITORS: "tobgyel_visitors",
};

// ---------------- EXHIBITORS ----------------
export const getExhibitors = (): ExhibitorSubmission[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.EXHIBITORS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const fetchExhibitorsAsync = async (): Promise<ExhibitorSubmission[]> => {
  try {
    const res = await fetch("/api/admin/registrations?type=exhibitor");
    if (res.ok) {
      const { records } = await res.json();
      if (Array.isArray(records)) {
        return records.map((d: any) => ({
          id: d.id,
          companyName: d.company_name,
          contactPerson: d.contact_person,
          email: d.email,
          phone: d.phone,
          sector: d.sector,
          boothSize: d.booth_size,
          description: d.description || "",
          status: d.status || "Pending",
          submittedAt: d.created_at ? new Date(d.created_at).toLocaleString() : new Date().toLocaleString(),
        }));
      }
    }
  } catch (err) {
    console.error("Error fetching exhibitors:", err);
  }
  return getExhibitors();
};

export const addExhibitor = async (
  data: Omit<ExhibitorSubmission, "id" | "status" | "submittedAt">
): Promise<ExhibitorSubmission> => {
  const newEntry: ExhibitorSubmission = {
    ...data,
    id: `exh-${Date.now()}`,
    status: "Pending",
    submittedAt: new Date().toLocaleString(),
  };

  // Local storage backup
  const list = getExhibitors();
  const updated = [newEntry, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EXHIBITORS, JSON.stringify(updated));
  }

  // Server API submission to database — surface failures to the caller
  const res = await fetch("/api/register/exhibitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result?.error) {
    throw new Error(result?.error || "Failed to submit exhibitor application.");
  }

  return newEntry;
};

export const updateExhibitorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getExhibitors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EXHIBITORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "exhibitor", id, status }),
    });
  } catch (err) {
    console.error("Error updating exhibitor status:", err);
  }
};

export const deleteExhibitor = async (id: string) => {
  const list = getExhibitors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EXHIBITORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "exhibitor", id }),
    });
  } catch (err) {
    console.error("Error deleting exhibitor:", err);
  }
};

// ---------------- SPONSORS ----------------
export const getSponsors = (): SponsorSubmission[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.SPONSORS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const fetchSponsorsAsync = async (): Promise<SponsorSubmission[]> => {
  try {
    const res = await fetch("/api/admin/registrations?type=sponsor");
    if (res.ok) {
      const { records } = await res.json();
      if (Array.isArray(records)) {
        return records.map((d: any) => ({
          id: d.id,
          organizationName: d.organization_name,
          contactPerson: d.contact_person,
          email: d.email,
          phone: d.phone,
          tier: d.tier,
          budget: d.budget || "",
          message: d.message || "",
          status: d.status || "Pending",
          submittedAt: d.created_at ? new Date(d.created_at).toLocaleString() : new Date().toLocaleString(),
        }));
      }
    }
  } catch (err) {
    console.error("Error fetching sponsors:", err);
  }
  return getSponsors();
};

export const addSponsor = async (
  data: Omit<SponsorSubmission, "id" | "status" | "submittedAt">
): Promise<SponsorSubmission> => {
  const newEntry: SponsorSubmission = {
    ...data,
    id: `sp-${Date.now()}`,
    status: "Pending",
    submittedAt: new Date().toLocaleString(),
  };

  const list = getSponsors();
  const updated = [newEntry, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(updated));
  }

  const res = await fetch("/api/register/sponsor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result?.error) {
    throw new Error(result?.error || "Failed to submit sponsor application.");
  }

  return newEntry;
};

export const updateSponsorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getSponsors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "sponsor", id, status }),
    });
  } catch (err) {
    console.error("Error updating sponsor status:", err);
  }
};

export const deleteSponsor = async (id: string) => {
  const list = getSponsors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "sponsor", id }),
    });
  } catch (err) {
    console.error("Error deleting sponsor:", err);
  }
};

// ---------------- VISITORS ----------------
export const getVisitors = (): VisitorSubmission[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.VISITORS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const fetchVisitorsAsync = async (): Promise<VisitorSubmission[]> => {
  try {
    const res = await fetch("/api/admin/registrations?type=visitor");
    if (res.ok) {
      const { records } = await res.json();
      if (Array.isArray(records)) {
        return records.map((d: any) => ({
          id: d.id,
          fullName: d.full_name,
          email: d.email,
          phone: d.phone,
          country: d.country,
          profession: d.profession || "Visitor",
          purpose: d.purpose || "General",
          daysAttending: Array.isArray(d.days_attending) ? d.days_attending : [d.days_attending],
          passCode: d.pass_code,
          status: d.status || "Approved",
          submittedAt: d.created_at ? new Date(d.created_at).toLocaleString() : new Date().toLocaleString(),
        }));
      }
    }
  } catch (err) {
    console.error("Error fetching visitors:", err);
  }
  return getVisitors();
};

export const addVisitor = async (
  data: Omit<VisitorSubmission, "id" | "passCode" | "status" | "submittedAt">
): Promise<VisitorSubmission> => {
  const generatedPassCode = `TGE-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEntry: VisitorSubmission = {
    ...data,
    id: `vis-${Date.now()}`,
    passCode: generatedPassCode,
    status: "Approved",
    submittedAt: new Date().toLocaleString(),
  };

  const list = getVisitors();
  const updated = [newEntry, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(updated));
  }

  const res = await fetch("/api/register/visitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result?.error) {
    throw new Error(result?.error || "Failed to submit visitor registration.");
  }
  if (result.data?.pass_code) {
    newEntry.passCode = result.data.pass_code;
  }

  return newEntry;
};

export const updateVisitorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getVisitors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visitor", id, status }),
    });
  } catch (err) {
    console.error("Error updating visitor status:", err);
  }
};

export const deleteVisitor = async (id: string) => {
  const list = getVisitors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(updated));
  }

  try {
    await fetch("/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visitor", id }),
    });
  } catch (err) {
    console.error("Error deleting visitor:", err);
  }
};
