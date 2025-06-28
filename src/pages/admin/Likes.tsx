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
  ThumbsUp,
  Search,
  Loader2,
  Eye,
  ArrowUpDown,
  Calendar,
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
const AdminLikes = () => {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "date">("likes");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
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
  
  // View post details
  const handleViewPost = (post: Post) => {
    // Open in a new tab
    window.open(`/posts?id=${post._id || post.id}`, '_blank');
  };
  
  // Toggle sort direction
  const handleSort = (type: "likes" | "date") => {
    if (sortBy === type) {
      // Toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort type with default desc direction
      setSortBy(type);
      setSortDirection("desc");
    }
  };
  
  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "likes") {
        return sortDirection === "asc" ? a.likes - b.likes : b.likes - a.likes;
      } else { // date
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  
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
          <h1 className="text-2xl font-bold mb-2">الإعجابات</h1>
          <p className="text-gray-600">متابعة المنشورات الأكثر إعجاباً</p>
        </div>
        
        <div className="relative flex-grow md:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث في المنشورات..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">إجمالي الإعجابات</p>
              <p className="text-3xl font-bold">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full text-white">
              <ThumbsUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">المنشورات</p>
              <p className="text-3xl font-bold">{posts.length}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full text-white">
              <Calendar className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">متوسط الإعجابات</p>
              <p className="text-3xl font-bold">
                {posts.length > 0 
                  ? (posts.reduce((sum, post) => sum + post.likes, 0) / posts.length).toFixed(1) 
                  : 0}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-full text-white">
              <ArrowUpDown className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>المنشورات حسب الإعجابات</CardTitle>
          <CardDescription>
            قائمة المنشورات مرتبة حسب عدد الإعجابات
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="mr-3 text-lg">جاري تحميل المنشورات...</span>
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد منشورات مطابقة للبحث
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">العنوان</TableHead>
                    <TableHead className="hidden md:table-cell">الكاتب</TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        <span>التاريخ</span>
                        {sortBy === "date" && (
                          <ArrowUpDown className="h-3 w-3 mr-1 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-center cursor-pointer"
                      onClick={() => handleSort("likes")}
                    >
                      <div className="flex items-center justify-center">
                        <span>الإعجابات</span>
                        {sortBy === "likes" && (
                          <ArrowUpDown className="h-3 w-3 mr-1 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-center">مثبت</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedPosts.map((post) => (
                    <TableRow key={post._id || post.id}>
                      <TableCell className="font-medium">
                        {post.title}
                        {post.isPinned && (
                          <Badge className="mr-2 bg-yellow-500" variant="secondary">
                            مثبت
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {post.author.name} ({post.author.code})
                      </TableCell>
                      <TableCell>
                        {formatDate(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 ml-1 text-blue-500" />
                          <span className={post.likes > 5 ? "font-bold" : ""}>
                            {post.likes}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {post.isPinned ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            نعم
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            لا
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewPost(post)}
                          title="عرض المنشور"
                        >
                          <Eye className="h-4 w-4 ml-1" />
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
    </div>
  );
};

export default AdminLikes; 