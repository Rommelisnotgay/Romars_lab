import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Trash2,
  Edit,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
interface Notification {
  _id: string;
  id?: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  active: boolean;
  expiresAt: string;
  createdAt: string;
  displayDuration?: number; // Duration in seconds
}

// Mock function to generate unique IDs
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [displayDuration, setDisplayDuration] = useState("3"); // Default 3 seconds

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // Try to fetch from API
      try {
        const data = await fetchWithAuth("/notifications");
      setNotifications(data);
      } catch (error) {
        console.error("API error:", error);
        // Fallback to local storage if API fails
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        } else {
          // Initialize with empty array if nothing in storage
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحميل الإشعارات",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save notifications to local storage
  const saveNotificationsToStorage = (updatedNotifications: Notification[]) => {
    try {
      // تأكد من أن الإشعارات مصفوفة صالحة
      if (!Array.isArray(updatedNotifications)) {
        console.error("Invalid notifications data - must be an array:", updatedNotifications);
        return;
      }

      // التحقق من عدم وجود تكرار في الإشعارات باستخدام المعرف الفريد
      const uniqueNotifications = removeDuplicateNotifications(updatedNotifications);
      if (uniqueNotifications.length !== updatedNotifications.length) {
        console.log(`Removed ${updatedNotifications.length - uniqueNotifications.length} duplicate notifications`);
      }
      
      // مقارنة مع الإشعارات المخزنة حاليًا لتجنب تكرار الحفظ غير الضروري
      const currentStoredStr = localStorage.getItem("notifications");
      if (currentStoredStr) {
        try {
          const currentStored = JSON.parse(currentStoredStr);
          // إذا كانت البيانات متطابقة، لا تقم بالحفظ مرة أخرى
          if (JSON.stringify(uniqueNotifications) === JSON.stringify(currentStored)) {
            console.log("No changes in notifications, skipping localStorage update");
            return;
          }
        } catch (e) {
          console.warn("Error parsing existing notifications:", e);
        }
      }

      // احفظ الإشعارات في localStorage
      localStorage.setItem("notifications", JSON.stringify(uniqueNotifications));
      console.log("Notifications saved to localStorage:", uniqueNotifications);
      
      // أرسل حدث للتنبيه عن التغيير في localStorage
      try {
        // للنوافذ الأخرى (التي تستمع إلى حدث 'storage')
        // هذه طريقة غريبة لكنها تعمل لإطلاق حدث storage لتنبيه الصفحات الأخرى
        const tempStorageKey = "_temp_notify_" + Date.now();
        localStorage.setItem(tempStorageKey, "1");
        localStorage.removeItem(tempStorageKey);
        
        // لنفس النافذة (تستمع إلى حدث مخصص 'localStorageChanged')
        const event = new CustomEvent('localStorageChanged', { 
          detail: { key: 'notifications', timestamp: Date.now() } 
        });
        console.log("Dispatching localStorageChanged event");
        window.dispatchEvent(event);
      } catch (e) {
        console.error("Error dispatching storage event:", e);
      }
    } catch (e) {
      console.error("Error saving notifications to localStorage:", e);
    }
  };

  // إزالة الإشعارات المكررة
  const removeDuplicateNotifications = (notifications: Notification[]): Notification[] => {
    const uniqueMap = new Map<string, Notification>();
    
    for (const notification of notifications) {
      const id = notification._id || notification.id || '';
      if (id && !uniqueMap.has(id)) {
        uniqueMap.set(id, notification);
      }
    }
    
    return Array.from(uniqueMap.values());
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Get notification badge based on type
  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "info":
        return <Badge className="bg-blue-500">معلومات</Badge>;
      case "success":
        return <Badge className="bg-green-500">نجاح</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">تحذير</Badge>;
      case "error":
        return <Badge className="bg-red-500">خطأ</Badge>;
      default:
        return <Badge>معلومات</Badge>;
    }
  };

  // Create notification
  const handleCreateNotification = async () => {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Try API first
      try {
        const response = await fetchWithAuth("/notifications", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          type,
            displayDuration: Number(displayDuration),
        }),
      });

      // Update notifications list
      setNotifications([response, ...notifications]);
        saveNotificationsToStorage([response, ...notifications]);
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Create local notification with generated ID
        const now = new Date();
        // Set default expiry to 24 hours from now
        const expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        const newNotification: Notification = {
          _id: generateId(),
          title,
          content,
          type: type as 'info' | 'success' | 'warning' | 'error',
          active: true,
          displayDuration: Number(displayDuration),
          createdAt: now.toISOString(),
          expiresAt: expiryDate.toISOString()
        };
        
        const updatedNotifications = [newNotification, ...notifications];
        setNotifications(updatedNotifications);
        saveNotificationsToStorage(updatedNotifications);
      }

      // Reset form and close dialog
      resetForm();
      setIsCreateDialogOpen(false);

      toast({
        title: "تم إنشاء الإشعار",
        description: "تم إنشاء الإشعار بنجاح",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إنشاء الإشعار",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update notification
  const handleUpdateNotification = async () => {
    if (!selectedNotification || !title || !content) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const notificationId = selectedNotification._id || selectedNotification.id;
      
      // Try API first
      try {
        const response = await fetchWithAuth(`/notifications/${notificationId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
          type,
            displayDuration: Number(displayDuration),
        }),
      });

      // Update notifications list
      setNotifications(
        notifications.map((n) =>
          (n._id || n.id) === (response._id || response.id) ? response : n
        )
      );
        saveNotificationsToStorage(
          notifications.map((n) =>
            (n._id || n.id) === (response._id || response.id) ? response : n
          )
        );
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Update notification locally
        const now = new Date();
        // Keep the original expiry date or set to 24 hours from now
        const expiryDate = selectedNotification.expiresAt ? 
          new Date(selectedNotification.expiresAt) : 
          new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        const updatedNotification = {
          ...selectedNotification,
          title,
          content,
          type,
          displayDuration: Number(displayDuration),
          updatedAt: now.toISOString(),
          expiresAt: expiryDate.toISOString()
        };
        
        const updatedNotifications = notifications.map((n) =>
          (n._id || n.id) === notificationId ? updatedNotification : n
        );
        
        setNotifications(updatedNotifications);
        saveNotificationsToStorage(updatedNotifications);
      }
    
      // Reset form and close dialog
      resetForm();
      setIsEditDialogOpen(false);
      setSelectedNotification(null);

      toast({
        title: "تم تحديث الإشعار",
        description: "تم تحديث الإشعار بنجاح",
      });
    } catch (error) {
      console.error("Error updating notification:", error);
    toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحديث الإشعار",
    });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete notification
  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;

    setIsSubmitting(true);

    try {
      const notificationId = selectedNotification._id || selectedNotification.id;
      
      // Try API first
      try {
        await fetchWithAuth(`/notifications/${notificationId}`, {
        method: "DELETE",
      });
      } catch (apiError) {
        console.error("API error:", apiError);
        // Continue with local deletion even if API fails
      }

      // Update notifications list
      const updatedNotifications = notifications.filter(
        (n) => (n._id || n.id) !== notificationId
      );
      setNotifications(updatedNotifications);
      saveNotificationsToStorage(updatedNotifications);

      // Close dialog and reset selection
      setIsDeleteDialogOpen(false);
      setSelectedNotification(null);

      toast({
        title: "تم حذف الإشعار",
        description: "تم حذف الإشعار بنجاح",
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في حذف الإشعار",
    });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setContent("");
    setType("info");
    setDisplayDuration("3");
  };
  
  // Open edit dialog
  const openEditDialog = (notification: Notification) => {
    setSelectedNotification(notification);
    setTitle(notification.title);
    setContent(notification.content);
    setType(notification.type);
    setDisplayDuration(notification.displayDuration?.toString() || "3");
    setIsEditDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الإشعارات</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إشعار جديد
          </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>الإشعارات النشطة</CardTitle>
          <CardDescription>
            إدارة الإشعارات التي تظهر للمستخدمين على الموقع
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="mr-3 text-lg">جاري تحميل الإشعارات...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد إشعارات نشطة
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>النوع</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>المحتوى</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification._id || notification.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {getNotificationIcon(notification.type)}
                        <span className="mr-2">
                          {getNotificationBadge(notification.type)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{notification.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{notification.content}</TableCell>
                    <TableCell>{formatDate(notification.expiresAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(notification)}>
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedNotification(notification);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء إشعار جديد</DialogTitle>
            <DialogDescription>
              أضف إشعارًا جديدًا ليظهر للمستخدمين على الموقع
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                عنوان الإشعار
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل عنوان الإشعار"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                محتوى الإشعار
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="أدخل محتوى الإشعار"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  نوع الإشعار
                </label>
              <Select
                  value={type}
                  onValueChange={(value: any) => setType(value)}
              >
                <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الإشعار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">معلومات</SelectItem>
                  <SelectItem value="success">نجاح</SelectItem>
                    <SelectItem value="warning">تحذير</SelectItem>
                    <SelectItem value="error">خطأ</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="displayDuration" className="text-sm font-medium">
                  مدة ظهور الإشعار (بالثواني)
                </label>
                <Select value={displayDuration} onValueChange={setDisplayDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="مدة ظهور الإشعار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 ثواني</SelectItem>
                    <SelectItem value="5">5 ثواني</SelectItem>
                    <SelectItem value="8">8 ثواني</SelectItem>
                    <SelectItem value="12">12 ثانية</SelectItem>
                    <SelectItem value="20">20 ثانية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateNotification} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                "إنشاء"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notification Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تعديل الإشعار</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الإشعار
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                عنوان الإشعار
              </label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل عنوان الإشعار"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-content" className="text-sm font-medium">
                محتوى الإشعار
              </label>
          <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="أدخل محتوى الإشعار"
                className="min-h-[100px]"
              />
        </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-type" className="text-sm font-medium">
                  نوع الإشعار
                </label>
                <Select
                  value={type}
                  onValueChange={(value: any) => setType(value)}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="اختر نوع الإشعار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">معلومات</SelectItem>
                    <SelectItem value="success">نجاح</SelectItem>
                    <SelectItem value="warning">تحذير</SelectItem>
                    <SelectItem value="error">خطأ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-displayDuration" className="text-sm font-medium">
                  مدة ظهور الإشعار (بالثواني)
                </label>
                <Select value={displayDuration} onValueChange={setDisplayDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="مدة ظهور الإشعار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 ثواني</SelectItem>
                    <SelectItem value="5">5 ثواني</SelectItem>
                    <SelectItem value="8">8 ثواني</SelectItem>
                    <SelectItem value="12">12 ثانية</SelectItem>
                    <SelectItem value="20">20 ثانية</SelectItem>
                  </SelectContent>
                </Select>
                  </div>
                </div>
                </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
                  </Button>
            <Button onClick={handleUpdateNotification} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                "تحديث"
              )}
                </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Notification Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف هذا الإشعار؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteNotification} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                "حذف"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNotifications; 