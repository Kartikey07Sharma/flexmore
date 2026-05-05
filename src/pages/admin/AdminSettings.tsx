import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface SettingRow { key: string; value: string }

export default function AdminSettings() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  const { data: settings = [] } = useQuery({
    queryKey: ["company-settings"],
    queryFn: () => api<SettingRow[]>("/api/settings", { auth: false }),
  });

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value || ""; });
    setForm(map);
  }, [settings]);

  const save = useMutation({
    mutationFn: (settings: Record<string, string>) =>
      api("/api/settings", { method: "PUT", body: JSON.stringify({ settings }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["company-settings"] });
      toast({ title: "Settings saved" });
      setEditing(false);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const settingsDisplay = [
    { key: "company_name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Location" },
    { key: "whatsapp", label: "WhatsApp Number" },
  ];

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Settings</h1>
      <div className="bg-card rounded-lg border border-border p-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Company Information</h2>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
              <Button size="sm" onClick={() => save.mutate(form)} disabled={save.isPending}>
                {save.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-4 font-body text-sm">
          {settingsDisplay.map(({ key, label }) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">{label}</span>
              {editing ? (
                <Input value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="max-w-xs font-body text-sm" />
              ) : (
                <span className="text-foreground font-medium">{form[key] || "—"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
