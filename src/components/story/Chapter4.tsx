
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter4 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل الرابع: الحقيقة عن ماجوتش والكشوفات الصادمة
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 4: The Truth About Magwitch and Shocking Revelations
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
                بروفيس (ماجوتش) بيكشف قصة حياته لبيب وهيربرت: كان يتيم وسرق وتسول عشان يعيش. قابل كومبزون اللي خدعه وخان ثقته، وكومبزون هو نفسه اللي خدع مس هافيشام مع أخوها غير الشقيق آرثر. بروفيس بيرجع إنجلترا عشان يشوف بيب جنتلمان، بس كومبزون لسه عايش وناوي يقتله. إستيلا بتقول لبيب إنها هتتجوز بنتلي دراميل، وقلب بيب بينكسر. مس هافيشام بتعترف إنها استخدمت إستيلا عشان تحطم قلب بيب انتقاماً من خطيبها اللي سابها. مستر جاجرز بيكشف إن إستيلا بنت مولي، مدبرة منزله. أورليك بيهاجم بيب ويعترف إنه هو اللي ضرب مس جو. هيربرت وناس من القرية بينقذوا بيب. بيب وأصحابه بيحاولوا يساعدوا بروفيس يهرب بالقارب، بس ضباط الشرطة وكومبزون بيقبضوا عليه قبل ما يهرب.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                Pip discovers that his benefactor is actually Magwitch, the convict he helped as a child. Magwitch reveals his past with Compeyson, who deceived Miss Havisham and betrayed Magwitch. Pip learns that Estella is actually Magwitch's daughter and that his dreams of marrying her were never Miss Havisham's intention. The chapter culminates with Pip and his friends attempting to help Magwitch escape, but they are intercepted by police officers and Compeyson.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Obligated", meaning: "ملزم / واجبي" },
              { word: "Orphan", meaning: "يتيم" },
              { word: "Dishonest", meaning: "غير أمين" },
              { word: "Cheated", meaning: "خدع" },
              { word: "Guilty", meaning: "حاسس بالذنب" },
              { word: "Abandoned", meaning: "هجر" },
              { word: "Stepbrother", meaning: "أخ غير الشقيق" },
              { word: "Warning", meaning: "تحذير" },
              { word: "Watched", meaning: "مراقبين" },
              { word: "Revenge", meaning: "انتقام" },
              { word: "Fiancé", meaning: "خطيب" },
              { word: "Housekeeper", meaning: "مدبرة منزل" },
              { word: "Jealousy", meaning: "غيرة" },
              { word: "Capture", meaning: "القبض عليه" }
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
                question: "What revelations are made about Magwitch's past, and what is his connection to Compeyson and Miss Havisham?",
                answer: "Magwitch reveals he was an orphan who turned to crime. He met Compeyson, who was a dishonest man responsible for defrauding Miss Havisham of her fortune alongside her half-brother, Arthur. Compeyson betrayed Magwitch, leading to Magwitch receiving a harsher prison sentence.",
                arabicAnswer: "ماجوتش كشف إنه كان يتيم التجأ للجريمة. التقى بكومبزون، اللي كان رجل غير أمين مسؤول عن الاحتيال على مس هافيشام وسرقة ثروتها مع أخيها غير الشقيق، آرثر. خان كومبزون ماجوتش، مما أدى إلى حصول ماجوتش على حكم سجن أقسى."
              },
              {
                question: "What shocking revelation did Mr. Jaggers make to Pip about Estella's true parentage?",
                answer: "Mr. Jaggers revealed that Estella was the daughter of Molly, his housekeeper, whom he had defended in a murder trial, knowing she was guilty. He had taken Estella and given her to Miss Havisham after Molly was freed from prison.",
                arabicAnswer: "مستر جاجرز كشف إن إستيلا بنت مولي، مدبرة منزله، اللي هو دافع عنها في محاكمة قتل، وهو كان عارف إنها مذنبة. هو اللي خد إستيلا واداها لمس هافيشام بعد ما مولي خرجت من السجن."
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

export default Chapter4;
