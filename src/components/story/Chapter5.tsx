
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Chapter5 = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-purple-700 mb-2">
          الفصل الخامس: محاكمة بروفيس ومصير الشخصيات
        </CardTitle>
        <Badge variant="outline" className="mb-2">
          Chapter 5: Provis's Trial and Character Fates
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
                بروفيس بيتقبض عليه ويتحاكم. أثناء المحاكمة، بيب بيدرك إن بروفيس هو والد ستيلا الحقيقي (ماجوتش). كومبزون بيغرق في النهر أثناء القتال مع بروفيس. بروفيس بيتحكم عليه بالإعدام بس بيموت من مرضه قبل تنفيذ الحكم. بيب بيمرض جداً من الصدمة وجو بيجي يرعاه. بيب بيرجع لقريته ويتزوج من بيدي اللي كانت اتجوزت جو. بيب بيشتغل بره إنجلترا لسنين ويرجع راجل ناضج. في النهاية، بيقابل ستيلا تاني في أنقاض بيت مس هافيشام، وبيبدو إنهم هيبقوا مع بعض.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">🇬🇧 English Summary:</p>
              <p className="text-gray-700 leading-relaxed">
                Provis is captured and put on trial. During the trial, Pip realizes that Provis is Estella's real father (Magwitch). Compeyson drowns in the river during his fight with Provis. Provis is sentenced to death but dies from illness before the execution. Pip falls seriously ill from shock and Joe comes to care for him. Pip returns to his village to find that Biddy has married Joe. Pip works abroad for years and returns as a mature man. Finally, he meets Estella again in the ruins of Miss Havisham's house, and it seems they will be together.
              </p>
            </div>
          </div>
        </div>

        {/* Key Words */}
        <div>
          <h4 className="font-semibold text-purple-800 mb-3">🔑 الكلمات المهمة:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { word: "Trial", meaning: "محاكمة" },
              { word: "Sentenced", meaning: "حُكم عليه" },
              { word: "Execution", meaning: "إعدام" },
              { word: "Drowned", meaning: "غرق" },
              { word: "Seriously ill", meaning: "مريض جداً" },
              { word: "Fever", meaning: "حمى" },
              { word: "Nursed", meaning: "رعى / اهتم به" },
              { word: "Recovered", meaning: "تعافى" },
              { word: "Abroad", meaning: "في الخارج" },
              { word: "Mature", meaning: "ناضج" },
              { word: "Ruins", meaning: "أنقاض" },
              { word: "Reconciliation", meaning: "مصالحة" }
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
                question: "What happened to Compeyson during the struggle with Provis?",
                answer: "Compeyson drowned in the river during his fight with Provis when they were both captured by the police officers.",
                arabicAnswer: "كومبزون غرق في النهر أثناء قتاله مع بروفيس لما الاتنين اتقبض عليهم من ضباط الشرطة."
              },
              {
                question: "How did Pip discover the relationship between Provis and Estella?",
                answer: "During the trial, Pip realized that Provis (Magwitch) was actually Estella's real father, which explained the connection between all the characters.",
                arabicAnswer: "أثناء المحاكمة، بيب أدرك إن بروفيس (ماجوتش) هو والد ستيلا الحقيقي، وده فسر العلاقة بين كل الشخصيات."
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

export default Chapter5;
