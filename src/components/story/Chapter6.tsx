
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter6 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل السادس: النهاية والدروس المستفادة
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 6: The Ending and Lessons Learned
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
                بيب بيتعلم الدروس المهمة في الحياة عن التواضع، الحب الحقيقي، والصداقة. بيدرك إن الآمال العظيمة مش دايماً بتجيب السعادة، وإن الأشخاص البسطاء زي جو كانوا أهم من الثروة والمكانة الاجتماعية. بيب بيقدر طيبة جو وإخلاصه، وبيندم على إنه كان بيخجل منه. القصة بتنتهي برسالة إن السعادة الحقيقية تيجي من الحب والصداقة الصادقة، مش من الفلوس والمكانة. بيب وستيلا بيلاقوا السلام أخيراً بعد كل المعاناة اللي مروا بيها.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                Pip learns important life lessons about humility, true love, and friendship. He realizes that great expectations don't always bring happiness, and that simple people like Joe were more important than wealth and social status. Pip appreciates Joe's kindness and loyalty, and regrets being ashamed of him. The story ends with the message that true happiness comes from love and genuine friendship, not from money and status. Pip and Estella finally find peace after all the suffering they've been through.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Humility", meaning: "تواضع" },
              { word: "Genuine", meaning: "حقيقي / صادق" },
              { word: "Loyalty", meaning: "إخلاص / وفاء" },
              { word: "Regret", meaning: "ندم" },
              { word: "Appreciate", meaning: "يقدر" },
              { word: "Suffering", meaning: "معاناة" },
              { word: "Peace", meaning: "سلام / راحة" },
              { word: "Wisdom", meaning: "حكمة" },
              { word: "Maturity", meaning: "نضج" },
              { word: "Contentment", meaning: "رضا / قناعة" },
              { word: "Redemption", meaning: "فداء / خلاص" },
              { word: "Transformation", meaning: "تحول / تغيير" }
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
                question: "What important life lessons did Pip learn by the end of the story?",
                answer: "Pip learned about humility, the value of true friendship, and that happiness doesn't come from wealth or social status but from genuine relationships and contentment with one's life.",
                arabicAnswer: "بيب اتعلم عن التواضع، وقيمة الصداقة الحقيقية، وإن السعادة ماتيجيش من الثروة أو المكانة الاجتماعية، بل من العلاقات الصادقة والرضا بحياة الإنسان."
              },
              {
                question: "How did Pip's attitude toward Joe change throughout the story?",
                answer: "Initially, Pip was ashamed of Joe's simple life and wanted to become a gentleman. By the end, he realized Joe's true worth, appreciated his kindness and loyalty, and regretted being ashamed of him.",
                arabicAnswer: "في الأول، بيب كان بيخجل من حياة جو البسيطة وكان عايز يبقى جنتلمان. في الآخر، أدرك قيمة جو الحقيقية، وقدر طيبته ووفاءه، وندم إنه كان بيخجل منه."
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

        {/* Story Themes */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🎭 الموضوعات الرئيسية للقصة:</h4>
          <div className="bg-amber-50 p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>النمو والنضج:</strong> رحلة بيب من الطفولة للرجولة وتعلم الحكمة</li>
              <li><strong>الطبقات الاجتماعية:</strong> الفرق بين الأغنياء والفقراء في المجتمع الإنجليزي</li>
              <li><strong>الحب والخيبة:</strong> حب بيب لستيلا وما جابله من ألم وتعلم</li>
              <li><strong>الصداقة الحقيقية:</strong> أهمية الأشخاص الطيبين زي جو في حياتنا</li>
              <li><strong>العدالة والانتقام:</strong> كيف الأشرار بيتعاقبوا في النهاية</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chapter6;
