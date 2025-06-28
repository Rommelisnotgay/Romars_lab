import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

// Import all grammar components
import PresentSimple from "@/components/grammar/PresentSimple";
import PresentContinuous from "@/components/grammar/PresentContinuous";
import PresentPerfect from "@/components/grammar/PresentPerfect";
import PastSimple from "@/components/grammar/PastSimple";
import PastContinuous from "@/components/grammar/PastContinuous";
import PastPerfect from "@/components/grammar/PastPerfect";
import PastPerfectContinuous from "@/components/grammar/PastPerfectContinuous";
import FutureSimple from "@/components/grammar/FutureSimple";
import FutureContinuous from "@/components/grammar/FutureContinuous";
import FuturePerfect from "@/components/grammar/FuturePerfect";
import ModalsDeduction from "@/components/grammar/ModalsDeduction";
import UsedToWould from "@/components/grammar/UsedToWould";
import CausativeVerbs from "@/components/grammar/CausativeVerbs";
import Quantifiers from "@/components/grammar/Quantifiers";
import RelativeClauses from "@/components/grammar/RelativeClauses";
import ReportedSpeech from "@/components/grammar/ReportedSpeech";
import AdjectivesAdverbs from "@/components/grammar/AdjectivesAdverbs";

const Grammar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const toggleSection = (ruleId: string) => {
    setOpenSections(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  // Define all grammar rules with their components
  const grammarRules = [
    // الأزمنة الأساسية - المضارع
    {
      id: "present-simple",
      title: "المضارع البسيط (Present Simple)",
      category: "الأزمنة الأساسية - المضارع",
      keywords: "present simple always usually often sometimes never every day",
      component: <PresentSimple />
    },
    {
      id: "present-continuous",
      title: "المضارع المستمر (Present Continuous)",
      category: "الأزمنة الأساسية - المضارع",
      keywords: "present continuous now right now at the moment currently ing",
      component: <PresentContinuous />
    },
    {
      id: "present-perfect",
      title: "المضارع التام (Present Perfect)",
      category: "الأزمنة الأساسية - المضارع",
      keywords: "present perfect have has for since yet just already ever never",
      component: <PresentPerfect />
    },
    
    // الأزمنة الأساسية - الماضي
    {
      id: "past-simple",
      title: "الماضي البسيط (Past Simple)",
      category: "الأزمنة الأساسية - الماضي",
      keywords: "yesterday last ago past simple",
      component: <PastSimple />
    },
    {
      id: "past-continuous",
      title: "الماضي المستمر (Past Continuous)",
      category: "الأزمنة الأساسية - الماضي",
      keywords: "past continuous while when was were ing",
      component: <PastContinuous />
    },
    {
      id: "past-perfect",
      title: "الماضي التام (Past Perfect)",
      category: "الأزمنة الأساسية - الماضي",
      keywords: "past perfect had after before by time",
      component: <PastPerfect />
    },
    {
      id: "past-perfect-continuous",
      title: "الماضي التام المستمر (Past Perfect Continuous)",
      category: "الأزمنة الأساسية - الماضي",
      keywords: "past perfect continuous had been ing for since",
      component: <PastPerfectContinuous />
    },

    // أزمنة المستقبل
    {
      id: "future-simple",
      title: "المستقبل البسيط (Future Simple)",
      category: "أزمنة المستقبل",
      keywords: "future will going to tomorrow next",
      component: <FutureSimple />
    },
    {
      id: "future-continuous",
      title: "المستقبل المستمر (Future Continuous)",
      category: "أزمنة المستقبل",
      keywords: "future continuous will be ing tomorrow next week",
      component: <FutureContinuous />
    },
    {
      id: "future-perfect",
      title: "المستقبل التام (Future Perfect)",
      category: "أزمنة المستقبل",
      keywords: "future perfect will have by next week",
      component: <FuturePerfect />
    },

    // الأفعال الناقصة
    {
      id: "modals-deduction",
      title: "الأفعال الناقصة للاستنتاج (Modals for Deduction)",
      category: "الأفعال الناقصة",
      keywords: "must have can't have might have could have deduction",
      component: <ModalsDeduction />
    },

    // العادات والتكرار
    {
      id: "used-to-would",
      title: "العادات في الماضي (Used to & Would)",
      category: "العادات والتكرار",
      keywords: "used to would habits past",
      component: <UsedToWould />
    },

    // القواعد المتقدمة
    {
      id: "causative-verbs",
      title: "الأفعال السببية (Causative Verbs)",
      category: "القواعد المتقدمة",
      keywords: "causative have get make let allow prevent",
      component: <CausativeVerbs />
    },
    {
      id: "relative-clauses",
      title: "عبارات الوصل (Relative Clauses)",
      category: "القواعد المتقدمة",
      keywords: "relative clauses who which that where when whose",
      component: <RelativeClauses />
    },
    {
      id: "reported-speech",
      title: "الكلام المنقول (Reported Speech)",
      category: "القواعد المتقدمة",
      keywords: "reported speech said told asked indirect speech",
      component: <ReportedSpeech />
    },

    // القواعد الأساسية
    {
      id: "quantifiers",
      title: "المحددات الكمية (Quantifiers)",
      category: "القواعد الأساسية",
      keywords: "quantifiers many much few little some any all",
      component: <Quantifiers />
    },
    {
      id: "adjectives-adverbs",
      title: "الصفات والأحوال (Adjectives & Adverbs)",
      category: "القواعد الأساسية",
      keywords: "adjectives adverbs comparative superlative too enough so such",
      component: <AdjectivesAdverbs />
    }
  ];

  const filteredRules = grammarRules.filter(rule =>
    rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.category.includes(searchTerm) ||
    rule.keywords.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group rules by category
  const groupedRules = filteredRules.reduce((acc, rule) => {
    const category = rule.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rule);
    return acc;
  }, {} as Record<string, typeof filteredRules>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              <Button variant="outline" size={isMobile ? "sm" : "default"}>← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 flex items-center justify-center gap-2">
                <Book className="w-6 h-6 sm:w-8 sm:h-8" />
                🧠 قسم القواعد - Grammar
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">جميع قواعد اللغة الإنجليزية مبسطة مع حيل ذكية</p>
            </div>
            <div className="w-20 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن قاعدة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-6">
          <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2">
            إجمالي القواعد: {grammarRules.length} قاعدة شاملة ومفصلة
          </Badge>
        </div>

        {/* Grammar Rules by Category */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {Object.entries(groupedRules).map(([category, rules]) => (
            <div key={category} className="space-y-3 sm:space-y-4">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4 rounded-lg">
                <h2 className="text-lg sm:text-xl font-bold text-center">{category}</h2>
                <p className="text-center text-blue-100 mt-1 text-xs sm:text-sm">
                  {rules.length} قاعدة
                </p>
              </div>

              {/* Rules in Category */}
              <div className="space-y-3 sm:space-y-4">
                {rules.map((rule) => (
                  <Collapsible 
                    key={rule.id}
                    open={openSections.includes(rule.id)}
                    onOpenChange={() => toggleSection(rule.id)}
                    className="rounded-lg overflow-hidden border border-blue-200 bg-white hover:shadow-md transition-shadow duration-300"
                  >
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-right">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg text-blue-700">
                              {rule.title}
                            </h3>
                          </div>
                            {openSections.includes(rule.id) ? (
                        <ChevronUp className="h-5 w-5 text-blue-500 shrink-0" />
                            ) : (
                        <ChevronDown className="h-5 w-5 text-blue-500 shrink-0" />
                            )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="rounded-md overflow-hidden">
                      {rule.component}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-md mt-10 sm:mt-12">
          <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 text-center">📚 نصائح لمذاكرة القواعد بفعالية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-2 sm:mb-3 text-blue-700">🎯 فهم الأساسيات:</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-900">
                <li>ركز على تركيب الزمن وليس فقط متى يستخدم</li>
                <li>تعلم الاستخدامات من خلال أمثلة واقعية</li>
                <li>اربط القواعد الجديدة بما تعرفه مسبقاً</li>
                <li>تدرب على تحويل الجمل من زمن لآخر</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-2 sm:mb-3 text-indigo-700">📝 المذاكرة العملية:</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-indigo-900">
                <li>حل تمارين متنوعة على كل قاعدة</li>
                <li>أنشئ جملك الخاصة باستخدام القاعدة</li>
                <li>اكتشف الأخطاء الشائعة وتجنبها</li>
                <li>أجرِ اختبارات قصيرة لنفسك بانتظام</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
