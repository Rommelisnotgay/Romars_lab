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
  PinIcon,
  PinOff,
  Search,
  Loader2,
  Eye,
  Calendar,
  ThumbsUp,
} from "lucide-react";

// Types
interface Author {
  userId: string;
  name: string;
  code: string;
}

interface Post {
  _id: string;
  id?: string; // For in-memory storage
  title: string;
  content: string;
  author: Author;
  isPinned: boolean;
  likes: number;
  likedBy: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Main component
const AdminPinned = () => {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get('/posts');
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحميل المنشورات"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Toggle pin status
  const handleTogglePin = async (post: Post) => {
    try {
      await apiClient.put(`/admin/posts/${post._id || post.id}/pin`, {
        isPinned: !post.isPinned
      });
      
      toast({
        title: post.isPinned ? "تم إلغاء التثبيت" : "تم التثبيت",
        description: `تم ${post.isPinned ? 'إلغاء تثبيت' : 'تثبيت'} المنشور بنجاح`
      });
      
      // Update posts in state
      setPosts(posts.map(p => {
        if ((p._id || p.id) === (post._id || post.id)) {
          return { ...p, isPinned: !p.isPinned };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error toggling pin status:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تثبيت/إلغاء تثبيت المنشور"
      });
    }
  };
  
  // View post details
  const handleViewPost = (post: Post) => {
    // Open in a new tab
    window.open(`/posts?id=${post._id || post.id}`, '_blank');
  };
  
  // Filter posts - show only pinned posts by default
  const filteredPosts = posts
    .filter(post => 
      post.isPinned && (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
  // Count total pinned posts
  const pinnedPostsCount = posts.filter(post => post.isPinned).length;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">المنشورات المثبتة</h1>
          <p className="text-gray-600">إدارة المنشورات المثبتة على المنصة</p>
        </div>
        
        <div className="relative flex-grow md:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث في المنشورات المثبتة..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Stats Card */}
      <Card className="bg-yellow-50">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">المنشورات المثبتة</p>
            <p className="text-3xl font-bold">{pinnedPostsCount}</p>
            <p className="text-sm text-gray-500 mt-1">
              من إجمالي {posts.length} منشور
            </p>
          </div>
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <PinIcon className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
      
      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>المنشورات المثبتة</CardTitle>
          <CardDescription>
            المنشورات التي تظهر في أعلى الصفحة الرئيسية
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="mr-3 text-lg">جاري تحميل المنشورات...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 
                "لا توجد منشورات مثبتة مطابقة للبحث" : 
                "لا توجد منشورات مثبتة حالياً"
              }
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">العنوان</TableHead>
                    <TableHead className="hidden md:table-cell">الكاتب</TableHead>
                    <TableHead className="hidden md:table-cell">التاريخ</TableHead>
                    <TableHead className="text-center">الإعجابات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post._id || post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <PinIcon className="h-4 w-4 text-yellow-500 ml-2" />
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {post.author.name} ({post.author.code})
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 ml-1 text-blue-500" />
                          {post.likes}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePin(post)}
                            title="إلغاء التثبيت"
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <PinOff className="h-4 w-4 ml-1" />
                            إلغاء التثبيت
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPost(post)}
                            title="عرض المنشور"
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            عرض
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Unpinned Posts Section */}
      <Card>
        <CardHeader>
          <CardTitle>منشورات أخرى</CardTitle>
          <CardDescription>
            منشورات يمكن تثبيتها
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">العنوان</TableHead>
                    <TableHead className="hidden md:table-cell">الكاتب</TableHead>
                    <TableHead className="text-center">الإعجابات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts
                    .filter(post => !post.isPinned)
                    .slice(0, 5) // Show only 5 unpinned posts
                    .map((post) => (
                      <TableRow key={post._id || post.id}>
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {post.author.name} ({post.author.code})
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="flex items-center justify-center">
                            <ThumbsUp className="h-4 w-4 ml-1 text-blue-500" />
                            {post.likes}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePin(post)}
                            title="تثبيت"
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <PinIcon className="h-4 w-4 ml-1" />
                            تثبيت
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {posts.filter(post => !post.isPinned).length > 5 && (
                <div className="p-3 text-center text-sm text-gray-500 border-t">
                  تم عرض 5 منشورات فقط من أصل {posts.filter(post => !post.isPinned).length} منشور غير مثبت
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPinned; 