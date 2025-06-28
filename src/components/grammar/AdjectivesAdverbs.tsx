
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdjectivesAdverbs = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 mb-2">
          الصفات والأحوال (Adjectives & Adverbs)
        </CardTitle>
        <Badge variant="outline" className="mb-2">القواعد الأساسية</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الشرح */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📚 الشرح:</h4>
          <p className="text-blue-700">
            الصفات تصف الأسماء، والأحوال تصف الأفعال والصفات والأحوال الأخرى.
          </p>
        </div>

        {/* الصفات */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📐 الصفات (Adjectives):</h4>
          <div className="space-y-3 text-green-700">
            <div><strong>-ed endings:</strong> تصف شعور الشخص (bored, excited)</div>
            <div><strong>-ing endings:</strong> تصف ما يسبب الشعور (boring, exciting)</div>
            <div><strong>بعد أفعال الحواس:</strong> look, sound, smell, taste, feel</div>
          </div>
        </div>

        {/* المقارنة */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📐 المقارنة والتفضيل:</h4>
          <div className="space-y-3 text-purple-700">
            <div><strong>صفات قصيرة:</strong> -er than / the -est</div>
            <div><strong>صفات طويلة:</strong> more...than / the most</div>
            <div><strong>المساواة:</strong> as...as / not so...as</div>
          </div>
        </div>

        {/* Too/Enough/So/Such */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📐 Too/Enough/So/Such:</h4>
          <div className="space-y-2 text-yellow-700">
            <div><strong>Too + صفة:</strong> أكثر من اللازم (سلبي)</div>
            <div><strong>صفة + enough:</strong> بقدر كافٍ (إيجابي)</div>
            <div><strong>So + صفة + that:</strong> لدرجة أن</div>
            <div><strong>Such + اسم + that:</strong> لدرجة أن</div>
          </div>
        </div>

        {/* الأمثلة */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📝 أمثلة واضحة:</h4>
          <div className="space-y-4">
            <div className="border-r-4 border-green-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                1. She is taller than her sister.
              </p>
              <p className="text-gray-600 text-sm italic">
                هي أطول من أختها.
              </p>
            </div>
            <div className="border-r-4 border-purple-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                2. He is too young to drive.
              </p>
              <p className="text-gray-600 text-sm italic">
                هو صغير جداً للقيادة.
              </p>
            </div>
            <div className="border-r-4 border-blue-400 pr-4">
              <p className="text-gray-800 font-medium mb-1">
                3. It was such a good movie that I watched it twice.
              </p>
              <p className="text-gray-600 text-sm italic">
                كان فيلماً جيداً لدرجة أنني شاهدته مرتين.
              </p>
            </div>
          </div>
        </div>

        {/* الحيلة الذكية */}
        <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">
            📏 حيلة ذكية: -ed = شعور الشخص، -ing = سبب الشعور، Too = سلبي، Enough = إيجابي
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdjectivesAdverbs;
