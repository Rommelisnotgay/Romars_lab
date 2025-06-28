
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PastSimple = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          1. زمن الماضي البسيط (Past Simple Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم الماضي البسيط للتعبير عن أحداث بدأت وانتهت في الماضي دون ترك أثر في الحاضر. كما يُستخدم لسرد الأحداث في القصص.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات (Active):</strong> التصريف الثاني للفعل (V2)
            </div>
            <div>
              <strong>في النفي:</strong> didn't + الفعل في المصدر
            </div>
            <div>
              <strong>في المبني للمجهول (Passive):</strong> was/were + التصريف الثالث للفعل (V3)
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            yesterday, ago, last, in [سنة في الماضي], just now, once, one day
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. A famous writer wrote this book a year ago.
              </p>
              <p className="text-gray-600 text-sm italic">
                كاتب مشهور كتب هذا الكتاب منذ سنة.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. They didn't invite me to the party.
              </p>
              <p className="text-gray-600 text-sm italic">
                هم لم يدعوني للحفلة.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. The book was written by a famous writer.
              </p>
              <p className="text-gray-600 text-sm italic">
                الكتاب كُتب بواسطة كاتب مشهور.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🎯 حيلة ذكية: ابحث عن التصريف الثاني للفعل، أو وجود 'did' في النفي/السؤال، أو 'was/were + V3' في المبني للمجهول
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastSimple;
