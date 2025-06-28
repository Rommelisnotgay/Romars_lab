
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PresentContinuous = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المضارع المستمر (Present Continuous Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن أحداث تحدث الآن، خطط مستقبلية مؤكدة، أو شكوى من عادة مؤقتة مزعجة.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> am/is/are + V-ing
            </div>
            <div>
              <strong>في النفي:</strong> am/is/are + not + V-ing
            </div>
            <div>
              <strong>في المبني للمجهول:</strong> am/is/are + being + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            now, right now, at the moment, currently, Look!, Listen!, these days, always (للشكوى)
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I am studying English now.
              </p>
              <p className="text-gray-600 text-sm italic">
                أنا أدرس الإنجليزية الآن.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. We are meeting tomorrow at 5 PM.
              </p>
              <p className="text-gray-600 text-sm italic">
                سنلتقي غداً الساعة 5 مساءً. (خطة مؤكدة)
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. He is always talking loudly!
              </p>
              <p className="text-gray-600 text-sm italic">
                هو دائماً يتكلم بصوت عالي! (شكوى)
              </p>
            </div>
          </div>
        </div>

        {/* ملاحظة مهمة */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ ملاحظة مهمة:</h4>
          <p className="text-red-700">
            لا يُستخدم مع أفعال الحالة (know, love, hate, like, have "يمتلك", see, hear, etc.)
          </p>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            📍 حيلة ذكية: إذا كان الحدث يحدث الآن أو مخطط له بوقت محدد = المضارع المستمر
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentContinuous;
