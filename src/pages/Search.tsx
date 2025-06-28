
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, BookOpen, Book, FileText, MessageSquare, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample search data (in a real app, this would come from a database)
  const searchData = [
    {
      type: "vocabulary",
      title: "Mislead",
      content: "يضلل - to confuse or deceive someone",
      category: "كلمات",
      url: "/vocabulary",
      icon: BookOpen
    },
    {
      type: "grammar",
      title: "Present Perfect",
      content: "المضارع التام - has/have + past participle",
      category: "قواعد",
      url: "/grammar",
      icon: Book
    },
    {
      type: "story",
      title: "Chapter 1: The Beginning",
      content: "The story begins with a young Egyptian student...",
      category: "قصة",
      url: "/story",
      icon: FileText
    },
    {
      type: "paragraph",
      title: "Modern Education",
      content: "التعليم الحديث - paragraph about technology in education",
      category: "براجرافات",
      url: "/paragraphs",
      icon: MessageSquare
    },
    {
      type: "video",
      title: "أهم 50 كلمة في الوحدة الأولى",
      content: "شرح مفصل لأهم الكلمات مع الأمثلة والاستخدامات",
      category: "فيديوهات",
      url: "/videos",
      icon: Youtube
    }
  ];

  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.includes(searchTerm)
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vocabulary": return "border-green-400 bg-green-50";
      case "grammar": return "border-blue-400 bg-blue-50";
      case "story": return "border-purple-400 bg-purple-50";
      case "paragraph": return "border-orange-400 bg-orange-50";
      case "video": return "border-red-400 bg-red-50";
      default: return "border-gray-400 bg-gray-50";
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "vocabulary": return "bg-green-100 text-green-800";
      case "grammar": return "bg-blue-100 text-blue-800";
      case "story": return "bg-purple-100 text-purple-800";
      case "paragraph": return "bg-orange-100 text-orange-800";
      case "video": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-gray-600 hover:text-gray-700">
              <Button variant="outline">← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <SearchIcon className="w-8 h-8" />
                🎯 البحث السريع - Quick Search
              </h1>
              <p className="text-lg text-gray-600">ابحث عن أي كلمة أو قاعدة أو موضوع</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ابحث عن كلمة، قاعدة، موضوع، أو أي محتوى تعليمي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 text-lg h-14"
            />
          </div>
        </div>

        {/* Search Tips */}
        {!searchTerm && (
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-gradient-to-r from-blue-100 to-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800 text-center">
                  💡 نصائح البحث
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-700">🔍 يمكنك البحث عن:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>أي كلمة إنجليزية أو معناها</li>
                      <li>قواعد اللغة الإنجليزية</li>
                      <li>مواضيع من القصة</li>
                      <li>براجرافات محددة</li>
                      <li>فيديوهات تعليمية</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">⚡ أمثلة للبحث:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>"present perfect" للبحث عن قاعدة</li>
                      <li>"تضلل" للبحث عن كلمة بالعربية</li>
                      <li>"education" للبحث عن براجراف</li>
                      <li>"chapter 1" للبحث في القصة</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                نتائج البحث عن: "{searchTerm}"
              </h2>
              <p className="text-gray-600">
                تم العثور على {filteredResults.length} نتيجة
              </p>
            </div>

            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result, index) => {
                  const IconComponent = result.icon;
                  return (
                    <Card key={index} className={`hover:shadow-lg transition-shadow border-r-4 ${getTypeColor(result.type)}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6 text-gray-600" />
                            <div>
                              <CardTitle className="text-lg text-gray-800">
                                {result.title}
                              </CardTitle>
                              <Badge className={`text-xs mt-1 ${getCategoryColor(result.type)}`}>
                                {result.category}
                              </Badge>
                            </div>
                          </div>
                          <Link to={result.url}>
                            <Button variant="outline" size="sm">
                              اذهب للقسم
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {result.content}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    لم يتم العثور على نتائج
                  </h3>
                  <p className="text-gray-500 mb-4">
                    جرب البحث بكلمات أخرى أو تحقق من الإملاء
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                  >
                    مسح البحث
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Access */}
        {!searchTerm && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              🚀 الوصول السريع للأقسام
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/vocabulary">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-r-4 border-green-400">
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-700">المفردات</h4>
                    <p className="text-sm text-gray-600">200 كلمة مهمة</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/grammar">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-r-4 border-blue-400">
                  <CardContent className="p-4 text-center">
                    <Book className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-700">القواعد</h4>
                    <p className="text-sm text-gray-600">جميع القواعد مبسطة</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/story">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-r-4 border-purple-400">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-700">القصة</h4>
                    <p className="text-sm text-gray-600">ملخص وأسئلة</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/paragraphs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-r-4 border-orange-400">
                  <CardContent className="p-4 text-center">
                    <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-700">البراجرافات</h4>
                    <p className="text-sm text-gray-600">نماذج مع الترجمة</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/videos">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-r-4 border-red-400">
                  <CardContent className="p-4 text-center">
                    <Youtube className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-red-700">الفيديوهات</h4>
                    <p className="text-sm text-gray-600">شروحات مرئية</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
