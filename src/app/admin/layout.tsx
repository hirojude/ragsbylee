"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();

  // Protect admin routes
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth");
      } else if (!isAdmin) {
        router.push("/"); // Redirect non-admin users to home
      }
    }
  }, [user, loading, isAdmin, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-900">RagsByLee Admin</h1>
        </div>
        <div className="px-4">
          <div className="space-y-2">
            <Link 
              href="/admin"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/admin/products"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link 
              href="/admin/orders"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </Link>
            <Link 
              href="/admin/customers"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </Link>
            <Link 
              href="/admin/settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-4">
            <Button
              variant="ghost"
              className="w-full flex items-center space-x-3 text-gray-700 hover:bg-purple-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
} 