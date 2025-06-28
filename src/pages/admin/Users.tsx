import { useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  UserIcon,
  ShieldIcon,
  UserCheck,
  UserX,
  Loader2,
  Copy,
} from "lucide-react";

// User interface
interface User {
  _id: string;
  id?: string; // For in-memory storage
  username: string;
  displayName: string;
  code: string;
  role: string;
  active: boolean;
  createdAt: string;
}

// Main component
const AdminUsers = () => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // New user form
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    displayName: "",
    role: "user",
  });
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);
  
  // Fetch users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحميل المستخدمين"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Create new user
  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.password) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى إدخال اسم المستخدم وكلمة المرور"
      });
      return;
    }
    
    setIsSubmittingUser(true);
    
    try {
      await apiClient.post('/admin/users', {
        username: newUser.username,
        password: newUser.password,
        displayName: newUser.displayName || newUser.username,
        role: newUser.role
      });
      
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء المستخدم بنجاح"
      });
      
      // Reset form
      setNewUser({
        username: "",
        password: "",
        displayName: "",
        role: "user"
      });
      
      // Close dialog
      setIsNewUserDialogOpen(false);
      
      // Refresh users
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إنشاء المستخدم"
      });
    } finally {
      setIsSubmittingUser(false);
    }
  };
  
  // Copy user code to clipboard
  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الكود إلى الحافظة"
    });
    
    // Reset copied status after 2 seconds
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };
  
  // View user details
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };
  
  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة المستخدمين وأدوارهم وأكوادهم</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث في المستخدمين..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsNewUserDialogOpen(true)}>
            <Plus className="h-4 w-4 ml-1" />
            مستخدم جديد
          </Button>
        </div>
      </div>
      
      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>المستخدمين</CardTitle>
          <CardDescription>
            قائمة المستخدمين المسجلين ({users.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="mr-3 text-lg">جاري تحميل المستخدمين...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا يوجد مستخدمون مطابقون للبحث
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">اسم المستخدم</TableHead>
                    <TableHead className="hidden md:table-cell">الاسم المعروض</TableHead>
                    <TableHead className="text-center">الكود</TableHead>
                    <TableHead className="text-center">الدور</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="hidden md:table-cell">تاريخ الإنشاء</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id || user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.displayName}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="bg-slate-100">
                            {user.code}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 mr-1"
                            onClick={() => copyCodeToClipboard(user.code)}
                          >
                            <Copy 
                              className={`h-3 w-3 ${
                                copiedCode === user.code ? "text-green-500" : "text-gray-500"
                              }`} 
                            />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {user.role === "admin" ? (
                          <Badge className="bg-purple-100 text-purple-800">
                            <ShieldIcon className="h-3 w-3 ml-1" />
                            مدير
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-800">
                            <UserIcon className="h-3 w-3 ml-1" />
                            مستخدم
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.active ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <UserCheck className="h-3 w-3 ml-1" />
                            نشط
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            <UserX className="h-3 w-3 ml-1" />
                            غير نشط
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewUserDetails(user)}
                        >
                          عرض
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* New User Dialog */}
      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            <DialogDescription>
              أضف مستخدمًا جديدًا وحدد دوره وبياناته
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                اسم المستخدم*
              </label>
              <Input
                id="username"
                placeholder="أدخل اسم المستخدم"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور*
              </label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                الاسم المعروض
              </label>
              <Input
                id="displayName"
                placeholder="الاسم المعروض (اختياري)"
                value={newUser.displayName}
                onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                إذا تركته فارغًا، سيتم استخدام اسم المستخدم
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                الدور
              </label>
              <select
                id="role"
                className="w-full border border-gray-300 rounded-md p-2"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">مستخدم</option>
                <option value="admin">مدير</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewUserDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={isSubmittingUser || !newUser.username || !newUser.password}
            >
              {isSubmittingUser && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              إنشاء المستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تفاصيل المستخدم</DialogTitle>
              <DialogDescription>
                معلومات المستخدم {selectedUser.displayName || selectedUser.username}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">اسم المستخدم</h4>
                  <p className="mt-1">{selectedUser.username}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">الاسم المعروض</h4>
                  <p className="mt-1">{selectedUser.displayName || "-"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">الكود</h4>
                  <div className="mt-1 flex items-center">
                    <Badge variant="outline" className="bg-slate-100 mr-2">
                      {selectedUser.code}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyCodeToClipboard(selectedUser.code)}
                    >
                      <Copy 
                        className={`h-3 w-3 ${
                          copiedCode === selectedUser.code ? "text-green-500" : "text-gray-500"
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">الدور</h4>
                  <p className="mt-1">
                    {selectedUser.role === "admin" ? "مدير" : "مستخدم"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">الحالة</h4>
                  <p className="mt-1">
                    {selectedUser.active ? "نشط" : "غير نشط"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">تاريخ الإنشاء</h4>
                  <p className="mt-1">
                    {new Date(selectedUser.createdAt).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t">
                <h4 className="font-medium mb-2">استخدام الكود</h4>
                <p className="text-sm text-gray-600">
                  يمكن للمستخدم استخدام الكود {" "}
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{selectedUser.code}</code>
                  {" "} عند كتابة منشور لربطه بحسابه.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminUsers; 