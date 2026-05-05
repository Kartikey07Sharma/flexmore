import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpload, type Bucket } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";

interface Props {
  bucket: Bucket;
  value?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  label?: string;
}

export function ImageUpload({ bucket, value, onChange, accept = "image/*", label = "Upload image" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useUpload();
  const { toast } = useToast();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await upload(file, bucket);
      onChange(url);
      toast({ title: "Uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-32 h-32 rounded-md border border-border overflow-hidden bg-muted">
          <img src={apiUrl(value)} alt="" className="w-full h-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={() => onChange(null)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" onClick={() => ref.current?.click()} disabled={uploading}>
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : label}
        </Button>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </div>
  );
}
