import { ReactNode } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, Package, FolderOpen, FileText, MessageSquare, FileDown, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: FolderOpen },
  { name: "Blog", path: "/admin/blog", icon: FileText },
  { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
  { name: "Catalogue", path: "/admin/catalogue", icon: FileDown },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-primary-foreground/10">
          <Link to="/" className="font-heading text-xl font-bold">Flexmore</Link>
          <p className="text-xs opacity-60 font-body mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-body transition-colors ${
                location.pathname === item.path
                  ? "bg-primary-foreground/10 text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <button onClick={logout} className="flex items-center gap-3 px-2 py-2 text-sm text-primary-foreground/60 hover:text-primary-foreground font-body w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Mobile header */}
        <header className="md:hidden bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <span className="font-heading font-bold">Flexmore Admin</span>
          <button onClick={logout} className="text-sm font-body opacity-60">Logout</button>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
