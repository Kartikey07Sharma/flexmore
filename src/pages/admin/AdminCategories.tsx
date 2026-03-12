import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { useCategories, useCreateCategory, useDeleteCategory } from "@/hooks/use-products";

export default function AdminCategories() {
  const { toast } = useToast();
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const handleCreate = async () => {
    if (!form.name.trim()) { toast({ title: "Name required", variant: "destructive" }); return; }
    try {
      await createCategory.mutateAsync(form);
      toast({ title: "Category created" });
      setIsOpen(false);
      setForm({ name: "", slug: "", description: "" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast({ title: "Category deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Categories</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle className="font-heading">Create Category</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Category Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="font-body" />
              <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="font-body" />
              <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="font-body" />
              <Button onClick={handleCreate} className="w-full" disabled={createCategory.isPending}>Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Slug</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Description</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-body">Loading...</td></tr>
            ) : categories.map((c) => (
              <tr key={c.id} className="border-b border-border/50">
                <td className="p-4 text-sm text-foreground font-body font-medium">{c.name}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{c.slug}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{c.description}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
