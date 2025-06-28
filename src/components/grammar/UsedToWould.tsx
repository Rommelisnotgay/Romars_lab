
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UsedToWould = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          العادات في الماضي (Used to & Would)
        </CardTitle>
        <Badge variant="outline" className="mb-2">العادات والتكرار</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            للتعبير عن عادات كانت تحدث في الماضي ولم تعد تحدث الآن.
          </p>
        </div>

        {/* Used to */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 Used to:</h4>
          <div className="space-y-3 text-green-700">
            <div>
              <strong>في الإثبات:</strong> used to + الفعل في المصدر
            </div>
            <div>
              <strong>في النفي:</strong> didn't use to + الفعل في المصدر
            </div>
            <div>
              <strong>في السؤال:</strong> Did + الفاعل + use to + الفعل في المصدر
            </div>
            <div>
              <strong>الاستخدام:</strong> للعادات والحالات في الماضي
            </div>
          </div>
        </div>

        {/* Would */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 Would:</h4>
          <div className="space-y-3 text-purple-700">
            <div>
              <strong>التكوين:</strong> would + الفعل في المصدر
            </div>
            <div>
              <strong>الاستخدام:</strong> للعادات المتكررة في الماضي فقط
            </div>
            <div>
              <strong>لا تُستخدم مع:</strong> أفعال الحالة (have, be, like, know)
            </div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. He used to smoke a lot.
              </p>
              <p className="text-gray-600 text-sm italic">
                كان معتادًا على التدخين كثيرًا.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. When I was young, I would play squash every weekend.
              </p>
              <p className="text-gray-600 text-sm italic">
                عندما كنت صغيرًا، كنت ألعب الاسكواش كل نهاية أسبوع.
              </p>
            </div>
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. Ramadan Sobhi used to play for Al Ahly, but now he plays for Pyramids.
              </p>
              <p className="text-gray-600 text-sm italic">
                رمضان صبحي كان يلعب للأهلي، لكن الآن يلعب لبيراميدز.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            🔄 Used to للعادات والحالات، Would للأفعال المتكررة بس (مش الحالات زي be/have/like)
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsedToWould;
