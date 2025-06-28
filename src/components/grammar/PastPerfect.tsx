
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PastPerfect = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          3. زمن الماضي التام (Past Perfect Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم الماضي التام للتعبير عن الحدث الأول الذي وقع في الماضي قبل حدث آخر في الماضي.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات (Active):</strong> had + التصريف الثالث للفعل (V3)
            </div>
            <div>
              <strong>في النفي:</strong> hadn't + التصريف الثالث للفعل (V3)
            </div>
            <div>
              <strong>في المبني للمجهول (Passive):</strong> had + been + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            after, as soon as, once, before, by the time, until/till, by [تاريخ في الماضي], no sooner...than, hardly...when
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. After I had studied, I slept.
              </p>
              <p className="text-gray-600 text-sm italic">
                بعد أن درست، نمت.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. She had already finished the report before he arrived.
              </p>
              <p className="text-gray-600 text-sm italic">
                كانت قد أنهت التقرير بالفعل قبل أن يصل.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. By 2012, I had written three novels.
              </p>
              <p className="text-gray-600 text-sm italic">
                بحلول عام 2012، كنت قد كتبت ثلاث روايات.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🥇 قاعدة الأولوية: اللي حصل الأول = Past Perfect، اللي حصل بعديه = Past Simple
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastPerfect;
