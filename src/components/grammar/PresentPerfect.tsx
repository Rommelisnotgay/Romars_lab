
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PresentPerfect = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المضارع التام (Present Perfect Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأزمنة الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن حدث بدأ في الماضي وما زال مستمراً، أو حدث انتهى في الماضي وله أثر في الحاضر.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> have/has + V3
            </div>
            <div>
              <strong>في النفي:</strong> haven't/hasn't + V3
            </div>
            <div>
              <strong>في المبني للمجهول:</strong> have/has + been + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            for, since, yet (نفي/سؤال), just, already, ever, never, so far, up till now, recently, lately
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I have lived here for 10 years.
              </p>
              <p className="text-gray-600 text-sm italic">
                أعيش هنا منذ 10 سنوات. (ما زلت أعيش)
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. She has already finished her homework.
              </p>
              <p className="text-gray-600 text-sm italic">
                هي أنهت واجبها بالفعل. (أثر في الحاضر)
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. Have you ever been to Paris?
              </p>
              <p className="text-gray-600 text-sm italic">
                هل سبق لك أن ذهبت إلى باريس؟
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔗 حيلة ذكية: إذا كان للحدث الماضي صلة بالحاضر = المضارع التام
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentPerfect;
