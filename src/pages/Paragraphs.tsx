
import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Paragraphs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openParagraphs, setOpenParagraphs] = useState<string[]>([]);

  const paragraphs = [
    {
      id: "education",
      title: "التعليم الحديث (Modern Education)",
      category: "التعليم",
      englishText: "Modern education has revolutionized the way students learn and acquire knowledge. Technology plays a crucial role in enhancing the educational experience through interactive learning platforms, virtual classrooms, and digital resources. Students now have access to vast amounts of information at their fingertips, allowing them to explore subjects in greater depth. However, traditional teaching methods still hold value, and the best approach combines both modern technology and conventional pedagogical techniques. Teachers must adapt to these changes while maintaining the personal connection that is essential for effective learning.",
      arabicTranslation: "لقد ثورة التعليم الحديث الطريقة التي يتعلم بها الطلاب ويكتسبون المعرفة. تلعب التكنولوجيا دوراً حاسماً في تعزيز التجربة التعليمية من خلال منصات التعلم التفاعلية والفصول الافتراضية والموارد الرقمية. أصبح لدى الطلاب الآن إمكانية الوصول إلى كميات هائلة من المعلومات في متناول أيديهم، مما يسمح لهم باستكشاف المواضيع بعمق أكبر. ومع ذلك، لا تزال طرق التدريس التقليدية تحتفظ بقيمتها، وأفضل نهج يجمع بين التكنولوجيا الحديثة والتقنيات التربوية التقليدية. يجب على المعلمين التكيف مع هذه التغييرات مع الحفاظ على الاتصال الشخصي الضروري للتعلم الفعال.",
      structure: {
        introduction: "Modern education has revolutionized...",
        body: "Technology plays a crucial role... However, traditional teaching methods...",
        conclusion: "Teachers must adapt to these changes..."
      },
      usefulExpressions: [
        "has revolutionized",
        "plays a crucial role",
        "at their fingertips", 
        "in greater depth",
        "hold value",
        "the best approach"
      ]
    },
    {
      id: "technology",
      title: "التكنولوجيا في حياتنا (Technology in Our Lives)",
      category: "التكنولوجيا",
      englishText: "Technology has become an integral part of our daily lives, transforming the way we communicate, work, and entertain ourselves. Smartphones, computers, and the internet have made information more accessible than ever before. Social media platforms connect people across the globe, breaking down geographical barriers and fostering international relationships. In the workplace, automation and artificial intelligence are increasing efficiency and productivity. However, we must be mindful of the potential negative effects, such as reduced face-to-face interaction and privacy concerns. The key is to use technology wisely and maintain a healthy balance between digital and real-world experiences.",
      arabicTranslation: "أصبحت التكنولوجيا جزءاً لا يتجزأ من حياتنا اليومية، وحولت الطريقة التي نتواصل بها ونعمل ونسلي أنفسنا. جعلت الهواتف الذكية وأجهزة الكمبيوتر والإنترنت المعلومات أكثر إمكانية للوصول من أي وقت مضى. تربط منصات وسائل التواصل الاجتماعي الأشخاص عبر العالم، وتكسر الحواجز الجغرافية وتعزز العلاقات الدولية. في مكان العمل، تزيد الأتمتة والذكاء الاصطناعي من الكفاءة والإنتاجية. ومع ذلك، يجب أن نكون مدركين للتأثيرات السلبية المحتملة، مثل انخفاض التفاعل وجهاً لوجه ومخاوف الخصوصية. المفتاح هو استخدام التكنولوجيا بحكمة والحفاظ على توازن صحي بين التجارب الرقمية والعالم الحقيقي.",
      structure: {
        introduction: "Technology has become an integral part...",
        body: "Smartphones, computers... However, we must be mindful...",
        conclusion: "The key is to use technology wisely..."
      },
      usefulExpressions: [
        "has become an integral part",
        "more accessible than ever",
        "breaking down barriers",
        "fostering relationships",
        "be mindful of",
        "maintain a healthy balance"
      ]
    },
    {
      id: "environment",
      title: "حماية البيئة (Environmental Protection)",
      category: "البيئة",
      englishText: "Environmental protection is one of the most pressing issues of our time. Climate change, pollution, and deforestation threaten the delicate balance of our ecosystem. Every individual has a responsibility to contribute to environmental conservation through simple daily actions. Recycling, reducing energy consumption, and using public transportation are practical steps we can all take. Governments and corporations must also play their part by implementing stricter environmental regulations and investing in renewable energy sources. Education and awareness campaigns are essential to help people understand the importance of preserving our planet for future generations. The time to act is now, before irreversible damage occurs.",
      arabicTranslation: "حماية البيئة هي واحدة من أكثر القضايا إلحاحاً في عصرنا. يهدد تغير المناخ والتلوث وإزالة الغابات التوازن الدقيق لنظامنا البيئي. كل فرد عليه مسؤولية المساهمة في المحافظة على البيئة من خلال إجراءات يومية بسيطة. إعادة التدوير وتقليل استهلاك الطاقة واستخدام وسائل النقل العام هي خطوات عملية يمكننا جميعاً اتخاذها. يجب على الحكومات والشركات أيضاً أن تلعب دورها من خلال تطبيق لوائح بيئية أكثر صرامة والاستثمار في مصادر الطاقة المتجددة. التعليم وحملات التوعية ضرورية لمساعدة الناس على فهم أهمية الحفاظ على كوكبنا للأجيال القادمة. الوقت للعمل هو الآن، قبل حدوث أضرار لا يمكن إصلاحها.",
      structure: {
        introduction: "Environmental protection is one of the most pressing issues...",
        body: "Climate change, pollution... Every individual has a responsibility...",
        conclusion: "The time to act is now..."
      },
      usefulExpressions: [
        "pressing issues",
        "delicate balance",
        "has a responsibility",
        "practical steps",
        "play their part",
        "irreversible damage"
      ]
    },
    {
      id: "sports",
      title: "أهمية الرياضة (The Importance of Sports)",
      category: "الرياضة",
      englishText: "Sports play a vital role in maintaining physical and mental health. Regular physical activity strengthens the body, improves cardiovascular health, and helps prevent various diseases. Beyond physical benefits, sports also contribute significantly to mental well-being by reducing stress, improving mood, and boosting self-confidence. Team sports, in particular, teach valuable life skills such as cooperation, leadership, and perseverance. They bring people together regardless of their backgrounds, promoting unity and understanding. In schools, sports programs help students develop discipline and time management skills while providing a healthy outlet for energy. Governments should invest more in sports facilities and programs to encourage citizens of all ages to lead active lifestyles.",
      arabicTranslation: "تلعب الرياضة دوراً حيوياً في الحفاظ على الصحة الجسدية والعقلية. النشاط البدني المنتظم يقوي الجسم ويحسن صحة القلب والأوعية الدموية ويساعد في الوقاية من أمراض مختلفة. وراء الفوائد الجسدية، تساهم الرياضة أيضاً بشكل كبير في الرفاهية النفسية من خلال تقليل التوتر وتحسين المزاج وتعزيز الثقة بالنفس. الرياضات الجماعية، على وجه الخصوص، تعلم مهارات حياتية قيمة مثل التعاون والقيادة والمثابرة. تجمع الناس معاً بغض النظر عن خلفياتهم، وتعزز الوحدة والتفاهم. في المدارس، تساعد برامج الرياضة الطلاب على تطوير الانضباط ومهارات إدارة الوقت بينما توفر منفذاً صحياً للطاقة. يجب على الحكومات الاستثمار أكثر في المرافق والبرامج الرياضية لتشجيع المواطنين من جميع الأعمار على اتباع أنماط حياة نشطة.",
      structure: {
        introduction: "Sports play a vital role in maintaining...",
        body: "Regular physical activity... Beyond physical benefits... Team sports...",
        conclusion: "Governments should invest more..."
      },
      usefulExpressions: [
        "play a vital role",
        "contribute significantly",
        "valuable life skills",
        "regardless of their backgrounds",
        "promoting unity",
        "healthy outlet"
      ]
    }
  ];

  const toggleParagraph = (id: string) => {
    setOpenParagraphs(prev => 
      prev.includes(id) 
        ? prev.filter(paragraphId => paragraphId !== id)
        : [...prev, id]
    );
  };

  const filteredParagraphs = paragraphs.filter(paragraph =>
    paragraph.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paragraph.category.includes(searchTerm) ||
    paragraph.englishText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-orange-600 hover:text-orange-700">
              <Button variant="outline">← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-orange-800 flex items-center justify-center gap-2">
                <MessageSquare className="w-8 h-8" />
                ✍️ قسم البراجرافات - Paragraphs
              </h1>
              <p className="text-lg text-gray-600">نماذج براجرافات متوقعة مع الترجمة والتحليل</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن موضوع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Paragraphs */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredParagraphs.map((paragraph) => (
            <Card key={paragraph.id} className="hover:shadow-lg transition-shadow">
              <Collapsible
                open={openParagraphs.includes(paragraph.id)}
                onOpenChange={() => toggleParagraph(paragraph.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl text-orange-700 mb-2">
                          {paragraph.title}
                        </CardTitle>
                        <Badge variant="outline" className="mb-2">
                          {paragraph.category}
                        </Badge>
                        <p className="text-gray-600 text-sm">
                          اضغط لعرض البراجراف كاملاً مع التحليل
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        {openParagraphs.includes(paragraph.id) ? "−" : "+"}
                      </Button>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      {/* English Paragraph */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">🇬🇧 البراجراف بالإنجليزية:</h4>
                        <p className="text-gray-800 leading-relaxed text-justify">
                          {paragraph.englishText}
                        </p>
                      </div>

                      {/* Arabic Translation */}
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-3">🇪🇬 الترجمة العربية:</h4>
                        <p className="text-gray-800 leading-relaxed text-justify">
                          {paragraph.arabicTranslation}
                        </p>
                      </div>

                      {/* Structure Analysis */}
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-3">🏗️ هيكل البراجراف (Structure):</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="font-semibold text-purple-700">المقدمة: </span>
                            <span className="text-gray-700">{paragraph.structure.introduction}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-purple-700">الموضوع: </span>
                            <span className="text-gray-700">{paragraph.structure.body}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-purple-700">الخاتمة: </span>
                            <span className="text-gray-700">{paragraph.structure.conclusion}</span>
                          </div>
                        </div>
                      </div>

                      {/* Useful Expressions */}
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-3">✨ تعبيرات مفيدة (Useful Expressions):</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {paragraph.usefulExpressions.map((expression, i) => (
                            <div key={i} className="bg-white p-2 rounded border-r-4 border-yellow-400">
                              <span className="font-medium text-yellow-700">{expression}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Writing Tips */}
        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📝 نصائح كتابة البراجراف المثالي</h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold mb-3 text-orange-700">🎯 الهيكل الصحيح:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>جملة افتتاحية قوية</li>
                <li>3-4 جمل في الموضوع</li>
                <li>جملة ختامية تلخص الفكرة</li>
                <li>استخدم روابط منطقية</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-700">📚 المحتوى:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>فكرة واحدة واضحة لكل براجراف</li>
                <li>أمثلة وتفاصيل داعمة</li>
                <li>تجنب التكرار</li>
                <li>استخدم مفردات متنوعة</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-700">✍️ الأسلوب:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>استخدم الزمن المناسب</li>
                <li>تنوع في طول الجمل</li>
                <li>اهتم بعلامات الترقيم</li>
                <li>راجع الإملاء والقواعد</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paragraphs;
