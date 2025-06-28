
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ReportedSpeech = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          الكلام المنقول (Reported Speech)
        </CardTitle>
        <Badge variant="outline" className="mb-2">القواعد المتقدمة</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            طريقة نقل كلام شخص آخر دون استخدام كلماته الأصلية مع تغيير الأزمنة والضمائر.
          </p>
        </div>

        {/* تحويل الأزمنة */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 تحويل الأزمنة (إذا كان فعل القول ماضي):</h4>
          <div className="space-y-3 text-green-700">
            <div><strong>Present Simple → Past Simple</strong></div>
            <div><strong>Present Continuous → Past Continuous</strong></div>
            <div><strong>Present Perfect → Past Perfect</strong></div>
            <div><strong>Past Simple → Past Perfect</strong></div>
            <div><strong>Will → Would, Can → Could</strong></div>
          </div>
        </div>

        {/* تحويل الظروف */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 تحويل ظروف الزمان والمكان:</h4>
          <div className="space-y-3 text-purple-700">
            <div><strong>Now → Then, Today → That day</strong></div>
            <div><strong>Tomorrow → The next day</strong></div>
            <div><strong>Yesterday → The day before</strong></div>
            <div><strong>Here → There, This → That</strong></div>
          </div>
        </div>

        {/* الأسئلة */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📐 نقل الأسئلة:</h4>
          <div className="space-y-2 text-yellow-700">
            <div><strong>Yes/No questions:</strong> استخدم if/whether</div>
            <div><strong>Wh-questions:</strong> استخدم نفس أداة الاستفهام</div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. He said, "I am happy." → He said that he was happy.
              </p>
              <p className="text-gray-600 text-sm italic">
                هو قال أنه كان سعيداً.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. "Are you coming?" → He asked if I was coming.
              </p>
              <p className="text-gray-600 text-sm italic">
                هو سأل إذا كنت قادماً.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. "Where do you live?" → He asked where I lived.
              </p>
              <p className="text-gray-600 text-sm italic">
                هو سأل أين أعيش.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            📢 حيلة ذكية: Said ماضي = غير الزمن، Says مضارع = لا تغير الزمن
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportedSpeech;
