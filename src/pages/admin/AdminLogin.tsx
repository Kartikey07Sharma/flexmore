import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/admin");
    } else {
      toast({ title: "Invalid credentials", description: "Use admin@flexmore.com / admin123", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Flexmore Admin</h1>
          <p className="text-muted-foreground text-sm font-body mt-2">Sign in to manage your website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground font-body block mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@flexmore.com" className="font-body" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-body block mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="font-body" />
          </div>
          <Button type="submit" className="w-full" size="lg">Sign In</Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6 font-body">Demo: admin@flexmore.com / admin123</p>
      </div>
    </div>
  );
}
