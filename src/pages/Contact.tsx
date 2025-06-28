import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ThumbsUp, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { apiClient } from "@/lib/apiClient";

const Contact = () => {
  // القيمة الثابتة للإعجابات الافتراضية
  const DEFAULT_LIKES = 68;
  
  const [additionalLikes, setAdditionalLikes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  
  // حساب إجمالي الإعجابات = الافتراضي + الإضافي
  const totalLikes = DEFAULT_LIKES + additionalLikes;

  // تحميل حالة الإعجابات عند بدء التطبيق
  useEffect(() => {
    // التحقق من حالة تصويت المستخدم
    const userHasVoted = localStorage.getItem("hasVoted") === "true";
    setHasVoted(userHasVoted);
    
    // تحميل عدد الإعجابات الإضافية
    const fetchLikes = async () => {
      try {
        // استخدام localStorage كبديل مؤقت
        const savedAdditionalLikes = localStorage.getItem("websiteAdditionalLikes");
        if (savedAdditionalLikes) {
          setAdditionalLikes(parseInt(savedAdditionalLikes));
        }
      } catch (error) {
        console.error("Error fetching website likes:", error);
      }
    };
    
    fetchLikes();
  }, []);

  const handleLike = () => {
    // إذا كان المستخدم قد صوت بالفعل، نقوم بإزالة تصويته
    if (hasVoted) {
      // تقليل عدد الإعجابات الإضافية
      const newAdditionalLikes = additionalLikes - 1;
      setAdditionalLikes(newAdditionalLikes);
      
      // حفظ القيم في localStorage
      localStorage.setItem("websiteAdditionalLikes", newAdditionalLikes.toString());
      localStorage.setItem("hasVoted", "false");
      setHasVoted(false);
      
      toast({
        title: "تم إلغاء التقييم",
        description: "تم إلغاء تقييمك الإيجابي بنجاح",
      });
    } else {
      // زيادة عدد الإعجابات الإضافية
      const newAdditionalLikes = additionalLikes + 1;
      setAdditionalLikes(newAdditionalLikes);
      
      // حفظ القيم في localStorage
      localStorage.setItem("websiteAdditionalLikes", newAdditionalLikes.toString());
      localStorage.setItem("hasVoted", "true");
      setHasVoted(true);
      
      toast({
        title: "شكراً لك!",
        description: "تم تسجيل تقييمك الإيجابي بنجاح",
      });
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
                
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant={hasVoted ? "outline" : "default"}
                      className={`rounded-full h-16 w-16 ${hasVoted 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800' 
                        : 'bg-purple-600 hover:bg-purple-700'}`}
                      onClick={handleLike}
                    >
                      <ThumbsUp className={`h-8 w-8 ${!hasVoted ? 'animate-pulse' : ''}`} />
                    </Button>
                    <p className="mt-2 font-medium text-lg">{totalLikes}</p>
                    <p className="text-sm text-gray-500">إعجاب</p>
                  </div>
                </div>
                
                {hasVoted ? (
                  <div className="mt-4 text-center text-green-600 flex items-center justify-center">
                    <Check className="mr-2 h-4 w-4" /> تم تسجيل رأيك، اضغط مرة أخرى للإلغاء
                  </div>
                ) : (
                  <p className="mt-4 text-center text-sm text-gray-500">
                    اضغط على الزر لتقييم الموقع
                  </p>
                )}
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