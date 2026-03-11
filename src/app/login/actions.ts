"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Utility to convert a username into a hidden email for Supabase Auth
function getFakeEmail(name: string) {
  const safeName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${safeName}@veloranexus.local`;
}

export async function loginAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!name || !password) {
    return { error: "Name and password are required" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: getFakeEmail(name),
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to dashboard on successful login
  redirect("/");
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!name || !password) {
    return { error: "Name and password are required" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: getFakeEmail(name),
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to dashboard on successful signup
  redirect("/");
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
