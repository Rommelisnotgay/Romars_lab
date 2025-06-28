import { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  Bell,
  ThumbsUp,
  PinIcon,
  Eye,
  Calendar,
  Clock,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";

// Define stats type
interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  pinnedPosts: number;
  activeUsers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
    pinnedPosts: 0,
    activeUsers: 0
  });

  const [lastLogin, setLastLogin] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get last login time
    const loginTime = localStorage.getItem("adminLoginTime");
    if (loginTime) {
      const date = new Date(loginTime);
      setLastLogin(date.toLocaleString("ar-EG"));
    }

    // Function to fetch dashboard data
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch real stats from API
        const data = await apiClient.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          variant: "destructive",
          title: "خطأ في تحميل البيانات",
          description: "فشل في تحميل إحصائيات لوحة التحكم"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "المنشورات",
      value: stats.totalPosts,
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "التعليقات",
      value: stats.totalComments,
      icon: <MessageSquare className="h-6 w-6 text-yellow-600" />,
      color: "bg-yellow-50"
    },
    {
      title: "الإعجابات",
      value: stats.totalLikes,
      icon: <ThumbsUp className="h-6 w-6 text-pink-600" />,
      color: "bg-pink-50"
    },
    {
      title: "المنشورات المثبتة",
      value: stats.pinnedPosts,
      icon: <PinIcon className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "المستخدمون النشطون",
      value: stats.activeUsers,
      icon: <Eye className="h-6 w-6 text-indigo-600" />,
      color: "bg-indigo-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="text-gray-500">
            إدارة وتحليل جميع البيانات من مكان واحد
          </p>
        </div>
        <Card className="w-full md:w-auto">
          <CardContent className="py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>آخر تسجيل دخول:</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>{lastLogin}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-lg mr-3">جاري تحميل البيانات...</span>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat, index) => (
            <Card key={index} className={stat.color}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
