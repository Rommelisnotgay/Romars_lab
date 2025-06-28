
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter1 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل الأول: بيب وطفولته والمجرم الهارب
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 1: Pip's Early Life and the Convict
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chapter Summary */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">📝 ملخص الفصل:</h4>
          <div className="bg-purple-50 p-4 rounded-lg space-y-3">
            <div>
              <p className="font-medium text-gray-800 mb-2">🇪🇬 الملخص بالعربية:</p>
              <p className="text-gray-700 leading-relaxed">
                القصة بتبدأ مع بيب وهو طفل صغير راجع البيت بعد ما زار مقابر عيلته. أخته مس جو بتزعق لبيب وبتلومه إنه كان في المقابر. جو، جوز أخت بيب، راجل طيب جداً. في يوم من الأيام، بيب بيسمع عن مساجين هربوا من "سفن السجن". في المقابر، بيب بيقابل مجرم هارب ويطلب منه مبرد من ورشة جو عشان يفك أصفاد رجليه. في يوم الكريسماس، بيب بياخد أكل ومبرد ويروح للمستنقعات عشان يساعد المجرم. الجنود بيوصلوا البيت بحثاً عن المساجين، وبيلاقوهم بيتخانقوا في المستنقعات. المجرم بيعترف إنه سرق الأكل من بيت جو، وجو بيسامحه بطيبة قلبه.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                The story begins with Pip, an orphan living with his harsh sister Mrs. Joe and her kind husband Joe Gargery, a blacksmith. In a graveyard, Pip encounters an escaped convict who threatens him and demands food and a file. Terrified, Pip steals these items on Christmas Day and helps the convict in the marshes. Soldiers arrive searching for escaped convicts and find them fighting. The convict confesses to stealing food from Joe's house, and Joe kindly forgives him.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Graveyard", meaning: "أرض المقابر" },
              { word: "Scolded", meaning: "زعقت / وبخته" },
              { word: "Blacksmith", meaning: "حداد" },
              { word: "Convict", meaning: "مذنب / مسجون هربان" },
              { word: "Escaped", meaning: "هرب" },
              { word: "Prison ships", meaning: "سفن السجن" },
              { word: "Leg-irons", meaning: "أصفاد القدمين" },
              { word: "Workshop", meaning: "الورشة" },
              { word: "Set off", meaning: "انطلق / يبدأ رحلة" },
              { word: "Marsh", meaning: "مستنقعات" },
              { word: "Handcuffs", meaning: "كلبشات / أصفاد اليدين" },
              { word: "Confessed", meaning: "اعترف" }
            ].map((word, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg border-r-4 border-purple-400">
                <span className="font-semibold text-purple-700">{word.word}</span>
                <span className="text-gray-600 mr-2">←</span>
                <span className="text-gray-800">{word.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions & Answers */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">❓ أسئلة وإجابات متوقعة:</h4>
          <div className="space-y-4">
            {[
              {
                question: "What was Miss Joe's reaction when Pip returned from the graveyard?",
                answer: "Miss Joe asked Pip where he had been, and when he told her he had gone to the graveyard, she screamed at him, saying he was lucky not to be buried with them there. She also said it wasn't enough for her to be a blacksmith's wife.",
                arabicAnswer: "مس جو سألت بيب كان فين، ولما قالها إنه راح أرض المقابر، صرخت فيه وقالتله إنه محظوظ إنه مش مدفون معاهم هناك. كمان قالت إنه مش كفاية إنها تكون مرات حداد."
              },
              {
                question: "How did the convict treat Pip, and what did he demand?",
                answer: "The convict threatened Pip and demanded a file and food. This terrifying encounter led Pip to steal a meat pie and a file from Joe's workshop on Christmas Day to deliver to the convict in the marshes.",
                arabicAnswer: "المجرم هدد بيب وطلب منه مبرد وأكل. هذا اللقاء المخيف خلى بيب يسرق فطيرة لحم ومبرد من ورشة جو في يوم الكريسماس عشان يوديهم للمجرم في المستنقعات."
              }
            ].map((qa, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-semibold text-blue-800">السؤال {i + 1}: </span>
                  <span className="text-blue-700">{qa.question}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-green-800">الإجابة: </span>
                  <span className="text-green-700">{qa.answer}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">الترجمة: </span>
                  <span className="text-gray-700">{qa.arabicAnswer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chapter1;
