
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter3 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل الثالث: المتبرع الغامض والآمال العظيمة
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 3: The Mysterious Benefactor and Great Expectations
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
                بيب بيزور مس هافيشام بملابسه الجديدة وبيقولها إنه جاله ثروة. مستر جاجرز بيقول لبيب إنه هيتعلم في لندن. بيب بيكون متأكد إن مس هافيشام هي المتبرعة السرية بتاعته. بيب بيسافر لندن ويحس بالوحدة. بيشوف اتنين مساجين تانيين ويسمعهم بيتكلموا عن ماجوتش. بيب بيرجع تاني لبيت مس هافيشام، وبيلاقي إستيلا أجمل بكتير من الأول، بس لسه بتخليه يحس إنه ولد فقير وعادي. بيب وإستيلا بيروحوا ريتشموند، وبيب بيزور إستيلا كتير وبيأمل إنها تحبه. إستيلا ومس هافيشام بيحصل بينهم خناقة كبيرة. مس جو بتموت بعد مرض طويل، وبيب مبيحسش بالحزن عليها.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                Pip learns he has a mysterious benefactor who will make him a gentleman with great expectations. He moves to London to receive his education, believing Miss Havisham is his benefactor and that he's destined to marry Estella. He continues to visit Estella, spending money freely but never feeling truly happy with her. Mrs. Joe dies after a long illness, and Pip doesn't feel much grief.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Fortune", meaning: "ثروة" },
              { word: "Benefactor", meaning: "فاعل الخير / المتبرع السري" },
              { word: "Educated", meaning: "متعلم" },
              { word: "Unfriendly", meaning: "غير ودود" },
              { word: "Recognized", meaning: "تعرف على" },
              { word: "Life sentence", meaning: "سجن مدى الحياة" },
              { word: "Elegant lady", meaning: "سيدة رائعة / أنيقة" },
              { word: "Proud", meaning: "متكبرة" },
              { word: "Rude", meaning: "واقحة" },
              { word: "Greedy relatives", meaning: "قرايب طماعين" },
              { word: "Argument", meaning: "نزاع / خناقة" },
              { word: "Cold-hearted", meaning: "قلبها بارد" },
              { word: "Deceive", meaning: "تخدع" },
              { word: "Extravagant life", meaning: "حياة فيها إسراف" }
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
                question: "What did Pip believe about the source of his fortune, and who confirmed it to him?",
                answer: "Pip believed that Miss Havisham was his secret benefactor. Mr. Jaggers, her relative, confirmed this by arranging for Pip to be educated in London, which solidified Pip's belief that Miss Havisham was behind his new fortune.",
                arabicAnswer: "بيب اعتقد إن مس هافيشام هي المتبرعة السرية بتاعته. مستر جاجرز، قريبها، أكدله ده لما رتب لبيب إنه يتعلم في لندن."
              },
              {
                question: "How had Estella changed upon Pip's re-encounter with her at Miss Havisham's house?",
                answer: "Pip found Estella to be even more beautiful than before. However, despite her increased beauty, she still made him feel like a poor, common boy, just as she had in their childhood.",
                arabicAnswer: "بيب لقى إستيلا أجمل بكتير من الأول. بس على الرغم من جمالها الزايد، لسه خلته يحس إنه ولد فقير وعادي، زي ما كانت بتعامله وهو طفل."
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

export default Chapter3;
