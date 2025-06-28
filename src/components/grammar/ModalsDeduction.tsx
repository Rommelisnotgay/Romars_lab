
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ModalsDeduction = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          الأفعال الناقصة للاستنتاج (Modals of Deduction)
        </CardTitle>
        <Badge variant="outline" className="mb-2">الأفعال الناقصة</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            تُستخدم هذه الأفعال للتعبير عن مدى اليقين أو الاحتمالية بحدوث شيء في الماضي أو الحاضر.
          </p>
        </div>

        {/* الاستنتاج في الماضي */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 الاستنتاج في الماضي:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>Must + have + V3:</strong> يقين إيجابي (100% متأكد)
            </div>
            <div>
              <strong>Can't/Couldn't + have + V3:</strong> يقين سلبي (0% متأكد)
            </div>
            <div>
              <strong>May/Might/Could + have + V3:</strong> احتمالية (50% متأكد)
            </div>
          </div>
        </div>

        {/* الاستنتاج في الحاضر */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 الاستنتاج في الحاضر:</h4>
          <div className="space-y-3 text-purple-700">
            <div>
              <strong>Must + الفعل في المصدر:</strong> يقين إيجابي في الحاضر
            </div>
            <div>
              <strong>Can't/Couldn't + الفعل في المصدر:</strong> يقين سلبي في الحاضر
            </div>
            <div>
              <strong>May/Might/Could + الفعل في المصدر:</strong> احتمالية في الحاضر
            </div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. The road is closed. There must have been an accident.
              </p>
              <p className="text-gray-600 text-sm italic">
                الطريق مغلق. لا بد أنه وقع حادث.
              </p>
            </div>
            <div className="border-r-4 border-red-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. Ali can't have read a 600-page book in a single day.
              </p>
              <p className="text-gray-600 text-sm italic">
                من المستحيل أن يكون علي قد قرأ كتابًا من 600 صفحة في يوم واحد.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. She might have been sleeping when I called.
              </p>
              <p className="text-gray-600 text-sm italic">
                ربما كانت نائمة عندما اتصلت.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔍 مفتاح الحل: Must have = 100% متأكد، Can't have = 0% متأكد، Might have = 50% متأكد
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModalsDeduction;
