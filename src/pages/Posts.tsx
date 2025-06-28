import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ThumbsUp,
  MessageSquare,
  Clock,
  Tags,
  PinIcon,
  Loader2,
  Send,
  User,
  Plus,
  Home,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface VisitorInfo {
  code: string;
  name: string;
}

const PostsPage = () => {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentAuthorName, setCommentAuthorName] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  
  // New post state
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthorName, setNewPostAuthorName] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  
  // Visitor info
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [isLoadingVisitorInfo, setIsLoadingVisitorInfo] = useState(true);

  const navigate = useNavigate();
  const isAuthenticated = apiClient.isAuthenticated();

  // Fetch visitor code on component mount
  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        const data = await apiClient.get('/visitor/code', { withAuth: false });
        setVisitorInfo(data);
        
        // Set author name from visitor info if available
        if (data.name) {
          setNewPostAuthorName(data.name);
          setCommentAuthorName(data.name);
        }
      } catch (error) {
        console.error("Error fetching visitor code:", error);
      } finally {
        setIsLoadingVisitorInfo(false);
      }
    };
    
    fetchVisitorInfo();
  }, []);

  // Save visitor name when changed
  useEffect(() => {
    const saveVisitorName = async () => {
      if (!visitorInfo || !newPostAuthorName || newPostAuthorName === visitorInfo.name) return;
      
      try {
        const data = await apiClient.post('/visitor/name', { name: newPostAuthorName }, { withAuth: false });
        setVisitorInfo(data);
      } catch (error) {
        console.error("Error saving visitor name:", error);
      }
    };
    
    // Debounce to avoid too many requests
    const timeoutId = setTimeout(saveVisitorName, 1000);
    return () => clearTimeout(timeoutId);
  }, [newPostAuthorName, visitorInfo]);

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

  // Handle like post
  const handleLike = async (post: Post) => {
    try {
      const postId = post._id || post.id;
      
      // Optimistic update
      setUserLikes(prev => ({ ...prev, [postId]: !prev[postId] }));
      
      // Update likes count optimistically
      setPosts(posts.map(p => {
        if ((p._id || p.id) === postId) {
          const liked = userLikes[postId];
          return {
            ...p,
            likes: liked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      }));
      
      // Use the new likePost method with error handling
      const response = await apiClient.likePost(postId);
      
      // Check if the request failed
      if (!response.success && response.error) {
        // Silently revert optimistic update on error
        setUserLikes(prev => ({ ...prev, [postId]: !prev[postId] }));
        
        // Revert likes count
        setPosts(posts.map(p => {
          if ((p._id || p.id) === postId) {
            const liked = !userLikes[postId]; // The previous state before the failed optimistic update
            return {
              ...p,
              likes: liked ? p.likes - 1 : p.likes + 1
            };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
      
      // Revert optimistic update on error - but don't crash the site
      const postId = post._id || post.id;
      setUserLikes(prev => ({ ...prev, [postId]: !prev[postId] }));
      
      // Revert likes count
      setPosts(posts.map(p => {
        if ((p._id || p.id) === postId) {
          const liked = !userLikes[postId]; // The previous state before the failed optimistic update
          return {
            ...p,
            likes: liked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      }));
      
      // Use toast with auto-dismiss instead of destructive variant
      toast({
        title: "تنبيه",
        description: "حدث خطأ أثناء الإعجاب بالمنشور",
        duration: 3000, // Auto dismiss after 3 seconds
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

  // Submit comment
  const handleSubmitComment = async () => {
    if (!selectedPost) return;
    
    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى كتابة تعليق"
      });
      return;
    }
    
    setIsSubmittingComment(true);
    
    try {
      const postId = selectedPost._id || selectedPost.id;
      const response = await apiClient.post(`/posts/${postId}/comments`, {
        content: newComment,
        authorName: commentAuthorName
      }, { withAuth: false });
      
      // Add new comment to comments list
      setComments([...comments, response]);
      
      // Reset form
      setNewComment("");
      
      toast({
        title: "تم إضافة التعليق",
        description: "تم إضافة تعليقك بنجاح"
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إضافة التعليق"
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle create post
  const handleCreatePost = async () => {
    // Validate inputs
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى ملء العنوان والمحتوى"
      });
      return;
    }

    setIsSubmittingPost(true);
    
    try {
      // Process tags
      const tags = newPostTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Create post
      const response = await apiClient.post('/posts', {
        title: newPostTitle,
        content: newPostContent,
        authorName: newPostAuthorName,
        tags
      }, { withAuth: false });
      
      // Add new post to posts list
      setPosts([response, ...posts]);
      
      // Reset form and close dialog
      setNewPostContent("");
      setNewPostTags("");
      setIsNewPostDialogOpen(false);
      
      toast({
        title: "تم إنشاء المنشور",
        description: "تم إنشاء منشورك بنجاح"
      });
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
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
            <ArrowLeft className="h-5 w-5 ml-1" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">منشورات وأخبار</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          آخر المنشورات والأخبار المتعلقة بدروس اللغة الإنجليزية والتحديثات المهمة
        </p>
        
        {/* Create Post Button */}
        <Button 
          className="mt-4"
          onClick={() => setIsNewPostDialogOpen(true)}
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة منشور جديد
        </Button>
        
        {/* Visitor Code Info */}
        {visitorInfo && (
          <div className="mt-2 text-sm text-gray-500">
            الكود الخاص بك: <span className="font-bold">{visitorInfo.code}</span>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="mr-3 text-lg">جاري تحميل المنشورات...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600">لا توجد منشورات حالياً</h3>
          <p className="mt-2 text-gray-500">تفقد الصفحة لاحقاً للاطلاع على آخر المنشورات</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <Card 
              key={post._id || post.id} 
              className={`overflow-hidden ${post.isPinned ? 'border-yellow-300 shadow-lg border-2' : ''}`}
            >
              {post.isPinned && (
                <div className="bg-yellow-100 text-yellow-800 py-1 px-3 flex items-center justify-center">
                  <PinIcon className="h-3 w-3 ml-1" />
                  <span className="text-sm font-medium">منشور مثبت</span>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </div>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <User className="h-3 w-3 ml-1" />
                  <span>{post.author.name}</span>
                  {post.author.code && (
                    <Badge variant="outline" className="mr-2 text-xs">
                      #{post.author.code}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {post.content}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center mt-4 flex-wrap gap-1">
                    <Tags className="h-3 w-3 text-gray-400 ml-1" />
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0 border-t mt-3 py-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 ml-1" />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center text-gray-500 hover:text-blue-600 ${userLikes[post._id || post.id as string] ? 'text-blue-600' : ''}`}
                    onClick={() => handleLike(post)}
                  >
                    <ThumbsUp className="h-4 w-4 ml-1" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-gray-500 hover:text-indigo-600"
                    onClick={() => handleViewComments(post)}
                  >
                    <MessageSquare className="h-4 w-4 ml-1" />
                    تعليق
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Comments Dialog */}
      {selectedPost && (
        <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPost.title}</DialogTitle>
              <DialogDescription>
                تعليقات وردود القراء
              </DialogDescription>
            </DialogHeader>
            
            {/* Full post content */}
            <div className="py-3">
              <p className="text-gray-700 whitespace-pre-line">{selectedPost.content}</p>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <User className="h-3 w-3 ml-1" />
                <span className="ml-1">{selectedPost.author.name}</span>
                {selectedPost.author.code && (
                  <span className="mr-2 text-xs border rounded-full px-2.5 py-0.5 border-gray-200">
                    #{selectedPost.author.code}
                  </span>
                )}
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 ml-1" />
                {formatDate(selectedPost.createdAt)}
              </div>
            </div>
            
            <Separator />
            
            {/* Comments section */}
            <div className="max-h-[300px] overflow-y-auto space-y-4 py-3">
              <h4 className="font-medium">التعليقات</h4>
              
              {isLoadingComments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  لا توجد تعليقات على هذا المنشور، كن أول من يعلق!
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id || comment.id}
                    className="bg-gray-50 p-3 rounded-lg border"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <span className="font-medium text-sm ml-1">
                          {comment.author.name}
                        </span>
                        {comment.author.code && (
                          <span className="text-xs border rounded-full px-2.5 py-0.5 border-gray-200">
                            #{comment.author.code}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700">{comment.content}</div>
                  </div>
                ))
              )}
            </div>
            
            {/* Add comment form */}
            <div className="space-y-3 pt-3 border-t">
              <h4 className="font-medium">إضافة تعليق</h4>
              
              <Textarea 
                placeholder="اكتب تعليقك هنا..." 
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              
              {!isAuthenticated && (
                <div className="space-y-1">
                  <label htmlFor="authorName" className="text-sm text-gray-500">
                    الاسم (اختياري)
                  </label>
                  <Input 
                    id="authorName"
                    placeholder="اسمك" 
                    value={commentAuthorName}
                    onChange={e => setCommentAuthorName(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCommentsOpen(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={handleSubmitComment}
                disabled={isSubmittingComment || !newComment.trim()}
              >
                {isSubmittingComment ? (
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 ml-2" />
                )}
                إرسال التعليق
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Create Post Dialog */}
      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء منشور جديد</DialogTitle>
            <DialogDescription>
              شارك أفكارك وأسئلتك مع المجتمع
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="postTitle" className="text-sm font-medium">
                عنوان المنشور
              </label>
              <Input 
                id="postTitle"
                placeholder="أدخل عنوان المنشور" 
                value={newPostTitle}
                onChange={e => setNewPostTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="postContent" className="text-sm font-medium">
                محتوى المنشور
              </label>
              <Textarea 
                id="postContent"
                placeholder="اكتب محتوى المنشور هنا..." 
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            
            {!isAuthenticated && (
              <div className="space-y-2">
                <label htmlFor="postAuthorName" className="text-sm font-medium">
                  اسمك
                </label>
                <Input 
                  id="postAuthorName"
                  placeholder="أدخل اسمك" 
                  value={newPostAuthorName}
                  onChange={e => setNewPostAuthorName(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  سيتم حفظ اسمك تلقائياً للمنشورات والتعليقات القادمة
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="postTags" className="text-sm font-medium">
                الوسوم (اختياري)
              </label>
              <Input 
                id="postTags"
                placeholder="أدخل الوسوم مفصولة بفواصل (مثال: قواعد, تمارين)" 
                value={newPostTags}
                onChange={e => setNewPostTags(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                أدخل الوسوم مفصولة بفواصل لتسهيل البحث عن المنشور
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPostDialogOpen(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleCreatePost}
              disabled={isSubmittingPost || !newPostTitle.trim() || !newPostContent.trim()}
            >
              {isSubmittingPost ? (
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 ml-2" />
              )}
              نشر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostsPage; 