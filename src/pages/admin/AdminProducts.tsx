import { useState } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { useProducts, useCategories, useCreateProduct, useUpdateProduct, useDeleteProduct, type Product } from "@/hooks/use-products";
import { ImageUpload } from "@/components/ImageUpload";

export default function AdminProducts() {
  const { toast } = useToast();
  const { data: productList = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", category_id: "", description: "", short_description: "", material: "", primary_image: "" as string | null });

  const openNew = () => {
    setEditProduct(null);
    setForm({ name: "", slug: "", category_id: categories[0]?.id || "", description: "", short_description: "", material: "", primary_image: "" });
    setIsOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, slug: p.slug, category_id: p.category_id || "", description: p.description, short_description: p.short_description, material: p.material || "", primary_image: p.primary_image || "" });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast({ title: "Product name required", variant: "destructive" }); return; }
    try {
      if (editProduct) {
        await updateProduct.mutateAsync({ id: editProduct.id, ...form });
        toast({ title: "Product updated" });
      } else {
        await createProduct.mutateAsync({
          ...form,
          applications: [],
          specifications: {},
          colors: [],
          featured: false,
        });
        toast({ title: "Product created" });
      }
      setIsOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast({ title: "Product deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Products</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">{editProduct ? "Edit" : "Create"} Product</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="font-body" />
              <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="font-body" />
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full border border-border rounded-md p-2 text-sm font-body bg-background">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Input placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="font-body" />
              <Textarea placeholder="Short Description" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="font-body" rows={2} />
              <Textarea placeholder="Full Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="font-body" rows={4} />
              <div>
                <label className="text-sm font-medium text-foreground font-body block mb-2">Primary image</label>
                <ImageUpload bucket="product-images" value={form.primary_image} onChange={(v) => setForm({ ...form, primary_image: v || "" })} />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={createProduct.isPending || updateProduct.isPending}>
                {editProduct ? "Update" : "Create"} Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Category</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Material</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-body">Loading...</td></tr>
            ) : productList.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="p-4 text-sm text-foreground font-body font-medium">{p.name}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{categories.find((c) => c.id === p.category_id)?.name}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{p.material}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit className="w-4 h-4" /></Button>
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
