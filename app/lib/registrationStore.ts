"use client";

import { supabase, isSupabaseConfigured } from "./supabaseClient";

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
  tier: "Platinum ($10,000)" | "Gold ($5,000)" | "Silver ($2,500)" | "Official Partner";
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
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("exhibitors")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
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
    } catch (err) {
      console.error("Error fetching exhibitors from Supabase:", err);
    }
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

  // Server API submission to database
  try {
    await fetch("/api/register/exhibitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Failed to sync exhibitor application with server:", err);
  }

  return newEntry;
};

export const updateExhibitorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getExhibitors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EXHIBITORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("exhibitors").update({ status }).eq("id", id);
    } catch (err) {
      console.error("Error updating exhibitor status in Supabase:", err);
    }
  }
};

export const deleteExhibitor = async (id: string) => {
  const list = getExhibitors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EXHIBITORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("exhibitors").delete().eq("id", id);
    } catch (err) {
      console.error("Error deleting exhibitor from Supabase:", err);
    }
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
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
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
    } catch (err) {
      console.error("Error fetching sponsors from Supabase:", err);
    }
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

  try {
    await fetch("/api/register/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Failed to sync sponsor application with server:", err);
  }

  return newEntry;
};

export const updateSponsorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getSponsors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("sponsors").update({ status }).eq("id", id);
    } catch (err) {
      console.error("Error updating sponsor status in Supabase:", err);
    }
  }
};

export const deleteSponsor = async (id: string) => {
  const list = getSponsors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("sponsors").delete().eq("id", id);
    } catch (err) {
      console.error("Error deleting sponsor from Supabase:", err);
    }
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
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("visitors")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
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
    } catch (err) {
      console.error("Error fetching visitors from Supabase:", err);
    }
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

  try {
    const res = await fetch("/api/register/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.data?.pass_code) {
      newEntry.passCode = result.data.pass_code;
    }
  } catch (err) {
    console.error("Failed to sync visitor registration with server:", err);
  }

  return newEntry;
};

export const updateVisitorStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
  const list = getVisitors();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("visitors").update({ status }).eq("id", id);
    } catch (err) {
      console.error("Error updating visitor status in Supabase:", err);
    }
  }
};

export const deleteVisitor = async (id: string) => {
  const list = getVisitors();
  const updated = list.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("visitors").delete().eq("id", id);
    } catch (err) {
      console.error("Error deleting visitor from Supabase:", err);
    }
  }
};
