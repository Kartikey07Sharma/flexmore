import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost } from "@/hooks/use-blog";
import { ImageUpload } from "@/components/ImageUpload";

export default function AdminBlog() {
  const { toast } = useToast();
  const { data: posts = [], isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", image: "" as string | null });

  const handleCreate = async () => {
    if (!form.title.trim()) { toast({ title: "Title required", variant: "destructive" }); return; }
    try {
      await createPost.mutateAsync(form);
      setIsOpen(false);
      setForm({ title: "", slug: "", excerpt: "", content: "", image: "" });
      toast({ title: "Blog post created" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast({ title: "Blog post deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Blog Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">Create Blog Post</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="font-body" />
              <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="font-body" />
              <Textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="font-body" rows={2} />
              <Textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="font-body" rows={6} />
              <div>
                <label className="text-sm font-medium text-foreground font-body block mb-2">Cover image</label>
                <ImageUpload bucket="blog-images" value={form.image} onChange={(v) => setForm({ ...form, image: v || "" })} />
              </div>
              <Button onClick={handleCreate} className="w-full" disabled={createPost.isPending}>Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Title</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Date</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={3} className="p-8 text-center text-muted-foreground font-body">Loading...</td></tr>
            ) : posts.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="p-4 text-sm text-foreground font-body font-medium">{p.title}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
