import AdminLayout from "./AdminLayout";
import { categories } from "@/data/products";

export default function AdminCategories() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Categories</h1>
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Slug</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border/50">
                <td className="p-4 text-sm text-foreground font-body font-medium">{c.name}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{c.slug}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
