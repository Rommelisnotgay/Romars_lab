import { Link } from "react-router-dom";
import { BookOpen, FileText, MessageSquare, Video, Search, Users, ArrowRight, Star, Calendar, BookCheck, Sparkles, Play, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import ProfileHeader from "@/components/ProfileHeader";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "المفردات",
      titleEn: "Vocabulary", 
      description: "تعلم أهم الكلمات والمفردات مع الترجمة والأمثلة",
      link: "/vocabulary",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "القواعد",
      titleEn: "Grammar",
      description: "شرح مفصل لجميع قواعد اللغة الإنجليزية",
      link: "/grammar", 
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "القصة",
      titleEn: "Story",
      description: "قصة آمال عظيمة - Great Expectations بالتفصيل",
      link: "/story",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "البراجرافات",
      titleEn: "Paragraphs",
      description: "نماذج مقالات ومواضيع التعبير المطلوبة",
      link: "/paragraphs",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "الفيديوهات",
      titleEn: "Videos", 
      description: "شروحات مرئية تفاعلية لجميع المواضيع",
      link: "/videos",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "البحث",
      titleEn: "Search",
      description: "ابحث في جميع المحتويات بسهولة وسرعة",
      link: "/search",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir="rtl">
      {/* Hero Section - تم تعديله للصورة واسم الموقع في الأعلى */}
      <section className="relative bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <ProfileHeader />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-shadow mt-6 px-2 sm:px-0">
            روميل هيلحقك في الانجليزيه الصف الثالث ثانوي
              <br className="hidden sm:block" />
               
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl mx-auto px-2">
              منصتك الشاملة لتعلم اللغة الإنجليزية للصف الثالث الثانوي بطريقة مبسطة ومنظمة
            </p>
          </div>

          {/* الأزرار الرئيسية */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 px-4">
            <Button 
              size="lg" 
              className="bg-purple-900 hover:bg-purple-800 text-white btn-glow shadow-lg text-lg px-8 py-6 w-full sm:w-auto"
              onClick={scrollToFeatures}
            >
              ابدأ التعلم الآن
            </Button>
            <Button asChild size="lg" className="bg-purple-900 hover:bg-purple-800 text-white btn-glow shadow-lg text-lg px-8 py-6 w-full sm:w-auto">
              <Link to="/videos" className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" fill="white" />
                <span>شاهد الفيديو</span>
              </Link>
            </Button>
          </div>

          {/* ميزات المنهج - تم تحسين التناسق */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto px-2">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300 border border-white/20 flex flex-col text-center shadow-lg">
              <div className="mx-auto bg-white/25 rounded-full p-3 mb-3 text-white">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">منهج كامل</h3>
              <p className="text-white/90 text-sm">شرح شامل لكل كلمات وقواعد المنهج</p>
              <div className="flex-grow"></div>
              <div className="mt-3 flex justify-center">
                <CheckCircle className="w-5 h-5 text-white/80" />
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300 border border-white/20 flex flex-col text-center shadow-lg">
              <div className="mx-auto bg-white/25 rounded-full p-3 mb-3 text-white">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">أسئلة متوقعة</h3>
              <p className="text-white/90 text-sm">مجموعة متميزة من نماذج الامتحانات</p>
              <div className="flex-grow"></div>
              <div className="mt-3 flex justify-center">
                <CheckCircle className="w-5 h-5 text-white/80" />
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300 border border-white/20 flex flex-col text-center shadow-lg">
              <div className="mx-auto bg-white/25 rounded-full p-3 mb-3 text-white">
                <BookCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">شرح مبسط</h3>
              <p className="text-white/90 text-sm">طريقة شرح سهلة مناسبة لجميع المستويات</p>
              <div className="flex-grow"></div>
              <div className="mt-3 flex justify-center">
                <CheckCircle className="w-5 h-5 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 -mt-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              استعد لامتحان الإنجليزية
            </h2>
            <Sparkles className="w-6 h-6 text-purple-500 ml-2" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            منصة تعليمية شاملة تساعدك على تعلم كل مكونات منهج اللغة الإنجليزية للثانوية العامة بأسلوب سهل وممتع
          </p>
        </div>

        <div id="features-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="group">
              <Card className="h-full card-hover border-2 border-transparent hover:border-purple-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 text-2xl text-gray-800 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <div className="text-sm text-gray-500 font-medium">
                    {feature.titleEn}
                  </div>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center justify-center text-sm font-medium text-purple-600 group-hover:text-indigo-500 transition-colors">
                    <span>استكشف المزيد</span>
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* شاهد الفيديو CTA */}
        <div className="text-center mt-16 mb-10">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-2xl sm:text-3xl text-shadow">
                <Play className="inline-block w-8 h-8 mr-2" fill="white" /> فيديوهات الشرح المميزة
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                شاهد شرح منهج الإنجليزية كاملاً بطريقة مبسطة مع نماذج امتحانات وتدريبات شاملة
              </p>
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-lg px-8 py-6 text-lg">
                <Link to="/videos" className="flex items-center gap-2">
                  <Play className="w-6 h-6" fill="currentColor" />
                  شاهد الفيديوهات الآن
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* منشورات الطلاب */}
        <div className="text-center mt-16 mb-10">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-2xl sm:text-3xl text-shadow">
                <MessageCircle className="inline-block w-8 h-8 mr-2" /> منشورات الطلاب والأسئلة
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                شارك أسئلتك وتعليقاتك وتفاعل مع زملائك في منتدى النقاش الخاص بالمنصة
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8 py-6 text-lg">
                <Link to="/posts" className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" fill="currentColor" />
                  تصفح المنشورات
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* تواصل معنا */}
        <div className="text-center mt-16 mb-10">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-2xl sm:text-3xl text-shadow">
                <Phone className="inline-block w-8 h-8 mr-2" /> تواصل معنا وشاركنا رأيك
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                نرحب بملاحظاتك واقتراحاتك لتحسين الموقع، يمكنك التواصل معنا عبر واتساب أو ترك رسالة
              </p>
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg px-8 py-6 text-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  تواصل معنا الآن
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800">روميل هيلحقك</h3>
              <p className="text-gray-600">منصة تعليمية للصف الثالث الثانوي</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/contact">تواصل معنا</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.facebook.com/rommel.tarek.9/?locale=ar_AR" target="_blank" rel="noopener noreferrer">
                  صفحة الفيسبوك
                </a>
              </Button>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-500 text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} روميل هيلحقك
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
