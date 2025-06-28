
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FutureContinuous = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المستقبل المستمر (Future Continuous Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">أزمنة المستقبل</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن حدث سيكون مستمراً في وقت محدد في المستقبل، أو للاعتذارات المهذبة في المستقبل.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> will + be + V-ing
            </div>
            <div>
              <strong>في النفي:</strong> won't + be + V-ing
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            at [وقت محدد] tomorrow/next week, all day tomorrow, from...to tomorrow
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. Don't call me at 9 tomorrow. I will be sleeping.
              </p>
              <p className="text-gray-600 text-sm italic">
                لا تتصل بي الساعة 9 غداً. سأكون نائماً.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. This time next week, I will be lying on the beach.
              </p>
              <p className="text-gray-600 text-sm italic">
                في مثل هذا الوقت الأسبوع المقبل، سأكون مستلقياً على الشاطئ.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. I won't be working late tonight.
              </p>
              <p className="text-gray-600 text-sm italic">
                لن أعمل متأخراً هذه الليلة. (اعتذار مهذب)
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            ⏰ حيلة ذكية: وقت محدد في المستقبل + استمرارية = المستقبل المستمر
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureContinuous;
