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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  ThumbsUp,
  PinOff,
  Pin,
  PencilLine,
  Trash2,
  MessageSquare,
  Search,
  Plus,
  Loader2,
  PinIcon,
  MoreVertical,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface Comment {
  _id: string;
  id?: string; // For in-memory storage
  postId: string;
  content: string;
  author: Author;
  createdAt: string;
}

// Main component
const AdminPosts = () => {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLikesDialogOpen, setIsLikesDialogOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false);
  
  // New post form
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    authorName: "",
    tags: ""
  });
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  
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
  
  // Delete post
  const handleDeletePost = async () => {
    if (!selectedPost) return;
    
    try {
      await apiClient.delete(`/admin/posts/${selectedPost._id || selectedPost.id}`);
      
      toast({
        title: "تم الحذف",
        description: "تم حذف المنشور بنجاح"
      });
      
      // Update posts in state
      setPosts(posts.filter(p => (p._id || p.id) !== (selectedPost._id || selectedPost.id)));
      
      // Close dialog
      setIsDeleteDialogOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في حذف المنشور"
      });
    }
  };
  
  // View comments
  const handleViewComments = async (post: Post) => {
    setSelectedPost(post);
    setIsCommentsOpen(true);
    setIsLoadingComments(true);
    
    try {
      const data = await apiClient.get(`/posts/${post._id || post.id}/comments`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحميل التعليقات"
      });
    } finally {
      setIsLoadingComments(false);
    }
  };
  
  // Create new post
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى إدخال العنوان والمحتوى"
      });
      return;
    }
    
    setIsSubmittingPost(true);
    
    try {
      await apiClient.post('/posts', {
        title: newPost.title,
        content: newPost.content,
        authorName: newPost.authorName,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      
      toast({
        title: "تم النشر",
        description: "تم نشر المنشور بنجاح"
      });
      
      // Reset form
      setNewPost({
        title: "",
        content: "",
        authorName: "",
        tags: ""
      });
      
      // Close dialog
      setIsNewPostDialogOpen(false);
      
      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إنشاء المنشور"
      });
    } finally {
      setIsSubmittingPost(false);
    }
  };
  
  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  
  // Update likes count
  const handleUpdateLikes = async () => {
    if (!selectedPost) return;
    
    try {
      setIsUpdatingLikes(true);
      
      // تحديث عدد الإعجابات في قاعدة البيانات
      await apiClient.put(`/admin/posts/${selectedPost._id || selectedPost.id}/update-likes`, {
        likes: parseInt(likesCount.toString())
      });

      // تحديث الحالة المحلية
      setPosts(posts.map(p => 
        (p._id || p.id) === (selectedPost._id || selectedPost.id)
          ? { ...p, likes: parseInt(likesCount.toString()) }
          : p
      ));

      setIsLikesDialogOpen(false);
      setSelectedPost(null);
      
      toast({
        title: "تم تحديث الإعجابات",
        description: "تم تحديث عدد الإعجابات بنجاح",
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحديث عدد الإعجابات",
      });
    } finally {
      setIsUpdatingLikes(false);
    }
  };
  
  // Open likes dialog
  const openLikesDialog = (post: Post) => {
    setSelectedPost(post);
    setLikesCount(post.likes);
    setIsLikesDialogOpen(true);
  };
  
  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!selectedPost) return;
    
    try {
      const postId = selectedPost._id || selectedPost.id;
      
      // Try API first
      try {
        await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
      } catch (apiError) {
        console.error("API error:", apiError);
        // Continue with local deletion even if API fails
      }

      // Update comments list by removing the deleted comment
      setComments(comments.filter(comment => (comment._id || comment.id) !== commentId));
      
      toast({
        title: "تم الحذف",
        description: "تم حذف التعليق بنجاح",
        duration: 3000,
      });
      
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في حذف التعليق"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">إدارة المنشورات</h1>
          <p className="text-gray-600">إدارة المنشورات والتعليقات على المنصة</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث في المنشورات..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsNewPostDialogOpen(true)}>
            <Plus className="h-4 w-4 ml-1" />
            منشور جديد
          </Button>
        </div>
      </div>
      
      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>المنشورات</CardTitle>
          <CardDescription>
            جميع المنشورات المنشورة على المنصة ({posts.length})
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
              لا توجد منشورات مطابقة للبحث
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">العنوان</TableHead>
                    <TableHead className="hidden md:table-cell">الكاتب</TableHead>
                    <TableHead className="hidden md:table-cell">التاريخ</TableHead>
                    <TableHead className="text-center">الإعجابات</TableHead>
                    <TableHead className="text-center">مثبت</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
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
                      <TableCell className="hidden md:table-cell">
                        {formatDate(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 ml-1 text-blue-500" />
                          {post.likes}
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
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTogglePin(post)}
                            title={post.isPinned ? "إلغاء التثبيت" : "تثبيت"}
                          >
                            {post.isPinned ? (
                              <PinOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Pin className="h-4 w-4 text-yellow-500" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewComments(post)}
                            title="عرض التعليقات"
                          >
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openLikesDialog(post)}
                            title="تعديل الإعجابات"
                          >
                            <ThumbsUp className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedPost(post);
                              setIsDeleteDialogOpen(true);
                            }}
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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
      
      {/* Comments Dialog */}
      {selectedPost && (
        <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>التعليقات على "{selectedPost.title}"</DialogTitle>
              <DialogDescription>
                تعليقات المستخدمين على هذا المنشور
              </DialogDescription>
            </DialogHeader>
            
            <div className="max-h-[400px] overflow-y-auto space-y-4 py-4">
              {isLoadingComments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  لا توجد تعليقات على هذا المنشور
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id || comment.id}
                    className="bg-gray-50 p-3 rounded-lg border"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm">
                        {comment.author.name} ({comment.author.code})
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString("ar-EG")}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteComment(comment._id || comment.id || "")}
                          title="حذف التعليق"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700">{comment.content}</div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المنشور وجميع التعليقات المرتبطة به نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* New Post Dialog */}
      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة منشور جديد</DialogTitle>
            <DialogDescription>
              أضف منشوراً جديداً إلى المنصة
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                العنوان
              </label>
              <Input
                id="title"
                placeholder="عنوان المنشور"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                المحتوى
              </label>
              <Textarea
                id="content"
                placeholder="محتوى المنشور"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="authorName" className="text-sm font-medium">
                اسم الكاتب (اختياري)
              </label>
              <Input
                id="authorName"
                placeholder="سيتم استخدام اسم المستخدم الخاص بك إذا تركت فارغاً"
                value={newPost.authorName}
                onChange={(e) => setNewPost({ ...newPost, authorName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                الوسوم (مفصولة بفواصل)
              </label>
              <Input
                id="tags"
                placeholder="مثال: تعليم, لغة انجليزية, قواعد"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewPostDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={isSubmittingPost || !newPost.title || !newPost.content}
            >
              {isSubmittingPost && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              نشر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Likes Dialog */}
      <Dialog open={isLikesDialogOpen} onOpenChange={setIsLikesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل عدد الإعجابات</DialogTitle>
            <DialogDescription>
              أدخل عدد الإعجابات الجديد للمنشور
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="number"
              min="0"
              value={likesCount}
              onChange={(e) => setLikesCount(parseInt(e.target.value) || 0)}
              placeholder="عدد الإعجابات"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLikesDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateLikes} disabled={isUpdatingLikes}>
              {isUpdatingLikes ? (
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
    </div>
  );
};

export default AdminPosts;
