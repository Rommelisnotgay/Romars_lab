
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProfileHeader from "@/components/ProfileHeader";
import Chapter1 from "@/components/story/Chapter1";
import Chapter2 from "@/components/story/Chapter2";
import Chapter3 from "@/components/story/Chapter3";
import Chapter4 from "@/components/story/Chapter4";
import Chapter5 from "@/components/story/Chapter5";
import Chapter6 from "@/components/story/Chapter6";

const Story = () => {
  const [openChapters, setOpenChapters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const storyChapters = [
    {
      id: "chapter1",
      title: "الفصل الأول: بيب وطفولته والمجرم الهارب",
      englishTitle: "Chapter 1: Pip's Early Life and the Convict",
      component: Chapter1,
      summary: "القصة بتبدأ مع بيب وهو طفل صغير راجع البيت بعد ما زار مقابر عيلته. في المقابر، بيب بيقابل مجرم هارب ويطلب منه مبرد ومأكولات. في يوم الكريسماس، بيب بياخد أكل ومبرد ويروح للمستنقعات عشان يساعد المجرم."
    },
    {
      id: "chapter2", 
      title: "الفصل الثاني: مس هافيشام وإستيلا",
      englishTitle: "Chapter 2: Miss Havisham and Estella",
      component: Chapter2,
      summary: "بيب بيروح بيت مس هافيشام ويقابل إستيلا، بنت صغيرة وجميلة بس متكبرة. مس هافيشام لابسة فستان زفاف أبيض قديم ومصفر. إستيلا بتعامل بيب بقسوة شديدة، وده بيخليه يحس بالخزي والعار من حياته البسيطة."
    },
    {
      id: "chapter3",
      title: "الفصل الثالث: المتبرع الغامض والآمال العظيمة", 
      englishTitle: "Chapter 3: The Mysterious Benefactor and Great Expectations",
      component: Chapter3,
      summary: "بيب بيتعلم إنه جاله متبرع غامض هيخليه جنتلمان مع آمال عظيمة. بيسافر لندن عشان يتعلم، معتقد إن مس هافيشام هي المتبرعة السرية بتاعته وإنه مقدر له يتجوز إستيلا."
    },
    {
      id: "chapter4",
      title: "الفصل الرابع: الحقيقة عن ماجوتش والكشوفات الصادمة",
      englishTitle: "Chapter 4: The Truth About Magwitch and Shocking Revelations", 
      component: Chapter4,
      summary: "بيب بيكتشف إن المتبرع بتاعه هو في الواقع ماجوتش، المجرم اللي ساعده وهو طفل. ماجوتش بيكشف ماضيه مع كومبزون، اللي خدع مس هافيشام وخان ماجوتش. بيب بيتعلم إن إستيلا هي في الواقع بنت ماجوتش."
    },
    {
      id: "chapter5",
      title: "الفصل الخامس: محاكمة بروفيس ومصير الشخصيات",
      englishTitle: "Chapter 5: Provis's Trial and Character Fates",
      component: Chapter5,
      summary: "بروفيس بيتقبض عليه ويتحاكم. كومبزون بيغرق في النهر. بروفيس بيتحكم عليه بالإعدام بس بيموت من مرضه. بيب بيمرض ويرعاه جو. بيب بيشتغل في الخارج ويرجع راجل ناضج."
    },
    {
      id: "chapter6",
      title: "الفصل السادس: النهاية والدروس المستفادة",
      englishTitle: "Chapter 6: The Ending and Lessons Learned",
      component: Chapter6,
      summary: "بيب بيتعلم دروس مهمة عن التواضع والحب الحقيقي. بيدرك إن الآمال العظيمة مش دايماً بتجيب السعادة. بيب وستيلا بيلاقوا السلام أخيراً بعد كل المعاناة."
    }
  ];

  const filteredChapters = storyChapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleChapter = (id: string) => {
    setOpenChapters(prev => 
      prev.includes(id) 
        ? prev.filter(chapterId => chapterId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-purple-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-purple-600 hover:text-purple-700 transition-colors">
              <Button variant="outline" className="shadow-md hover:shadow-lg">← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-3 mb-2">
                <FileText className="w-10 h-10" />
                📖 قسم القصة - Great Expectations
              </h1>
              <p className="text-lg text-gray-600 mb-4">قصة آمال عظيمة - منهج الصف الثالث الثانوي</p>
              <ProfileHeader />
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-white shadow-xl border-2 border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-violet-100">
              <CardTitle className="text-xl text-purple-800 text-center">
                🔍 البحث في القصة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث في الفصول أو الملخصات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right shadow-inner"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Story Overview */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100 shadow-xl border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-3xl text-purple-800 text-center mb-4">
                📚 قصة آمال عظيمة - Great Expectations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-center leading-relaxed mb-6 text-lg">
                تدور القصة حول بيب، الصبي اليتيم الذي يحلم بأن يصبح جنتلمان. قصة عن الطموح والحب والخيبة والتعلم من الأخطاء.
                من تأليف تشارلز ديكنز، واحدة من أعظم الروايات في الأدب الإنجليزي.
              </p>
              <div className="text-center space-x-4">
                <Badge variant="outline" className="mb-2 text-lg px-4 py-2">
                  6 فصول رئيسية
                </Badge>
                <Badge variant="outline" className="mb-2 text-lg px-4 py-2">
                  منهج الثانوية العامة
                </Badge>
                <Badge variant="outline" className="mb-2 text-lg px-4 py-2">
                  تشارلز ديكنز
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Story Chapters */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredChapters.map((chapter) => {
            const ChapterComponent = chapter.component;
            return (
              <div key={chapter.id}>
                <Collapsible
                  open={openChapters.includes(chapter.id)}
                  onOpenChange={() => toggleChapter(chapter.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-100">
                      <CardHeader className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <CardTitle className="text-xl text-purple-700 mb-2">
                              {chapter.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mb-2 font-medium">{chapter.englishTitle}</p>
                            <p className="text-gray-700 leading-relaxed">{chapter.summary}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-2xl">
                            {openChapters.includes(chapter.id) ? "−" : "+"}
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="mt-4">
                      <ChapterComponent />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>

        {/* Study Tips for Story */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-xl border-2 border-purple-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📚 نصائح لدراسة قصة آمال عظيمة بفعالية</h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h4 className="font-semibold mb-4 text-purple-700 text-lg">🎯 استراتيجية القراءة:</h4>
              <ul className="list-disc list-inside space-y-3 text-sm">
                <li>اقرأ كل فصل مرتين: مرة للفهم العام ومرة للتفاصيل</li>
                <li>احفظ الكلمات المهمة قبل قراءة الفصل</li>
                <li>ركز على تطور شخصية بيب عبر الفصول</li>
                <li>اربط أحداث القصة ببعضها البعض</li>
                <li>لاحظ العلاقات بين الشخصيات المختلفة</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-700 text-lg">💡 تقنيات الحفظ:</h4>
              <ul className="list-disc list-inside space-y-3 text-sm">
                <li>تخيل الأحداث والشخصيات بصرياً</li>
                <li>اكتب الأسئلة المتوقعة وإجاباتها بانتظام</li>
                <li>ناقش القصة مع زملائك في الدراسة</li>
                <li>راجع ملخص كل فصل يومياً</li>
                <li>اربط أحداث القصة بالمواضيع الاجتماعية</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <h4 className="font-semibold text-orange-700 mb-4 text-lg">⚠️ نقاط مهمة للامتحان:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>تذكر الأسماء الصحيحة للشخصيات: Pip, Estella, Miss Havisham, Magwitch, Compeyson, Orlick</li>
              <li>احفظ الكلمات المهمة مع معانيها بالعربية</li>
              <li>افهم العلاقة بين ماغويتش وكومبزون ومس هافيشام</li>
              <li>اعرف تطور شخصية بيب من البداية للنهاية</li>
              <li>فهم دوافع كل شخصية وأهدافها</li>
              <li>اربط الأحداث بالموضوعات الرئيسية للقصة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
