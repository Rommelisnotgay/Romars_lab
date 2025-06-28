
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CausativeVerbs = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          الأفعال السببية (Causative Verbs)
        </CardTitle>
        <Badge variant="outline" className="mb-2">القواعد المتقدمة</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            تُستخدم عندما يقوم شخص بجعل شخص آخر يفعل شيئاً، أو يجعل شيئاً يتم عمله.
          </p>
        </div>

        {/* Have/Get للأشخاص */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 Have/Get (مع الأشخاص):</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>Have + شخص + مصدر:</strong> يجعل شخصاً يفعل شيئاً
            </div>
            <div>
              <strong>Get + شخص + to + مصدر:</strong> يجعل شخصاً يفعل شيئاً
            </div>
          </div>
        </div>

        {/* Have/Get للأشياء */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 Have/Get (مع الأشياء):</h4>
          <div className="space-y-3 text-purple-700">
            <div>
              <strong>Have + شيء + V3:</strong> يجعل شيئاً يتم عمله
            </div>
            <div>
              <strong>Get + شيء + V3:</strong> يجعل شيئاً يتم عمله
            </div>
          </div>
        </div>

        {/* Make/Let/Allow */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📐 Make/Let/Allow:</h4>
          <div className="space-y-2 text-yellow-700">
            <div><strong>Make + شخص + مصدر:</strong> يجبر</div>
            <div><strong>Let + شخص + مصدر:</strong> يسمح</div>
            <div><strong>Allow + شخص + to + مصدر:</strong> يسمح</div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I had my car repaired.
              </p>
              <p className="text-gray-600 text-sm italic">
                أصلحت سيارتي (شخص آخر أصلحها لي).
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. The teacher made us do extra homework.
              </p>
              <p className="text-gray-600 text-sm italic">
                المدرس أجبرنا على عمل واجب إضافي.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. My parents let me go to the party.
              </p>
              <p className="text-gray-600 text-sm italic">
                والداي سمحا لي بالذهاب للحفلة.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔧 Have/Get + شيء + V3 = شخص آخر يعمل لك، Make = إجبار، Let = سماح
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default CausativeVerbs;
