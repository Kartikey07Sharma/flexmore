import { useRef, useState } from "react";
import { Trash2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiUrl } from "@/lib/api";
import { useUpload } from "@/hooks/use-upload";

interface Catalogue {
  id: string;
  title: string;
  file_url: string;
  file_size?: number;
  created_at: string;
}

export default function AdminCatalogue() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useUpload();
  const [busy, setBusy] = useState(false);

  const { data: catalogues = [], isLoading } = useQuery({
    queryKey: ["catalogues"],
    queryFn: () => api<Catalogue[]>("/api/catalogues", { auth: false }),
  });

  const deleteCat = useMutation({
    mutationFn: (id: string) => api<void>(`/api/catalogues/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["catalogues"] }),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Only PDF files allowed", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const { url, size } = await upload(file, "catalogues");
      await api("/api/catalogues", {
        method: "POST",
        body: JSON.stringify({ title: file.name, file_url: apiUrl(url), file_size: size }),
      });
      qc.invalidateQueries({ queryKey: ["catalogues"] });
      toast({ title: "Catalogue uploaded!" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Catalogue</h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity font-body text-sm font-medium">
          <Upload className="w-4 h-4" />
          {busy || uploading ? "Uploading..." : "Upload PDF"}
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={busy || uploading} />
        </label>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground font-body py-8">Loading...</p>
      ) : catalogues.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground font-body">No catalogues uploaded yet. Upload a PDF to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {catalogues.map((cat) => (
            <div key={cat.id} className="bg-card rounded-lg border border-border p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground font-body">{cat.title}</p>
                <p className="text-xs text-muted-foreground font-body">{new Date(cat.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <a href={apiUrl(cat.file_url)} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                </a>
                <Button variant="ghost" size="sm" onClick={() => deleteCat.mutate(cat.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
