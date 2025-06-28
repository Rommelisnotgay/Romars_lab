
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Quantifiers = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          المحددات الكمية (Quantifiers)
        </CardTitle>
        <Badge variant="outline" className="mb-2">القواعد الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            تُستخدم لتحديد الكمية أو العدد من الأسماء المعدودة وغير المعدودة.
          </p>
        </div>

        {/* الأسماء المعدودة */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 مع الأسماء المعدودة:</h4>
          <div className="space-y-3 text-green-700">
            <div><strong>Many:</strong> كثير (نفي/سؤال)</div>
            <div><strong>A few:</strong> قليل ويكفي (إيجابي)</div>
            <div><strong>Few:</strong> قليل ولا يكفي (سلبي)</div>
            <div><strong>Several:</strong> عدة/بضعة</div>
          </div>
        </div>

        {/* الأسماء غير المعدودة */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 مع الأسماء غير المعدودة:</h4>
          <div className="space-y-3 text-purple-700">
            <div><strong>Much:</strong> كثير (نفي/سؤال)</div>
            <div><strong>A little:</strong> قليل ويكفي (إيجابي)</div>
            <div><strong>Little:</strong> قليل ولا يكفي (سلبي)</div>
          </div>
        </div>

        {/* مع النوعين */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📐 مع النوعين:</h4>
          <div className="space-y-2 text-yellow-700">
            <div><strong>A lot of/Lots of:</strong> كثير من</div>
            <div><strong>Some:</strong> بعض (إثبات/عرض/طلب)</div>
            <div><strong>Any:</strong> أي (نفي/سؤال)</div>
            <div><strong>All/Most/No:</strong> كل/معظم/لا شيء</div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I have a few friends. (قليل ويكفي)
              </p>
              <p className="text-gray-600 text-sm italic">
                لدي بضعة أصدقاء.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. There is little hope. (قليل ولا يكفي)
              </p>
              <p className="text-gray-600 text-sm italic">
                يوجد أمل قليل.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. Do you have any questions?
              </p>
              <p className="text-gray-600 text-sm italic">
                هل لديك أي أسئلة؟
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔢 حيلة ذكية: معدود = Many/Few, غير معدود = Much/Little, A = إيجابي
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quantifiers;
