"use server";

import { createServerClient } from "@/lib/supabase/server";

export interface InvestorFormState {
  status: "idle" | "success" | "error";
  error?: string;
}

const validInvestorTypes = ["angel", "vc", "corporate", "family"] as const;
type InvestorType = (typeof validInvestorTypes)[number];

export async function submitInvestorForm(
  _prev: InvestorFormState,
  formData: FormData
): Promise<InvestorFormState> {
  const fullName = (formData.get("full_name") as string | null)?.trim() ?? "";
  const organization = (formData.get("organization") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const investorType = (formData.get("investor_type") as string | null) ?? "";
  const lang = (formData.get("lang") as string | null) ?? "tr";

  // --- Validation ---
  if (!fullName) {
    return { status: "error", error: lang === "tr" ? "Ad soyad zorunludur." : "Full name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: lang === "tr" ? "Geçerli bir e-posta adresi giriniz." : "Please enter a valid email address." };
  }
  if (!validInvestorTypes.includes(investorType as InvestorType)) {
    return { status: "error", error: lang === "tr" ? "Lütfen yatırımcı tipini seçiniz." : "Please select an investor type." };
  }

  // --- Insert into Supabase ---
  const supabase = createServerClient();
  const { error } = await supabase.from("investor_submissions").insert({
    full_name: fullName,
    organization: organization || null,
    email,
    investor_type: investorType,
    lang,
  });

  if (error) {
    console.error("[investor action] Supabase error:", error.message);
    return {
      status: "error",
      error:
        lang === "tr"
          ? "Talebiniz gönderilemedi. Lütfen tekrar deneyin."
          : "Failed to send your request. Please try again.",
    };
  }

  return { status: "success" };
}
