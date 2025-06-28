
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FutureSimple = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          5. زمن المستقبل البسيط (Future Simple Tense)
        </CardTitle>
        <Badge variant="outline" className="mb-2">أزمنة المستقبل</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            يُستخدم للتعبير عن حقائق مستقبلية (مثل العمر)، قرارات سريعة، عروض وطلبات، تهديدات ووعود، وتنبؤات لا تستند إلى دليل مرئي.
          </p>
        </div>

        {/* التكوين - Will */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 Will + مصدر:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> will + الفعل في المصدر
            </div>
            <div>
              <strong>في النفي:</strong> won't + الفعل في المصدر
            </div>
            <div>
              <strong>الاستخدامات:</strong> حقائق مستقبلية، قرارات سريعة، عروض وطلبات، وعود، تهديدات، تنبؤات بدون دليل
            </div>
          </div>
        </div>

        {/* التكوين - Going to */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 Am/is/are going to + مصدر:</h4>
          <div className="space-y-3 text-purple-700">
            <div>
              <strong>في الإثبات:</strong> am/is/are + going to + الفعل في المصدر
            </div>
            <div>
              <strong>في النفي:</strong> am/is/are + not + going to + الفعل في المصدر
            </div>
            <div>
              <strong>الاستخدامات:</strong> خطط ونوايا وقرارات مُتخذة مسبقًا، تنبؤات تستند إلى دليل مرئي
            </div>
          </div>
        </div>

        {/* الكلمات الدالة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 الكلمات الدالة:</h4>
          <div className="text-yellow-700 space-y-2">
            <p><strong>Will:</strong> think, believe, expect, hope, probably, perhaps, promises, threats</p>
            <p><strong>Going to:</strong> plan, intend, decide, decision, intention, Look! (لدليل مرئي)</p>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. I think it will be hot today. (تنبؤ)
              </p>
              <p className="text-gray-600 text-sm italic">
                أعتقد أن الجو سيكون حارًا اليوم.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. It's very cloudy. It's going to rain. (تنبؤ بدليل)
              </p>
              <p className="text-gray-600 text-sm italic">
                الجو غائم جدًا. سوف تمطر.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. I am going to buy a new car next month. (خطة)
              </p>
              <p className="text-gray-600 text-sm italic">
                سأشتري سيارة جديدة الشهر القادم.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🤔 Will = قرار لحظي أو توقع، Going to = خطة جاهزة أو دليل واضح
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureSimple;
