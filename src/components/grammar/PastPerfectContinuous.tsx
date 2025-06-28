
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PastPerfectContinuous = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          4. زمن الماضي التام المستمر (Past Perfect Continuous Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن الحدث الأول في الماضي الذي استمر لفترة من الوقت قبل أن يقع حدث آخر في الماضي. يركز على مدة الاستمرارية.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات (Active):</strong> had + been + الفعل مضافًا له ing
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            for [مدة زمنية], since [نقطة زمنية], all day/month/year (في سياق الماضي التام)
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. Amr had been playing tennis for five years before his injury.
              </p>
              <p className="text-gray-600 text-sm italic">
                كان عمرو يلعب التنس لمدة خمس سنوات قبل إصابته.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. She had been chatting with her mother for a long time.
              </p>
              <p className="text-gray-600 text-sm italic">
                كانت تتحدث مع والدتها لفترة طويلة.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. They had been working hard all day, so they were exhausted.
              </p>
              <p className="text-gray-600 text-sm italic">
                كانوا يعملون بجد طوال اليوم، لذلك كانوا منهكين.
              </p>
            </div>
          </div>
        </div>

        {/* ملاحظات مهمة */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ قيود الاستخدام:</h4>
          <div className="text-red-700 space-y-2">
            <p>لا يُستخدم مع أفعال الحالة (State Verbs)</p>
            <p>لا يُستخدم عند ذكر عدد المرات التي تكرر فيها الفعل</p>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            ⏱️ شرط المدة: لازم تذكر المدة (for/since) وإلا مينفعش تستخدمه!
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastPerfectContinuous;
