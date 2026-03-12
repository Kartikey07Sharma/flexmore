import { useState } from "react";
import { Trash2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminCatalogue() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: catalogues = [], isLoading } = useQuery({
    queryKey: ["catalogues"],
    queryFn: async () => {
      const { data, error } = await supabase.from("catalogues").select("*").order("uploaded_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteCatalogue = useMutation({
    mutationFn: async ({ id, file_url }: { id: string; file_url: string }) => {
      // Extract path from URL
      const path = file_url.split("/catalogues/")[1];
      if (path) await supabase.storage.from("catalogues").remove([path]);
      const { error } = await supabase.from("catalogues").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["catalogues"] }),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Only PDF files allowed", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("catalogues").upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("catalogues").getPublicUrl(fileName);
      const { error: dbError } = await supabase.from("catalogues").insert({ file_url: publicUrl, file_name: file.name });
      if (dbError) throw dbError;
      qc.invalidateQueries({ queryKey: ["catalogues"] });
      toast({ title: "Catalogue uploaded!" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Catalogue</h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity font-body text-sm font-medium">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload PDF"}
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
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
                <p className="text-sm font-medium text-foreground font-body">{cat.file_name || "Catalogue"}</p>
                <p className="text-xs text-muted-foreground font-body">{new Date(cat.uploaded_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <a href={cat.file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                </a>
                <Button variant="ghost" size="sm" onClick={() => deleteCatalogue.mutate({ id: cat.id, file_url: cat.file_url })}>
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
