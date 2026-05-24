"use server";

import { createServerClient } from "@/lib/supabase/server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  error?: string;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = (formData.get("full_name") as string | null)?.trim() ?? "";
  const organization = (formData.get("organization") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const lang = (formData.get("lang") as string | null) ?? "tr";

  // --- Validation ---
  if (!fullName) {
    return { status: "error", error: lang === "tr" ? "Ad soyad zorunludur." : "Full name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: lang === "tr" ? "Geçerli bir e-posta adresi giriniz." : "Please enter a valid email address." };
  }
  if (!message) {
    return { status: "error", error: lang === "tr" ? "Mesaj alanı zorunludur." : "Message is required." };
  }

  // --- Insert into Supabase ---
  const supabase = createServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    full_name: fullName,
    organization: organization || null,
    email,
    message,
    lang,
  });

  if (error) {
    console.error("[contact action] Supabase error:", error.message);
    return {
      status: "error",
      error:
        lang === "tr"
          ? "Mesajınız gönderilemedi. Lütfen tekrar deneyin."
          : "Failed to send your message. Please try again.",
    };
  }

  return { status: "success" };
}
