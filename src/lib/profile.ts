import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  whatsapp: string;
  region: string;
  city: string;
  address: string;
  directions: string;
  notify_new_drops: boolean;
};

export const EMPTY_PROFILE: Omit<Profile, "id"> = {
  full_name: "",
  phone: "",
  email: "",
  whatsapp: "",
  region: "",
  city: "",
  address: "",
  directions: "",
  notify_new_drops: true,
};

export async function fetchMyProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? null;
}

export async function saveMyProfile(profile: Profile): Promise<void> {
  const { error } = await supabase.from("profiles").upsert({
    id: profile.id,
    full_name: profile.full_name,
    phone: profile.phone,
    email: profile.email,
    whatsapp: profile.whatsapp,
    region: profile.region,
    city: profile.city,
    address: profile.address,
    directions: profile.directions,
    notify_new_drops: profile.notify_new_drops,
  });
  if (error) throw error;
}
