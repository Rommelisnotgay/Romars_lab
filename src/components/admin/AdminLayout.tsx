import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  
  // التحقق من صحة التوكن باستخدام API
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("adminToken") || localStorage.getItem("auth_token");
        
        if (!token) {
          throw new Error("No token found");
        }
        
        // التحقق من صحة التوكن باستخدام apiClient
        const isValid = await apiClient.verifyToken();
        
        if (!isValid) {
          throw new Error("Invalid token");
        }
        
        setIsVerifying(false);
        
        // إذا كان المستخدم في الصفحة الرئيسية للإدارة، توجيهه إلى لوحة التحكم
        if (location.pathname === "/admin" || location.pathname === "/admin/") {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast({
          variant: "destructive",
          title: "خطأ في المصادقة",
          description: "يرجى تسجيل الدخول مرة أخرى",
        });
        
        // إزالة بيانات الجلسة
        localStorage.removeItem("adminToken");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminUsername");
        
        // توجيه المستخدم إلى صفحة تسجيل الدخول
        navigate("/admin/login");
      }
    };
    
    verifyToken();
  }, [navigate, location.pathname]);
  
  // عرض مؤشر التحميل أثناء التحقق
  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="mr-2 text-lg">جاري التحقق من الجلسة...</span>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen" dir="rtl">
      <Toaster />
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 