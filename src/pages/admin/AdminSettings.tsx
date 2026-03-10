import AdminLayout from "./AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Settings</h1>
      <div className="bg-card rounded-lg border border-border p-8 max-w-2xl">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-6">Company Information</h2>
        <div className="space-y-4 font-body text-sm">
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Company Name</span>
            <span className="text-foreground font-medium">Flexmore</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground font-medium">info@flexmore.com</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Phone</span>
            <span className="text-foreground font-medium">+91 98765 43210</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Location</span>
            <span className="text-foreground font-medium">Selaqui, Dehradun</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-6 font-body">Connect to Lovable Cloud to make settings editable and persistent.</p>
      </div>
    </AdminLayout>
  );
}
