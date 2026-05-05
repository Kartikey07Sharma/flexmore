import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  quantity: string;
  message: string;
  status?: string;
  created_at: string;
}

export function useInquiries() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: () => api<Inquiry[]>("/api/inquiries"),
  });
}

export function useSubmitInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inquiry: Omit<Inquiry, "id" | "created_at" | "status">) =>
      api<Inquiry>("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(inquiry),
        auth: false,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}
