import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Clock, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface ActiveUser {
  _id: string;
  id?: string;
  ipAddress: string;
  name: string;
  code: string;
  lastVisit: string;
}

const AdminOnline = () => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch active users
  const fetchActiveUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWithAuth("/active-users");
      setActiveUsers(data);
    } catch (error) {
      console.error("Error fetching active users:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحميل المستخدمين النشطين",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh active users
  const refreshActiveUsers = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchWithAuth("/active-users");
      setActiveUsers(data);
      toast({
        title: "تم التحديث",
        description: "تم تحديث قائمة المستخدمين النشطين",
      });
    } catch (error) {
      console.error("Error refreshing active users:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحديث المستخدمين النشطين",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchActiveUsers();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Format date
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);

    if (diffMin < 1) {
      return "الآن";
    } else if (diffMin === 1) {
      return "منذ دقيقة";
    } else if (diffMin < 60) {
      return `منذ ${diffMin} دقيقة`;
    } else {
      const diffHours = Math.round(diffMin / 60);
      if (diffHours === 1) {
        return "منذ ساعة";
      } else {
        return `منذ ${diffHours} ساعة`;
      }
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    if (!name || name === "زائر") return "؟";
    
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">المستخدمون النشطون</h1>
        <Button onClick={refreshActiveUsers} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ml-2 ${isRefreshing ? "animate-spin" : ""}`} />
          تحديث
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المستخدمون المتواجدون حاليًا</CardTitle>
          <CardDescription>
            قائمة بالمستخدمين النشطين خلال آخر 15 دقيقة
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="mr-3 text-lg">جاري تحميل المستخدمين النشطين...</span>
            </div>
          ) : activeUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا يوجد مستخدمون نشطون حاليًا
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الكود</TableHead>
                  <TableHead>آخر نشاط</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeUsers.map((user) => (
                  <TableRow key={user._id || user.id || user.ipAddress}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.name || "زائر"}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[150px]">
                            {user.ipAddress}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.code ? (
                        <Badge variant="outline" className="text-xs">
                          #{user.code}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 ml-1 text-gray-400" />
                        <span>{formatTimeAgo(user.lastVisit)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">متصل</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOnline; 