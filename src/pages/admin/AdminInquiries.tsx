import AdminLayout from "./AdminLayout";
import { useInquiries } from "@/hooks/use-inquiries";

export default function AdminInquiries() {
  const { data: inquiries = [], isLoading } = useInquiries();

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Inquiries</h1>
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Email</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Company</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Product</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Qty</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground font-body">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground font-body">Loading...</td></tr>
            ) : inquiries.map((inq) => (
              <tr key={inq.id} className="border-b border-border/50">
                <td className="p-4 text-sm text-foreground font-body font-medium">{inq.name}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{inq.email}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{inq.company}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{inq.product}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{inq.quantity}</td>
                <td className="p-4 text-sm text-muted-foreground font-body">{new Date(inq.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isLoading && inquiries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-body">No inquiries yet.</p>
        </div>
      )}
    </AdminLayout>
  );
}
