import supabaseClient from "../lib/supabase";

export default function useAccessForm(userId) {
  async function getYourData() {
    const { data, error } = await supabaseClient
      .from("forms")
      .select("*")
      .filter("user", "eq", userId)
      .single();

    if (error) {
      return { data: null };
    }
    return { data };
  }

  async function createEntry(form) {
    const { data } = await supabaseClient
      .from("forms")
      .select("*")
      .filter("user", "eq", userId);

    if (data.length > 0) {
      await supabaseClient
        .from("forms")
        .update({
          ...form,
        })
        .eq("user", userId);
    } else {
      await supabaseClient.from("forms").insert([
        {
          ...form,
          user: userId,
        },
      ]);
    }
  }

  return {
    getYourData,
    createEntry,
  };
}
