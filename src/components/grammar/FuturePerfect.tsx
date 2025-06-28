
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FuturePerfect = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المستقبل التام (Future Perfect Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">أزمنة المستقبل</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن حدث سيكون قد اكتمل بحلول وقت معين في المستقبل.
          </p>
        </div>

        {/* التكوين */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 التكوين:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> will + have + V3
            </div>
            <div>
              <strong>في النفي:</strong> won't + have + V3
            </div>
            <div>
              <strong>في المبني للمجهول:</strong> will + have + been + V3
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <p className="text-yellow-700">
            by [وقت مستقبلي], by the end of, before [وقت مستقبلي]
          </p>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. By next week, I will have finished my project.
              </p>
              <p className="text-gray-600 text-sm italic">
                بحلول الأسبوع المقبل، سأكون قد أنهيت مشروعي.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. By 2030, scientists will have discovered a cure for cancer.
              </p>
              <p className="text-gray-600 text-sm italic">
                بحلول عام 2030، سيكون العلماء قد اكتشفوا علاجاً للسرطان.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. The train will have left by the time we arrive.
              </p>
              <p className="text-gray-600 text-sm italic">
                القطار سيكون قد غادر بحلول وصولنا.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            📅 حيلة ذكية: بحلول وقت محدد في المستقبل + اكتمال = المستقبل التام
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuturePerfect;
