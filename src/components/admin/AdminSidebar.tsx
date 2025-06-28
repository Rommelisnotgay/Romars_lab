import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  PinIcon,
  ThumbsUp,
  Trash,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, href, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-2",
          isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-indigo-50"
        )}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "لوحة التحكم",
      href: "/admin/dashboard"
    },
    {
      icon: <MessageSquare size={20} />,
      label: "المنشورات",
      href: "/admin/posts"
    },
    {
      icon: <Users size={20} />,
      label: "المستخدمين",
      href: "/admin/users"
    },
    {
      icon: <Bell size={20} />,
      label: "الإشعارات",
      href: "/admin/notifications"
    },
    {
      icon: <PinIcon size={20} />,
      label: "المنشورات المثبتة",
      href: "/admin/pinned"
    },
    {
      icon: <ThumbsUp size={20} />,
      label: "الإعجابات",
      href: "/admin/likes"
    },
    {
      icon: <UserCheck size={20} />,
      label: "المتصلين الآن",
      href: "/admin/online"
    },
    {
      icon: <Settings size={20} />,
      label: "الإعدادات",
      href: "/admin/settings"
    }
  ];
  
  const handleLogout = async () => {
    try {
      // Clear all authentication data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminLoginTime");
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      
      // Redirect to login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
      });
    }
  };
  
  return (
    <div 
      className={cn(
        "bg-white h-screen shadow-md flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="font-bold text-lg text-indigo-700">لوحة التحكم</h2>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={location.pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar; 