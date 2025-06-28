
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter2 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل الثاني: مس هافيشام وإستيلا
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 2: Miss Havisham and Estella
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
                مس هافيشام، سيدة غنية جداً وبتعيش في بيت كبير وقديم ومابتخرجش منه، بتطلب من عم جو إنه يدلها على ولد يجي يلعب مع بنت عايشة عندها. بيب بيروح بيت مس هافيشام ويقابل إستيلا، بنت صغيرة وجميلة بس متكبرة. مس هافيشام لابسة فستان زفاف أبيض قديم ومصفر. إستيلا بتعامل بيب بقسوة شديدة، وبتحطله الأكل والشرب على الأرض كأنه كلب. بيب بيحس بالخزي والعار من حياته البسيطة. بيب بيقرر إنه يتعلم قدر الإمكان في مدرسة القرية عشان يبقى جنتلمان ويعجب إستيلا.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                Pip is invited to play with a young girl at the home of Miss Havisham, a wealthy recluse. He meets Estella, a beautiful but proud girl, and Miss Havisham, who wears an old yellowed wedding dress. Estella treats Pip cruelly, making him feel ashamed of his humble origins and inspiring his desire to become a gentleman.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Grateful", meaning: "ممتن / شاكر" },
              { word: "Apprentice", meaning: "متدرب / صبي عند الحداد" },
              { word: "Fortune", meaning: "ثروة" },
              { word: "Proud", meaning: "متكبرة" },
              { word: "Untidy", meaning: "مش مترتب / فوضوي" },
              { word: "Unused", meaning: "مش مستخدم" },
              { word: "Dressing room", meaning: "غرفة الملابس" },
              { word: "Veil", meaning: "حجاب" },
              { word: "Ashamed", meaning: "حاسس بالخزي والعار" },
              { word: "Position", meaning: "مكانته في الحياة" },
              { word: "Educated", meaning: "متعلم" },
              { word: "Gentleman", meaning: "جنتلمان - راجل نبيل ومثقف" }
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
                question: "Why did Miss Havisham want Pip to come to her house, and what was Miss Joe's reaction?",
                answer: "Miss Havisham wanted Pip to come to her house to play with a child living there. Miss Joe believed that by going to Miss Havisham's, Pip would make his fortune, dreaming of wealth for him.",
                arabicAnswer: "مس هافيشام كانت عايزة بيب يجي بيتها عشان يلعب مع طفلة عايشة هناك. مس جو كانت فاكرة إن بيب لو راح لـ مس هافيشام هيعمل ثروة كبيرة."
              },
              {
                question: "How did Estella treat Pip during his first visit, and how did it affect him?",
                answer: "Estella treated Pip cruelly by placing food and drink on the floor for him, treating him like a dog. This made Pip cry and feel ashamed of his simple, ordinary life.",
                arabicAnswer: "إستيلا عاملت بيب بقسوة بأنها حطتله الأكل والشرب على الأرض، وعاملته كأنه كلب. ده خلى بيب يعيط ويحس بالخزي والعار من حياته البسيطة."
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

export default Chapter2;
