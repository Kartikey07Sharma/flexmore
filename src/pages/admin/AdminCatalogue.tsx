import AdminLayout from "./AdminLayout";

export default function AdminCatalogue() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Catalogue</h1>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground font-body mb-4">Upload your product catalogue PDF for customers to download.</p>
        <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity font-body text-sm font-medium">
          Upload Catalogue PDF
          <input type="file" accept=".pdf" className="hidden" onChange={() => {}} />
        </label>
        <p className="text-xs text-muted-foreground mt-4 font-body">Connect to Lovable Cloud for persistent file storage.</p>
      </div>
    </AdminLayout>
  );
}
