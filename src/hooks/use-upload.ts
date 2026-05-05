import { useState } from "react";
import { api, apiUrl, tokenStore } from "@/lib/api";

export type Bucket = "product-images" | "blog-images" | "catalogues";

export function useUpload() {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File, bucket: Bucket): Promise<{ url: string; absoluteUrl: string; size: number; mimetype: string }> {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const token = tokenStore.get();
      const res = await fetch(apiUrl(`/api/uploads/${bucket}`), {
        method: "POST",
        body: fd,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");
      return { ...data, absoluteUrl: apiUrl(data.url) };
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading };
}
