import { useState } from "react";
import { Link } from "react-router-dom";
import { Youtube, Search, BookOpen, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const videoCategories = [
    {
      id: "story",
      title: "شرح القصة",
      icon: "📖",
      videos: [
        {
          title: "القصة كاملة - Great Expectations",
          description: "شرح تفصيلي لقصة الآمال العظيمة كاملة",
          duration: "ساعتين وربع",
          url: "https://www.youtube.com/watch?v=Om6HdIg3RZM",
          level: "جميع المستويات",
          thumbnail: "https://i.ytimg.com/vi/Om6HdIg3RZM/hqdefault.jpg",
          videoId: "Om6HdIg3RZM"
        }
      ]
    },
    {
      id: "vocabulary",
      title: "شرح الكلمات",
      icon: "📘",
      videos: [
        {
          title: "أهم كلمات المنهج للثانوية العامة",
          description: "شرح مفصل لأهم الكلمات مع الأمثلة والاستخدامات",
          duration: "ساعه ونص",
          url: "https://www.youtube.com/watch?v=WHcxqA33QoY",
          level: "أساسي",
          thumbnail: "https://i.ytimg.com/vi/WHcxqA33QoY/hqdefault.jpg",
          videoId: "WHcxqA33QoY"
        }
      ]
    },
    {
      id: "grammar",
      title: "شرح القواعد",
      icon: "🧠",
      videos: [
        {
          title: "منهج الجرامر كاملاً - شرح وحل",
          description: "شرح تفصيلي لجميع قواعد منهج الثانوية العامة",
          duration: "ساعتين وخمسه",
          url: "https://www.youtube.com/watch?v=aHRTJ8aqbPc",
          level: "جميع المستويات",
          thumbnail: "https://i.ytimg.com/vi/aHRTJ8aqbPc/hqdefault.jpg",
          videoId: "aHRTJ8aqbPc"
        }
      ]
    },
    {
      id: "full-course",
      title: "المنهج الكامل",
      icon: "📚",
      videos: [
        {
          title: "منهج اللغة الإنجليزية كاملاً",
          description: "شرح كامل لمنهج الثانوية العامة من الألف إلى الياء",
          duration: "ثلاث ساعات وعشره",
          url: "https://www.youtube.com/watch?v=-8UITamGhTQ",
          level: "جميع المستويات",
          thumbnail: "https://i.ytimg.com/vi/-8UITamGhTQ/hqdefault.jpg",
          videoId: "-8UITamGhTQ"
        },
        {
          title: "شرح وحل كلمات وقواعد المنهج",
          description: "مذاكرة شاملة للكلمات والقواعد مع حل نماذج امتحانات",
          duration: "ثلاث ساعات الا ربع",
          url: "https://www.youtube.com/watch?v=qW3wTpZ0tM0",
          level: "متقدم",
          thumbnail: "https://i.ytimg.com/vi/qW3wTpZ0tM0/hqdefault.jpg",
          videoId: "qW3wTpZ0tM0"
        }
      ]
    }
  ];

  const filteredVideos = videoCategories.map(category => ({
    ...category,
    videos: category.videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.includes(searchTerm)
    )
  })).filter(category => category.videos.length > 0);

  const allVideos = videoCategories.flatMap(category => 
    category.videos.map(video => ({ ...video, category: category.title }))
  ).filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-red-600 hover:text-red-700">
              <Button variant="outline" size={isMobile ? "sm" : "default"}>← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-red-800 flex items-center justify-center gap-2">
                <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
                🔗 قسم الفيديوهات - Videos
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">فيديوهات شرح منهج الصف الثالث الثانوي</p>
            </div>
            <div className="w-20 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن فيديو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Video Categories */}
        <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} mb-6 sm:mb-8`}>
            <TabsTrigger value="all">جميع الفيديوهات</TabsTrigger>
            {videoCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.icon} {isMobile ? '' : category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {allVideos.map((video, index) => (
                <VideoCard key={index} video={video} showCategory={true} />
              ))}
            </div>
          </TabsContent>

          {videoCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {category.videos.map((video, index) => (
                  <VideoCard key={index} video={video} showCategory={false} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Study Tips */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-md">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📺 نصائح للاستفادة من الفيديوهات التعليمية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-red-700">🎯 أثناء المشاهدة:</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>اجلس في مكان هادئ ومريح</li>
                <li>احضر ورقة وقلم لتدوين النقاط المهمة</li>
                <li>توقف وأعد المشاهدة عند الحاجة</li>
                <li>طبق ما تتعلمه فوراً</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-blue-700">📝 بعد المشاهدة:</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>لخص أهم النقاط بكلماتك</li>
                <li>طبق التمارين المقترحة</li>
                <li>شارك ما تعلمته مع زملائك</li>
                <li>راجع الفيديو مرة أخرى بعد أسبوع</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: any;
  showCategory?: boolean;
}

const VideoCard = ({ video, showCategory = false }: VideoCardProps) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  
  const handleWatchVideo = () => {
    window.open(video.url, '_blank');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "أساسي": return "bg-green-100 text-green-700";
      case "متوسط": return "bg-blue-100 text-blue-700";
      case "متقدم": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getThumbnailUrl = () => {
    if (video.videoId) {
      return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
    }
    return video.thumbnail || "https://via.placeholder.com/480x360?text=فيديو+تعليمي";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-sm text-gray-600">لا يمكن تحميل الصورة</p>
          </div>
        ) : (
          <img 
            src={getThumbnailUrl()}
            alt={video.title}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <Badge variant="outline" className="m-3 bg-red-600 text-white border-none">
            <Youtube className="w-3 h-3 mr-1" /> {video.duration}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        {showCategory && (
          <Badge className="w-fit mb-1" variant="secondary">
            {video.category}
          </Badge>
        )}
        <CardTitle className="text-lg sm:text-xl">{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs sm:text-sm text-gray-600">{video.description}</p>
        <div className="flex justify-between items-center">
          <Badge className={`${getLevelColor(video.level)}`}>
            {video.level}
          </Badge>
          <Button 
            onClick={handleWatchVideo} 
            size={isMobile ? "sm" : "default"}
            className="bg-red-600 hover:bg-red-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" /> مشاهدة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Videos;
