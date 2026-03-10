import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "@/components/PublicLayout";
import { products } from "@/data/products";
import { addInquiry } from "@/data/inquiries";

export default function Quote() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", product: "", quantity: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.product) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    addInquiry(form);
    toast({ title: "Quote request submitted!", description: "Our team will respond within 24 hours." });
    setForm({ name: "", company: "", email: "", phone: "", product: "", quantity: "", message: "" });
  };

  return (
    <PublicLayout>
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Request a Quote</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body">Tell us about your requirements and we'll provide competitive bulk pricing.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-2xl">
          <div className="bg-card p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground font-body mb-1 block">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="font-body" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground font-body mb-1 block">Company Name</label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="font-body" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground font-body mb-1 block">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="font-body" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground font-body mb-1 block">Phone</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="font-body" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1 block">Product *</label>
                <Select value={form.product} onValueChange={(v) => setForm({ ...form, product: v })}>
                  <SelectTrigger className="font-body"><SelectValue placeholder="Select a product" /></SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1 block">Quantity</label>
                <Input placeholder="e.g., 500 kg" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="font-body" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1 block">Message</label>
                <Textarea rows={5} placeholder="Describe your requirements..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="font-body" />
              </div>
              <Button type="submit" size="lg" className="w-full">Submit Quote Request</Button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
