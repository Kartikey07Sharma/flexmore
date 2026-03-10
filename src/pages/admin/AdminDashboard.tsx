import { Package, FolderOpen, FileText, MessageSquare } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { products, categories } from "@/data/products";
import { blogPosts } from "@/data/blog";
import { getInquiries } from "@/data/inquiries";

export default function AdminDashboard() {
  const inquiries = getInquiries();
  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-primary" },
    { label: "Categories", value: categories.length, icon: FolderOpen, color: "bg-navy-light" },
    { label: "Blog Posts", value: blogPosts.length, icon: FileText, color: "bg-gold" },
    { label: "Inquiries", value: inquiries.length, icon: MessageSquare, color: "bg-secondary" },
  ];

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="text-3xl font-heading font-bold text-foreground">{s.value}</div>
            <p className="text-sm text-muted-foreground font-body mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Company</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Product</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="border-b border-border/50">
                  <td className="p-4 text-sm text-foreground font-body">{inq.name}</td>
                  <td className="p-4 text-sm text-muted-foreground font-body">{inq.company}</td>
                  <td className="p-4 text-sm text-muted-foreground font-body">{inq.product}</td>
                  <td className="p-4 text-sm text-muted-foreground font-body">{inq.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
