
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PresentSimple = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المضارع البسيط (Present Simple Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن الحقائق العامة، العادات المنتظمة، الجداول الزمنية الثابتة، والمشاعر والآراء الحالية.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>مع I, You, We, They:</strong> الفعل في المصدر
            </div>
            <div>
              <strong>مع He, She, It:</strong> الفعل + s/es/ies
            </div>
            <div>
              <strong>في النفي:</strong> don't/doesn't + المصدر
            </div>
            <div>
              <strong>في المبني للمجهول:</strong> am/is/are + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            always, usually, often, sometimes, rarely, never, every day/week/month, on Mondays, at 8 AM
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. The sun rises in the east.
              </p>
              <p className="text-gray-600 text-sm italic">
                الشمس تشرق من الشرق. (حقيقة عامة)
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. I go to school every day.
              </p>
              <p className="text-gray-600 text-sm italic">
                أذهب إلى المدرسة كل يوم. (عادة منتظمة)
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. The train leaves at 9 PM.
              </p>
              <p className="text-gray-600 text-sm italic">
                القطار يغادر الساعة 9 مساءً. (جدول زمني ثابت)
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            ⏰ حيلة ذكية: إذا كان الحدث يحدث بانتظام أو حقيقة عامة = المضارع البسيط
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentSimple;
