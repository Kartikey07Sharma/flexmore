import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  quantity: string;
  message: string;
  created_at: string;
}

export function useInquiries() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Inquiry[];
    },
  });
}

export function useSubmitInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (inquiry: Omit<Inquiry, "id" | "created_at">) => {
      const { data, error } = await supabase.from("inquiries").insert(inquiry).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}
