import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ThumbsUp, ArrowLeft, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { apiClient } from "@/lib/apiClient";

const Contact = () => {
  // State for likes
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorCode, setVisitorCode] = useState<string | null>(null);
  const [isServerConnected, setIsServerConnected] = useState<boolean | null>(null);
  
  // تحميل معلومات الزائر ووضع الإعجاب
  useEffect(() => {
    const loadData = async () => {
      try {
        // التحقق من صحة الاتصال بالخادم
        const isHealthy = await apiClient.checkHealth();
        setIsServerConnected(isHealthy);
        
        if (isHealthy) {
          console.log("Server connection is healthy");
        } else {
          console.log("Server connection is not available");
          toast({
            variant: "destructive",
            title: "تعذر الاتصال بالخادم",
            description: "سيتم استخدام البيانات المحلية",
          });
        }
      } catch (error) {
        console.error("Error checking server health:", error);
        setIsServerConnected(false);
      }
      
      // جلب معلومات الزائر
      getVisitorInfo();
      
      // جلب معلومات الإعجابات
      fetchLikes();
    };
    
    loadData();
  }, []);
  
  // الحصول على معلومات الزائر
  const getVisitorInfo = async () => {
    try {
      // محاولة الحصول على البيانات من API
      if (isServerConnected !== false) {
        // استخدام الـ API client للحصول على معلومات الزائر
        const visitorData = await apiClient.get('/visitor/code', { withAuth: false, noThrow: true });
        
        if (!visitorData.error) {
          setVisitorCode(visitorData.code);
          // حفظ الرمز محليًا كنسخة احتياطية
          localStorage.setItem("visitor_code", visitorData.code);
        } else {
          throw new Error("Failed to get visitor code");
        }
      } else {
        throw new Error("Server connection unavailable");
      }
    } catch (error) {
      console.error("Error fetching visitor info:", error);
      // الرجوع للتخزين المحلي كبديل
      const storedCode = localStorage.getItem("visitor_code");
      if (storedCode) {
        setVisitorCode(storedCode);
      } else {
        // توليد كود عشوائي محليًا إذا لم يكن هناك كود مخزن
        const randomCode = Math.random().toString(36).substring(2, 10);
        localStorage.setItem("visitor_code", randomCode);
        setVisitorCode(randomCode);
      }
    }
  };
  
  // Fetch like count and user's like status from API
  const fetchLikes = async () => {
    try {
      // استخدام apiClient لجلب معلومات الإعجابات
      const data = await apiClient.getWebsiteLikes();
      
      // تحديث الحالة بناءً على البيانات المستلمة
      setLikesCount(data.count);
      setHasLiked(data.hasLiked);
      
      console.log("Likes data:", data);
      
      // إذا كانت البيانات من التخزين المحلي، عرض رسالة توضيحية
      if (data.local) {
        console.log("Using local likes data");
      }
    } catch (error) {
      console.error("Error fetching website likes:", error);
      
      // الرجوع للبيانات المحلية في حالة الخطأ
      const savedLikesCount = localStorage.getItem("websiteAdditionalLikes");
      if (savedLikesCount) {
        setLikesCount(68 + parseInt(savedLikesCount));
      } else {
        setLikesCount(68); // العدد الافتراضي
      }
      
      // التحقق من حالة الإعجاب المحلية
      setHasLiked(localStorage.getItem("hasVoted") === "true");
    }
  };

  // Toggle like
  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // استخدام apiClient لإرسال/إلغاء الإعجاب
      const data = await apiClient.toggleWebsiteLike();
      
      // تحديث الحالة بناءً على البيانات المستلمة
      setLikesCount(data.count);
      setHasLiked(data.hasLiked);
      
      // عرض رسالة توضيحية للمستخدم
      toast({
        title: data.hasLiked ? "شكراً لك!" : "تم إلغاء التقييم",
        description: data.hasLiked 
          ? "تم تسجيل تقييمك الإيجابي بنجاح" 
          : "تم إلغاء تقييمك الإيجابي بنجاح",
        variant: "default" // استخدام الوضع الافتراضي فقط بدلاً من الاختيار بناءً على مصدر البيانات
      });
      
      if (data.local) {
        console.log("Like toggled locally");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      
      toast({
        variant: "destructive",
        title: "تعذر الاتصال بالخادم",
        description: "تم حفظ تقييمك محليًا",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12" dir="rtl">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> العودة للرئيسية
            </Button>
          </Link>
          <h1 className="text-3xl font-bold gradient-text">تواصل معنا</h1>
          <div className="w-28"></div>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Contact Information */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">معلومات الاتصال</CardTitle>
              <CardDescription className="text-center">يمكنك التواصل معنا عبر واتساب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-indigo-700">واتساب</h3>
                  <p className="text-gray-600 text-lg">+201060496849</p>
                </div>
                <a 
                  href="https://wa.me/201060496849" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-glow"
                >
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Phone className="mr-2 h-4 w-4" /> تواصل الآن
                  </Button>
                </a>
              </div>

              {/* Website Rating */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 text-center text-indigo-700">ما رأيك في الموقع؟</h3>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="text-purple-700 font-semibold">{likesCount} مستخدم أعجبهم الموقع</span>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant={hasLiked ? "outline" : "default"}
                      className={`rounded-full h-16 w-16 ${hasLiked 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800' 
                        : 'bg-purple-600 hover:bg-purple-700'}`}
                      onClick={handleLike}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <ThumbsUp className={`h-8 w-8 ${!hasLiked ? 'animate-pulse' : ''}`} />
                      )}
                    </Button>
                    
                    {hasLiked ? (
                      <div className="mt-3 text-green-600 flex items-center justify-center">
                        <Check className="mr-1 h-4 w-4" /> تم تسجيل إعجابك
                      </div>
                    ) : (
                      <div className="mt-3 text-gray-500 text-sm">
                        اضغط لتسجيل إعجابك
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                  {visitorCode && (
                    <p>رمز المستخدم الخاص بك: {visitorCode}</p>
                  )}
                  {isServerConnected === false && (
                    <p className="text-amber-500 mt-1">الخادم غير متاح حالياً، يتم استخدام البيانات المحلية</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4 gradient-text">تابعنا على وسائل التواصل الاجتماعي</h2>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.facebook.com/rommel.tarek.9/?locale=ar_AR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 