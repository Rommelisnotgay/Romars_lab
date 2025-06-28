
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RelativeClauses = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          عبارات الوصل (Relative Clauses)
        </CardTitle>
        <Badge variant="outline" className="mb-2">القواعد المتقدمة</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            تُستخدم لربط جملتين وتقديم معلومات إضافية عن الاسم في الجملة الرئيسية.
          </p>
        </div>

        {/* ضمائر العاقل */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 للعاقل:</h4>
          <div className="space-y-3 text-green-700">
            <div><strong>Who:</strong> فاعل أو مفعول (لا يأتي بعد فاصلة)</div>
            <div><strong>Whom:</strong> مفعول فقط (يأتي بعد حرف جر)</div>
            <div><strong>Whose:</strong> للملكية</div>
          </div>
        </div>

        {/* ضمائر غير العاقل */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 لغير العاقل:</h4>
          <div className="space-y-3 text-purple-700">
            <div><strong>Which:</strong> فاعل أو مفعول</div>
            <div><strong>That:</strong> للعاقل وغير العاقل (لا يأتي بعد فاصلة)</div>
          </div>
        </div>

        {/* ضمائر المكان والزمان */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📐 للمكان والزمان:</h4>
          <div className="space-y-2 text-yellow-700">
            <div><strong>Where:</strong> للمكان</div>
            <div><strong>When:</strong> للوقت</div>
            <div><strong>Why:</strong> للسبب</div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. The man who lives next door is a doctor.
              </p>
              <p className="text-gray-600 text-sm italic">
                الرجل الذي يعيش في المنزل المجاور طبيب.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. This is the house where I was born.
              </p>
              <p className="text-gray-600 text-sm italic">
                هذا هو المنزل الذي ولدت فيه.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. The girl whose father is a teacher won the prize.
              </p>
              <p className="text-gray-600 text-sm italic">
                الفتاة التي والدها مدرس فازت بالجائزة.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔗 حيلة ذكية: عاقل = Who, غير عاقل = Which, مكان = Where, ملكية = Whose
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelativeClauses;
