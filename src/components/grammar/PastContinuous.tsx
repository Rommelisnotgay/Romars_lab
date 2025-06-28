
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PastContinuous = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          2. زمن الماضي المستمر (Past Continuous Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم الماضي المستمر للتعبير عن حدث كان مستمرًا في وقت محدد في الماضي، أو حدثين مستمرين في نفس الوقت، أو حدث مستمر قطعه حدث آخر.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات (Active):</strong> was/were + الفعل مضافًا له ing
            </div>
            <div>
              <strong>في النفي:</strong> wasn't/weren't + الفعل مضافًا له ing
            </div>
            <div>
              <strong>في المبني للمجهول (Passive):</strong> was/were + being + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            at [وقت محدد] yesterday, all day/night yesterday, from...to...yesterday, while, as, just as, when
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I was doing my homework at 6 o'clock yesterday.
              </p>
              <p className="text-gray-600 text-sm italic">
                كنت أعمل واجبي الساعة 6 أمس.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. While I was studying physics, my brother was studying history.
              </p>
              <p className="text-gray-600 text-sm italic">
                بينما كنت أدرس الفيزياء، كان أخي يدرس التاريخ.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. We were walking home when someone stopped us in the street.
              </p>
              <p className="text-gray-600 text-sm italic">
                كنا نسير للمنزل عندما أوقفنا شخص في الشارع.
              </p>
            </div>
          </div>
        </div>

        {/* ملاحظات مهمة */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ ملاحظات مهمة:</h4>
          <div className="text-red-700 space-y-2">
            <p><strong>أفعال الحالة (State Verbs):</strong> لا تُستخدم في الأزمنة المستمرة</p>
            <p>مثل: have (بمعنى يمتلك), know, love, hate, like, see, hear, etc.</p>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            ⏰ حيلة الوقت: لو فيه وقت محدد في الماضي أو while - استخدم المستمر!
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastContinuous;
