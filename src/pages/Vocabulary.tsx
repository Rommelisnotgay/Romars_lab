import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Bookmark, ArrowUp, Filter, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Vocabulary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [bookmarksDialogOpen, setBookmarksDialogOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load saved words from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedWords");
    if (saved) {
      setSavedWords(JSON.parse(saved));
    }
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save to localStorage whenever savedWords changes
  useEffect(() => {
    localStorage.setItem("savedWords", JSON.stringify(savedWords));
  }, [savedWords]);

  // Complete vocabulary data with all 200+ words from 12 units
  const vocabularyData = [
    // أشكال عامة 
    {
      word: "Induction",
      meaning: "إصدار/عدد",
      synonym: "version, edition",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "This is the first induction of the magazine.",
      exampleArabic: "هذا هو الإصدار الأول من المجلة",
      unit: "Unit 1"
    },
    {
      word: "Mislead",
      meaning: "يضلل",
      synonym: "confuse, deceive",
      antonym: "guide, lead",
      type: "Verb",
      forms: "mislead - misled - misled",
      example: "False news can mislead people easily.",
      exampleArabic: "الأخبار الكاذبة يمكن أن تضلل الناس بسهولة",
      unit: "Unit 1"
    },
    {
      word: "Bias",
      meaning: "تحيز",
      synonym: "prejudice, partiality",
      antonym: "objectivity, fairness",
      type: "Noun",
      adjective: "Biased (منحاز)",
      example: "The news report showed clear bias towards one political party.",
      exampleArabic: "التقرير الإخباري أظهر تحيزاً واضحاً لحزب سياسي واحد",
      unit: "Unit 1"
    },
    {
      word: "Casualties",
      meaning: "ضحايا/مصابين",
      synonym: "victims, injured",
      antonym: "survivors",
      type: "Noun",
      forms: "",
      example: "The accident resulted in many casualties.",
      exampleArabic: "الحادثة أسفرت عن ضحايا كثيرة",
      unit: "Unit 1"
    },
    {
      word: "Piracy",
      meaning: "القرصنة",
      synonym: "copying, theft",
      antonym: "originality",
      type: "Noun",
      adjective: "Pirated (مقرصن)",
      example: "Software piracy is a serious crime.",
      exampleArabic: "قرصنة البرمجيات جريمة خطيرة",
      unit: "Unit 1"
    },
    {
      word: "Make up",
      meaning: "يؤلف/يخترع",
      synonym: "invent, compose",
      antonym: "destroy",
      type: "Phrasal Verb",
      forms: "make up - made up - made up",
      example: "He likes to make up stories for children.",
      exampleArabic: "يحب أن يؤلف القصص للأطفال",
      unit: "Unit 1"
    },
    {
      word: "Traffic Jam",
      meaning: "ازدحام مروري",
      synonym: "traffic congestion",
      antonym: "clear road",
      type: "Noun",
      forms: "",
      example: "We were stuck in a traffic jam for an hour.",
      exampleArabic: "كنا عالقين في ازدحام مروري لمدة ساعة",
      unit: "Unit 1"
    },
    {
      word: "Highlight",
      meaning: "يوضح/يسلط الضوء على",
      synonym: "explain, emphasize",
      antonym: "ignore, overlook",
      type: "Verb",
      forms: "highlight - highlighted - highlighted",
      example: "The teacher highlighted the important points.",
      exampleArabic: "المعلم سلط الضوء على النقاط المهمة",
      unit: "Unit 1"
    },
    {
      word: "Cheat",
      meaning: "يغش",
      synonym: "deceive, trick",
      antonym: "be honest",
      type: "Verb",
      forms: "cheat - cheated - cheated",
      example: "It's wrong to cheat in exams.",
      exampleArabic: "من الخطأ الغش في الامتحانات",
      unit: "Unit 1"
    },
    {
      word: "Breathe",
      meaning: "يتنفس",
      synonym: "inhale, exhale",
      antonym: "suffocate",
      type: "Verb",
      forms: "breathe - breathed - breathed",
      example: "It's hard to breathe in polluted air.",
      exampleArabic: "من الصعب التنفس في الهواء الملوث",
      unit: "Unit 1"
    },
    {
      word: "Cautious",
      meaning: "حريص",
      synonym: "careful, alert",
      antonym: "careless, reckless",
      type: "Adjective",
      forms: "",
      example: "Be cautious when crossing the street.",
      exampleArabic: "كن حريصاً عند عبور الشارع",
      unit: "Unit 1"
    },
    {
      word: "Version",
      meaning: "نسخة/إصدار",
      synonym: "edition, release",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "This is the latest version of the software.",
      exampleArabic: "هذه هي أحدث نسخة من البرنامج",
      unit: "Unit 1"
    },
    {
      word: "Objective",
      meaning: "موضوعي",
      synonym: "unbiased, fair",
      antonym: "biased, subjective",
      type: "Adjective",
      forms: "",
      example: "We need an objective opinion on this matter.",
      exampleArabic: "نحتاج رأياً موضوعياً في هذا الأمر",
      unit: "Unit 1"
    },
    {
      word: "Make up for",
      meaning: "يعوض عن",
      synonym: "compensate",
      antonym: "",
      type: "Phrasal Verb",
      forms: "",
      example: "He worked extra hours to make up for lost time.",
      exampleArabic: "عمل ساعات إضافية ليعوض الوقت المفقود",
      unit: "Unit 1"
    },
    {
      word: "Make up to",
      meaning: "يحاول يصالح شخص",
      synonym: "apologize to",
      antonym: "",
      type: "Phrasal Verb",
      forms: "",
      example: "She tried to make up to her friend after the argument.",
      exampleArabic: "حاولت أن تصالح صديقتها بعد الشجار",
      unit: "Unit 1"
    },
    {
      word: "Due to",
      meaning: "بسبب",
      synonym: "because of, owing to",
      antonym: "",
      type: "Phrase",
      forms: "",
      example: "The match was cancelled due to bad weather.",
      exampleArabic: "أُلغيت المباراة بسبب سوء الطقس",
      unit: "Unit 1"
    },
    {
      word: "Raise a question",
      meaning: "يثير سؤال",
      synonym: "bring up a question",
      antonym: "",
      type: "Phrase",
      forms: "",
      example: "His behavior raises many questions.",
      exampleArabic: "سلوكه يثير تساؤلات كثيرة",
      unit: "Unit 1"
    },
    {
      word: "Encounter obstacles",
      meaning: "يواجه عقبات",
      synonym: "face challenges",
      antonym: "",
      type: "Phrase",
      forms: "",
      example: "Students encounter obstacles while learning.",
      exampleArabic: "الطلاب يواجهون عقبات أثناء التعلم",
      unit: "Unit 1"
    },

    // Unit 2 - Technology and Communication
    {
      word: "Hook",
      meaning: "خطاف لجذب الانتباه",
      synonym: "attention grabber",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The opening sentence was a great hook.",
      exampleArabic: "الجملة الافتتاحية كانت جاذبة للانتباه",
      unit: "Unit 2"
    },
    {
      word: "Occur",
      meaning: "يحدث",
      synonym: "happen, take place",
      antonym: "",
      type: "Verb",
      forms: "occur - occurred - occurred",
      example: "Accidents occur when people are careless.",
      exampleArabic: "الحوادث تحدث عندما يكون الناس مهملين",
      unit: "Unit 2"
    },
    {
      word: "Nosy",
      meaning: "فضولي",
      synonym: "curious, prying",
      antonym: "reserved, private",
      type: "Adjective",
      forms: "",
      example: "Don't be so nosy about other people's business.",
      exampleArabic: "لا تكن فضولياً في شؤون الآخرين",
      unit: "Unit 2"
    },
    {
      word: "Ruin",
      meaning: "يدمر",
      synonym: "destroy, damage",
      antonym: "build, create",
      type: "Verb",
      forms: "ruin - ruined - ruined",
      example: "The rain ruined our picnic.",
      exampleArabic: "المطر دمر رحلتنا",
      unit: "Unit 2"
    },
    {
      word: "Violate",
      meaning: "يخالف",
      synonym: "break, disobey",
      antonym: "obey, respect",
      type: "Verb",
      forms: "violate - violated - violated",
      example: "Don't violate the traffic rules.",
      exampleArabic: "لا تخالف قواعد المرور",
      unit: "Unit 2"
    },
    {
      word: "Achievement",
      meaning: "إنجاز",
      synonym: "accomplishment, success",
      antonym: "failure",
      type: "Noun",
      forms: "",
      example: "Graduating from university is a great achievement.",
      exampleArabic: "التخرج من الجامعة إنجاز عظيم",
      unit: "Unit 2"
    },
    {
      word: "Disability",
      meaning: "إعاقة",
      synonym: "handicap, impairment",
      antonym: "ability",
      type: "Noun",
      forms: "",
      example: "He overcame his disability to become successful.",
      exampleArabic: "تغلب على إعاقته ليصبح ناجحاً",
      unit: "Unit 2"
    },
    {
      word: "Responsibility",
      meaning: "مسؤولية",
      synonym: "duty, obligation",
      antonym: "irresponsibility",
      type: "Noun",
      forms: "",
      example: "It's your responsibility to take care of your family.",
      exampleArabic: "من مسؤوليتك الاهتمام بعائلتك",
      unit: "Unit 2"
    },
    {
      word: "Authentic",
      meaning: "أصلي",
      synonym: "genuine, real",
      antonym: "fake, counterfeit",
      type: "Adjective",
      forms: "",
      example: "This is an authentic ancient Egyptian artifact.",
      exampleArabic: "هذا قطعة أثرية مصرية قديمة أصلية",
      unit: "Unit 2"
    },
    {
      word: "Influence",
      meaning: "يؤثر/تأثير",
      synonym: "affect, impact",
      antonym: "",
      type: "Verb/Noun",
      forms: "influence - influenced - influenced",
      example: "Parents have a strong influence on their children.",
      exampleArabic: "للوالدين تأثير قوي على أطفالهم",
      unit: "Unit 2"
    },

    // Unit 3 - Media and Journalism
    {
      word: "Omission",
      meaning: "حذف/استبعاد",
      synonym: "exclusion, deletion",
      antonym: "inclusion",
      type: "Noun",
      forms: "",
      example: "The omission of important facts changed the story.",
      exampleArabic: "حذف الحقائق المهمة غير القصة",
      unit: "Unit 3"
    },
    {
      word: "Placement",
      meaning: "وضع",
      synonym: "position, location",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The placement of the news story affects its importance.",
      exampleArabic: "وضع الخبر يؤثر على أهميته",
      unit: "Unit 3"
    },
    {
      word: "Spin",
      meaning: "تحوير/تغيير الكلام",
      synonym: "twist, manipulate",
      antonym: "truth",
      type: "Noun/Verb",
      forms: "spin - spun - spun",
      example: "Politicians often put a spin on the facts.",
      exampleArabic: "السياسيون غالباً ما يحورون الحقائق",
      unit: "Unit 3"
    },
    {
      word: "Citizen Journalism",
      meaning: "صحافة المواطن",
      synonym: "public journalism",
      antonym: "professional journalism",
      type: "Noun",
      forms: "",
      example: "Citizen journalism has grown with social media.",
      exampleArabic: "صحافة المواطن نمت مع وسائل التواصل الاجتماعي",
      unit: "Unit 3"
    },
    {
      word: "Surface",
      meaning: "سطح",
      synonym: "top, exterior",
      antonym: "interior, depth",
      type: "Noun",
      forms: "",
      example: "The surface of the table is smooth.",
      exampleArabic: "سطح الطاولة أملس",
      unit: "Unit 3"
    },
    {
      word: "Surround",
      meaning: "يحيط",
      synonym: "encircle, encompass",
      antonym: "",
      type: "Verb",
      forms: "surround - surrounded - surrounded",
      adjective: "Surrounded (محاط), Surrounding (محيط)",
      example: "The house is surrounded by beautiful gardens.",
      exampleArabic: "البيت محاط بحدائق جميلة",
      unit: "Unit 3"
    },
    {
      word: "Point of view",
      meaning: "وجهة نظر",
      synonym: "opinion, perspective",
      antonym: "",
      type: "Noun Phrase",
      forms: "",
      example: "Everyone has their own point of view.",
      exampleArabic: "لكل شخص وجهة نظره الخاصة",
      unit: "Unit 3"
    },
    {
      word: "Subject to",
      meaning: "يخضع لـ",
      synonym: "dependent on",
      antonym: "independent of",
      type: "Adjective Phrase",
      forms: "",
      example: "This plan is subject to approval.",
      exampleArabic: "هذه الخطة تخضع للموافقة",
      unit: "Unit 3"
    },
    {
      word: "On a large scale",
      meaning: "على نطاق واسع",
      synonym: "extensively",
      antonym: "on a small scale",
      type: "Phrase",
      forms: "",
      example: "The company operates on a large scale.",
      exampleArabic: "الشركة تعمل على نطاق واسع",
      unit: "Unit 3"
    },
    {
      word: "On balance",
      meaning: "بالموازنة/بشكل مجمل",
      synonym: "in general, on the whole",
      antonym: "",
      type: "Phrase",
      forms: "",
      example: "On balance, the project was successful.",
      exampleArabic: "بشكل عام، كان المشروع ناجحاً",
      unit: "Unit 3"
    },

    // Unit 4 - Health and Technology
    {
      word: "Immersive",
      meaning: "يجعلك تشعر بالاندماج",
      synonym: "engaging, absorbing",
      antonym: "superficial",
      type: "Adjective",
      adjective: "Immersed (يشعر بالاندماج)",
      example: "Virtual reality provides an immersive experience.",
      exampleArabic: "الواقع الافتراضي يوفر تجربة تفاعلية",
      unit: "Unit 4"
    },
    {
      word: "Mass-produced",
      meaning: "منتج بكميات كبيرة",
      synonym: "manufactured in bulk",
      antonym: "handmade, custom-made",
      type: "Adjective",
      forms: "",
      example: "Mass-produced goods are usually cheaper.",
      exampleArabic: "البضائع المنتجة بكميات كبيرة عادة أرخص",
      unit: "Unit 4"
    },
    {
      word: "Implement",
      meaning: "ينفذ",
      synonym: "carry out, apply",
      antonym: "ignore, neglect",
      type: "Verb",
      forms: "implement - implemented - implemented",
      example: "The government will implement new policies.",
      exampleArabic: "ستنفذ الحكومة سياسات جديدة",
      unit: "Unit 4"
    },
    {
      word: "Approach",
      meaning: "يقترب من",
      synonym: "come near, method",
      antonym: "avoid, retreat",
      type: "Verb/Noun",
      forms: "approach - approached - approached",
      example: "We need a new approach to solve this problem.",
      exampleArabic: "نحتاج لطريقة جديدة لحل هذه المشكلة",
      unit: "Unit 4"
    },
    {
      word: "Keep in touch",
      meaning: "البقاء على تواصل",
      synonym: "stay connected",
      antonym: "lose contact",
      type: "Phrase",
      forms: "",
      example: "Let's keep in touch after graduation.",
      exampleArabic: "دعنا نبقى على تواصل بعد التخرج",
      unit: "Unit 4"
    },
    {
      word: "Scale",
      meaning: "نطاق",
      synonym: "scope, extent",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "This project is on a large scale.",
      exampleArabic: "هذا المشروع على نطاق واسع",
      unit: "Unit 4"
    },
    {
      word: "Virtual",
      meaning: "افتراضي",
      synonym: "simulated, digital",
      antonym: "real, physical",
      type: "Adjective",
      forms: "",
      example: "Virtual meetings became popular during COVID-19.",
      exampleArabic: "الاجتماعات الافتراضية أصبحت شائعة خلال كوفيد-19",
      unit: "Unit 4"
    },
    {
      word: "Reliable",
      meaning: "جدير بالثقة",
      synonym: "trustworthy, dependable",
      antonym: "unreliable",
      type: "Adjective",
      forms: "",
      example: "He is a reliable friend.",
      exampleArabic: "هو صديق جدير بالثقة",
      unit: "Unit 4"
    },
    {
      word: "Promote",
      meaning: "يروج/يزود",
      synonym: "encourage, advance",
      antonym: "discourage, demote",
      type: "Verb",
      forms: "promote - promoted - promoted",
      example: "Exercise promotes good health.",
      exampleArabic: "الرياضة تعزز الصحة الجيدة",
      unit: "Unit 4"
    },
    {
      word: "Subtle",
      meaning: "ملحوظ/طفيف",
      synonym: "slight, delicate",
      antonym: "obvious, blatant",
      type: "Adjective",
      forms: "",
      example: "There was a subtle change in his behavior.",
      exampleArabic: "كان هناك تغيير طفيف في سلوكه",
      unit: "Unit 4"
    },
    {
      word: "Sustain",
      meaning: "يدعم",
      synonym: "support, maintain",
      antonym: "abandon, neglect",
      type: "Verb",
      forms: "sustain - sustained - sustained",
      example: "We need to sustain our efforts.",
      exampleArabic: "نحتاج للحفاظ على جهودنا",
      unit: "Unit 4"
    },
    {
      word: "Headline",
      meaning: "عنوان رئيسي في جريدة",
      synonym: "title, header",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The newspaper headline was shocking.",
      exampleArabic: "عنوان الجريدة كان صادماً",
      unit: "Unit 4"
    },
    {
      word: "Vulnerable",
      meaning: "ضعيف/قابل للهزيمة",
      synonym: "weak, defenseless",
      antonym: "strong, protected",
      type: "Adjective",
      forms: "",
      example: "Children are vulnerable to diseases.",
      exampleArabic: "الأطفال عرضة للأمراض",
      unit: "Unit 4"
    },
    {
      word: "Adequate",
      meaning: "كافي",
      synonym: "sufficient, enough",
      antonym: "inadequate, insufficient",
      type: "Adjective",
      forms: "",
      example: "Make sure you get adequate sleep.",
      exampleArabic: "تأكد من حصولك على نوم كافٍ",
      unit: "Unit 4"
    },
    {
      word: "Attached",
      meaning: "مرفق",
      synonym: "enclosed, included",
      antonym: "detached, separate",
      type: "Adjective",
      forms: "attach - attached - attached",
      example: "Please find the attached documents.",
      exampleArabic: "يرجى العثور على الوثائق المرفقة",
      unit: "Unit 4"
    },
    {
      word: "Procedure",
      meaning: "إجراء",
      synonym: "process, method",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Follow the safety procedures carefully.",
      exampleArabic: "اتبع إجراءات السلامة بعناية",
      unit: "Unit 4"
    },
    {
      word: "Interrogate",
      meaning: "يستجوب",
      synonym: "question, examine",
      antonym: "",
      type: "Verb",
      forms: "interrogate - interrogated - interrogated",
      example: "The police will interrogate the suspect.",
      exampleArabic: "ستستجوب الشرطة المشتبه به",
      unit: "Unit 4"
    },
    {
      word: "Appreciate",
      meaning: "يقدر قيمة",
      synonym: "value, cherish",
      antonym: "undervalue, ignore",
      type: "Verb",
      forms: "appreciate - appreciated - appreciated",
      example: "I appreciate your help very much.",
      exampleArabic: "أقدر مساعدتك كثيراً",
      unit: "Unit 4"
    },

    // Unit 5 - Work and Career
    {
      word: "Suffer from",
      meaning: "يعاني من",
      synonym: "experience, endure",
      antonym: "enjoy, benefit from",
      type: "Phrasal Verb",
      forms: "",
      example: "Many people suffer from stress at work.",
      exampleArabic: "كثير من الناس يعانون من الضغط في العمل",
      unit: "Unit 5"
    },
    {
      word: "Burnout",
      meaning: "إرهاق تام",
      synonym: "exhaustion, tiredness",
      antonym: "energy, vitality",
      type: "Noun",
      forms: "",
      example: "Working too much can lead to burnout.",
      exampleArabic: "العمل الكثير يمكن أن يؤدي للإرهاق التام",
      unit: "Unit 5"
    },
    {
      word: "Effective",
      meaning: "فعال",
      synonym: "successful, efficient",
      antonym: "ineffective, useless",
      type: "Adjective",
      forms: "",
      example: "This medicine is very effective.",
      exampleArabic: "هذا الدواء فعال جداً",
      unit: "Unit 5"
    },
    {
      word: "Emerge",
      meaning: "يظهر",
      synonym: "appear, arise",
      antonym: "disappear, vanish",
      type: "Verb",
      forms: "emerge - emerged - emerged",
      example: "New technologies emerge every year.",
      exampleArabic: "تظهر تقنيات جديدة كل عام",
      unit: "Unit 5"
    },
    {
      word: "Instant",
      meaning: "فوري ولحظي",
      synonym: "immediate, quick",
      antonym: "delayed, slow",
      type: "Adjective",
      forms: "",
      example: "Instant messaging changed how we communicate.",
      exampleArabic: "الرسائل الفورية غيرت طريقة تواصلنا",
      unit: "Unit 5"
    },
    {
      word: "Independently",
      meaning: "بشكل مستقل",
      synonym: "autonomously, alone",
      antonym: "dependently",
      type: "Adverb",
      forms: "",
      example: "She works independently from home.",
      exampleArabic: "تعمل بشكل مستقل من المنزل",
      unit: "Unit 5"
    },
    {
      word: "Grateful to",
      meaning: "ممتن لـ",
      synonym: "thankful to, appreciative",
      antonym: "ungrateful",
      type: "Adjective",
      forms: "",
      example: "I'm grateful to my teacher for helping me.",
      exampleArabic: "أنا ممتن لمعلمي لمساعدتي",
      unit: "Unit 5"
    },
    {
      word: "Fake",
      meaning: "مزيف",
      synonym: "false, counterfeit",
      antonym: "real, genuine",
      type: "Adjective",
      forms: "",
      example: "Don't trust fake news on social media.",
      exampleArabic: "لا تثق بالأخبار المزيفة على وسائل التواصل",
      unit: "Unit 5"
    },
    {
      word: "Reduce",
      meaning: "يقلل",
      synonym: "decrease, lower",
      antonym: "increase, raise",
      type: "Verb",
      forms: "reduce - reduced - reduced",
      example: "We need to reduce pollution.",
      exampleArabic: "نحتاج لتقليل التلوث",
      unit: "Unit 5"
    },
    {
      word: "Control",
      meaning: "يسيطر على",
      synonym: "manage, regulate",
      antonym: "lose control",
      type: "Verb/Noun",
      forms: "control - controlled - controlled",
      example: "You need to control your emotions.",
      exampleArabic: "تحتاج للسيطرة على مشاعرك",
      unit: "Unit 5"
    },

    // Unit 6 - Heritage and Culture
    {
      word: "Heritage site",
      meaning: "موقع تراث",
      synonym: "historical site",
      antonym: "modern site",
      type: "Noun",
      forms: "",
      example: "The pyramids are a world heritage site.",
      exampleArabic: "الأهرامات موقع تراث عالمي",
      unit: "Unit 6"
    },
    {
      word: "Archaeology",
      meaning: "علم الآثار",
      synonym: "study of antiquities",
      antonym: "",
      type: "Noun",
      adjective: "Archaeological (أثري)",
      example: "Archaeology helps us understand ancient civilizations.",
      exampleArabic: "علم الآثار يساعدنا في فهم الحضارات القديمة",
      unit: "Unit 6"
    },
    {
      word: "Carve",
      meaning: "ينحت",
      synonym: "sculpt, cut",
      antonym: "",
      type: "Verb",
      forms: "carve - carved - carved",
      example: "Ancient Egyptians carved statues from stone.",
      exampleArabic: "المصريون القدماء نحتوا التماثيل من الحجر",
      unit: "Unit 6"
    },
    {
      word: "Artifact",
      meaning: "تحف/مصنوعات يدوية",
      synonym: "relic, antique",
      antonym: "modern object",
      type: "Noun",
      forms: "",
      example: "The museum displays ancient artifacts.",
      exampleArabic: "المتحف يعرض القطع الأثرية القديمة",
      unit: "Unit 6"
    },
    {
      word: "Sacred",
      meaning: "مقدس",
      synonym: "holy, divine",
      antonym: "profane, secular",
      type: "Adjective",
      forms: "",
      example: "This temple is sacred to the local people.",
      exampleArabic: "هذا المعبد مقدس لدى السكان المحليين",
      unit: "Unit 6"
    },
    {
      word: "Preserve",
      meaning: "يحفظ",
      synonym: "conserve, protect",
      antonym: "destroy, damage",
      type: "Verb",
      forms: "preserve - preserved - preserved",
      example: "We must preserve our cultural heritage.",
      exampleArabic: "يجب أن نحافظ على تراثنا الثقافي",
      unit: "Unit 6"
    },
    {
      word: "Decipher",
      meaning: "يفك شفرة",
      synonym: "decode, interpret",
      antonym: "encode, encrypt",
      type: "Verb",
      forms: "decipher - deciphered - deciphered",
      example: "Scientists deciphered the ancient hieroglyphs.",
      exampleArabic: "العلماء فكوا شفرة الهيروغليفية القديمة",
      unit: "Unit 6"
    },
    {
      word: "Bilingual",
      meaning: "ثنائي اللغة",
      synonym: "speaking two languages",
      antonym: "monolingual",
      type: "Adjective",
      forms: "",
      example: "Being bilingual is a great advantage.",
      exampleArabic: "كونك ثنائي اللغة ميزة عظيمة",
      unit: "Unit 6"
    },
    {
      word: "Embrace",
      meaning: "يحتضن/يعتنق",
      synonym: "hug, adopt",
      antonym: "reject, abandon",
      type: "Verb",
      forms: "embrace - embraced - embraced",
      example: "We should embrace new technologies.",
      exampleArabic: "يجب أن نتبنى التقنيات الجديدة",
      unit: "Unit 6"
    },
    {
      word: "Widespread",
      meaning: "واسع الانتشار",
      synonym: "common, prevalent",
      antonym: "rare, limited",
      type: "Adjective",
      forms: "",
      example: "The use of smartphones is widespread.",
      exampleArabic: "استخدام الهواتف الذكية واسع الانتشار",
      unit: "Unit 6"
    },

    // Unit 7 - Health and Medicine
    {
      word: "Surgery",
      meaning: "عملية جراحية",
      synonym: "operation",
      antonym: "",
      type: "Noun",
      forms: "",
      adjective: "Surgical (جراحي)",
      example: "The patient needs heart surgery.",
      exampleArabic: "المريض يحتاج لعملية جراحية في القلب",
      unit: "Unit 7"
    },
    {
      word: "Surgeon",
      meaning: "جراح",
      synonym: "doctor",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The surgeon performed a successful operation.",
      exampleArabic: "الجراح أجرى عملية ناجحة",
      unit: "Unit 7"
    },
    {
      word: "Treatment",
      meaning: "علاج",
      synonym: "therapy, cure",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The new treatment is very effective.",
      exampleArabic: "العلاج الجديد فعال جداً",
      unit: "Unit 7"
    },
    {
      word: "Process",
      meaning: "عملية/يعالج",
      synonym: "procedure, method",
      antonym: "",
      type: "Noun/Verb",
      forms: "process - processed - processed",
      example: "The healing process takes time.",
      exampleArabic: "عملية الشفاء تحتاج وقت",
      unit: "Unit 7"
    },
    {
      word: "Security",
      meaning: "أمان",
      synonym: "safety, protection",
      antonym: "danger, insecurity",
      type: "Noun",
      adjective: "Secure (آمن)",
      example: "Hospital security is very important.",
      exampleArabic: "أمان المستشفى مهم جداً",
      unit: "Unit 7"
    },
    {
      word: "Sensor",
      meaning: "جهاز استشعار",
      synonym: "detector",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The sensor detects body temperature.",
      exampleArabic: "جهاز الاستشعار يكشف درجة حرارة الجسم",
      unit: "Unit 7"
    },
    {
      word: "Artificial Intelligence",
      meaning: "ذكاء اصطناعي",
      synonym: "AI, machine intelligence",
      antonym: "human intelligence",
      type: "Noun",
      forms: "",
      example: "AI helps doctors diagnose diseases.",
      exampleArabic: "الذكاء الاصطناعي يساعد الأطباء في تشخيص الأمراض",
      unit: "Unit 7"
    },
    {
      word: "Well-being",
      meaning: "الرفاهية",
      synonym: "welfare, health",
      antonym: "illness, suffering",
      type: "Noun",
      forms: "",
      example: "Exercise improves your well-being.",
      exampleArabic: "الرياضة تحسن رفاهيتك",
      unit: "Unit 7"
    },
    {
      word: "Psychological",
      meaning: "نفسي",
      synonym: "mental, emotional",
      antonym: "physical",
      type: "Adjective",
      forms: "",
      example: "He needs psychological support.",
      exampleArabic: "يحتاج لدعم نفسي",
      unit: "Unit 7"
    },
    {
      word: "Physical",
      meaning: "جسدي",
      synonym: "bodily, material",
      antonym: "mental, psychological",
      type: "Adjective",
      forms: "",
      example: "Physical exercise is important for health.",
      exampleArabic: "التمرين الجسدي مهم للصحة",
      unit: "Unit 7"
    },
    {
      word: "Global",
      meaning: "عالمي",
      synonym: "worldwide, international",
      antonym: "local, national",
      type: "Adjective",
      forms: "",
      example: "Climate change is a global problem.",
      exampleArabic: "تغير المناخ مشكلة عالمية",
      unit: "Unit 7"
    },
    {
      word: "Experience",
      meaning: "خبرة",
      synonym: "knowledge, skill",
      antonym: "inexperience",
      type: "Noun",
      forms: "",
      example: "She has ten years of teaching experience.",
      exampleArabic: "لديها عشر سنوات من خبرة التدريس",
      unit: "Unit 7"
    },
    {
      word: "Sulk",
      meaning: "يعبس/يتجهم",
      synonym: "pout, be moody",
      antonym: "smile, cheer up",
      type: "Verb",
      forms: "sulk - sulked - sulked",
      example: "Don't sulk when things don't go your way.",
      exampleArabic: "لا تعبس عندما لا تسير الأمور كما تريد",
      unit: "Unit 7"
    },
    {
      word: "Clogged",
      meaning: "مسدود",
      synonym: "blocked, obstructed",
      antonym: "clear, open",
      type: "Adjective",
      forms: "clog - clogged - clogged",
      example: "The sink is clogged with food waste.",
      exampleArabic: "الحوض مسدود ببقايا الطعام",
      unit: "Unit 7"
    },
    {
      word: "Headline",
      meaning: "عنوان رئيسي في جريدة",
      synonym: "title, header",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The newspaper headline was shocking.",
      exampleArabic: "عنوان الجريدة كان صادماً",
      unit: "Unit 7"
    },
    {
      word: "Vulnerable",
      meaning: "ضعيف/قابل للهزيمة",
      synonym: "weak, defenseless",
      antonym: "strong, protected",
      type: "Adjective",
      forms: "",
      example: "Children are vulnerable to diseases.",
      exampleArabic: "الأطفال عرضة للأمراض",
      unit: "Unit 7"
    },
    {
      word: "Adequate",
      meaning: "كافي",
      synonym: "sufficient, enough",
      antonym: "inadequate, insufficient",
      type: "Adjective",
      forms: "",
      example: "Make sure you get adequate sleep.",
      exampleArabic: "تأكد من حصولك على نوم كافٍ",
      unit: "Unit 7"
    },
    {
      word: "Attached",
      meaning: "مرفق",
      synonym: "enclosed, included",
      antonym: "detached, separate",
      type: "Adjective",
      forms: "attach - attached - attached",
      example: "Please find the attached documents.",
      exampleArabic: "يرجى العثور على الوثائق المرفقة",
      unit: "Unit 7"
    },
    {
      word: "Procedure",
      meaning: "إجراء",
      synonym: "process, method",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Follow the safety procedures carefully.",
      exampleArabic: "اتبع إجراءات السلامة بعناية",
      unit: "Unit 7"
    },
    {
      word: "Interrogate",
      meaning: "يستجوب",
      synonym: "question, examine",
      antonym: "",
      type: "Verb",
      forms: "interrogate - interrogated - interrogated",
      example: "The police will interrogate the suspect.",
      exampleArabic: "ستستجوب الشرطة المشتبه به",
      unit: "Unit 7"
    },
    {
      word: "Appreciate",
      meaning: "يقدر قيمة",
      synonym: "value, cherish",
      antonym: "undervalue, ignore",
      type: "Verb",
      forms: "appreciate - appreciated - appreciated",
      example: "I appreciate your help very much.",
      exampleArabic: "أقدر مساعدتك كثيراً",
      unit: "Unit 7"
    },

    // Unit 8 - Work and Career
    {
      word: "Flourish",
      meaning: "يزدهر",
      synonym: "thrive, prosper",
      antonym: "decline, wither",
      type: "Verb",
      forms: "flourish - flourished - flourished",
      example: "The business began to flourish after the new management.",
      exampleArabic: "العمل بدأ يزدهر بعد الإدارة الجديدة",
      unit: "Unit 8"
    },
    {
      word: "Procrastination",
      meaning: "التسويف",
      synonym: "delay, postponement",
      antonym: "promptness",
      type: "Noun",
      forms: "",
      adjective: "Procrastinating (مسوف)",
      example: "Procrastination is the enemy of success.",
      exampleArabic: "التسويف عدو النجاح",
      unit: "Unit 8"
    },
    {
      word: "Progress",
      meaning: "تقدم",
      synonym: "advancement, development",
      antonym: "regression, decline",
      type: "Noun/Verb",
      forms: "progress - progressed - progressed",
      example: "We made great progress this year.",
      exampleArabic: "حققنا تقدماً عظيماً هذا العام",
      unit: "Unit 8"
    },
    {
      word: "Assess",
      meaning: "يقيم",
      synonym: "evaluate, estimate",
      antonym: "",
      type: "Verb",
      forms: "assess - assessed - assessed",
      example: "The teacher will assess our performance.",
      exampleArabic: "المعلم سيقيم أداءنا",
      unit: "Unit 8"
    },
    {
      word: "Resume",
      meaning: "سيرة ذاتية",
      synonym: "CV, curriculum vitae",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Send your resume with the application.",
      exampleArabic: "أرسل سيرتك الذاتية مع التطبيق",
      unit: "Unit 8"
    },
    {
      word: "Hire",
      meaning: "يوظف",
      synonym: "employ, recruit",
      antonym: "fire, dismiss",
      type: "Verb",
      forms: "hire - hired - hired",
      example: "The company will hire 50 new employees.",
      exampleArabic: "الشركة ستوظف 50 موظف جديد",
      unit: "Unit 8"
    },
    {
      word: "Expertise",
      meaning: "خبرة متخصصة",
      synonym: "proficiency, skill",
      antonym: "inexperience",
      type: "Noun",
      forms: "",
      example: "She has expertise in computer programming.",
      exampleArabic: "لديها خبرة في برمجة الكمبيوتر",
      unit: "Unit 8"
    },
    {
      word: "Career shift",
      meaning: "تغيير مسار مهني",
      synonym: "career change",
      antonym: "career stability",
      type: "Noun Phrase",
      forms: "",
      example: "He made a career shift from teaching to business.",
      exampleArabic: "غير مساره المهني من التدريس للأعمال",
      unit: "Unit 8"
    },
    {
      word: "Skilled",
      meaning: "ماهر",
      synonym: "talented, expert",
      antonym: "unskilled, inexperienced",
      type: "Adjective",
      forms: "",
      example: "We need skilled workers for this project.",
      exampleArabic: "نحتاج عمال مهرة لهذا المشروع",
      unit: "Unit 8"
    },
    {
      word: "Motivation",
      meaning: "تحفيز",
      synonym: "drive, incentive",
      antonym: "discouragement",
      type: "Noun",
      forms: "",
      example: "Good salary is a strong motivation to work.",
      exampleArabic: "الراتب الجيد تحفيز قوي للعمل",
      unit: "Unit 8"
    },
    {
      word: "Lead to",
      meaning: "يؤدي إلى",
      synonym: "result in, cause",
      antonym: "",
      type: "Phrasal Verb",
      forms: "lead to - led to - led to",
      example: "Hard work leads to success.",
      exampleArabic: "العمل الشاق يؤدي للنجاح",
      unit: "Unit 8"
    },
    {
      word: "Decline",
      meaning: "ينخفض/يرفض",
      synonym: "decrease, refuse",
      antonym: "increase, accept",
      type: "Verb",
      forms: "decline - declined - declined",
      example: "Sales declined last month.",
      exampleArabic: "انخفضت المبيعات الشهر الماضي",
      unit: "Unit 8"
    },
    {
      word: "Raise",
      meaning: "يرفع/يربي/يجمع مال",
      synonym: "lift, bring up",
      antonym: "lower, drop",
      type: "Verb",
      forms: "raise - raised - raised",
      example: "They raised money for charity.",
      exampleArabic: "جمعوا مالاً للأعمال الخيرية",
      unit: "Unit 8"
    },
    {
      word: "Rise",
      meaning: "يرتفع/يزداد",
      synonym: "increase, go up",
      antonym: "fall, decrease",
      type: "Verb",
      forms: "rise - rose - risen",
      example: "Prices rise every year.",
      exampleArabic: "الأسعار ترتفع كل عام",
      unit: "Unit 8"
    },
    {
      word: "Increase",
      meaning: "يزداد",
      synonym: "grow, expand",
      antonym: "decrease, reduce",
      type: "Verb/Noun",
      forms: "increase - increased - increased",
      example: "The population will increase rapidly.",
      exampleArabic: "السكان سيزدادون بسرعة",
      unit: "Unit 8"
    },
    {
      word: "Mental",
      meaning: "ذهني",
      synonym: "intellectual, cognitive",
      antonym: "physical",
      type: "Adjective",
      forms: "",
      example: "Mental health is as important as physical health.",
      exampleArabic: "الصحة الذهنية مهمة مثل الصحة الجسدية",
      unit: "Unit 8"
    },

    // Unit 9 - Technology and Communication
    {
      word: "Online banking",
      meaning: "الخدمات المصرفية عبر الإنترنت",
      synonym: "internet banking",
      antonym: "traditional banking",
      type: "Noun Phrase",
      forms: "",
      example: "Online banking makes transactions easier.",
      exampleArabic: "الخدمات المصرفية الإلكترونية تسهل المعاملات",
      unit: "Unit 9"
    },
    {
      word: "Communicate with",
      meaning: "يتواصل مع",
      synonym: "talk with, interact with",
      antonym: "ignore",
      type: "Phrasal Verb",
      forms: "",
      example: "I communicate with my friends daily.",
      exampleArabic: "أتواصل مع أصدقائي يومياً",
      unit: "Unit 9"
    },
    {
      word: "Contact",
      meaning: "يتصل بـ",
      synonym: "call, reach",
      antonym: "avoid",
      type: "Verb/Noun",
      forms: "contact - contacted - contacted",
      example: "Please contact me if you need help.",
      exampleArabic: "اتصل بي إذا احتجت مساعدة",
      unit: "Unit 9"
    },
    {
      word: "Creativity",
      meaning: "إبداع",
      synonym: "innovation, originality",
      antonym: "conformity",
      type: "Noun",
      adjective: "Creative (مبدع)",
      example: "Art requires creativity and imagination.",
      exampleArabic: "الفن يتطلب إبداعاً وخيالاً",
      unit: "Unit 9"
    },
    {
      word: "Critical",
      meaning: "نقدي/ضروري",
      synonym: "essential, crucial",
      antonym: "unimportant",
      type: "Adjective",
      forms: "",
      example: "Critical thinking is important for problem solving.",
      exampleArabic: "التفكير النقدي مهم لحل المشاكل",
      unit: "Unit 9"
    },
    {
      word: "Access",
      meaning: "وصول/صلاحية",
      synonym: "entry, admission",
      antonym: "restriction",
      type: "Noun/Verb",
      forms: "access - accessed - accessed",
      example: "Students have access to the library.",
      exampleArabic: "الطلاب لديهم صلاحية دخول المكتبة",
      unit: "Unit 9"
    },
    {
      word: "Link",
      meaning: "رابط/يربط",
      synonym: "connection, bond",
      antonym: "separation",
      type: "Noun/Verb",
      forms: "link - linked - linked",
      example: "Click on this link to visit the website.",
      exampleArabic: "اضغط على هذا الرابط لزيارة الموقع",
      unit: "Unit 9"
    },
    {
      word: "Potential",
      meaning: "إمكانيات/محتمل",
      synonym: "possibility, capability",
      antonym: "impossibility",
      type: "Noun/Adjective",
      forms: "",
      example: "This student has great potential.",
      exampleArabic: "هذا الطالب لديه إمكانيات عظيمة",
      unit: "Unit 9"
    },
    {
      word: "Aware",
      meaning: "واعي",
      synonym: "conscious, informed",
      antonym: "unaware, ignorant",
      type: "Adjective",
      forms: "",
      example: "Be aware of the dangers around you.",
      exampleArabic: "كن واعياً للأخطار من حولك",
      unit: "Unit 9"
    },
    {
      word: "Handle",
      meaning: "يتعامل مع",
      synonym: "manage, deal with",
      antonym: "neglect",
      type: "Verb",
      forms: "handle - handled - handled",
      example: "She can handle difficult situations well.",
      exampleArabic: "تستطيع التعامل مع المواقف الصعبة بشكل جيد",
      unit: "Unit 9"
    },
    {
      word: "Hold",
      meaning: "يستوعب/يقيم/يمسك",
      synonym: "contain, organize",
      antonym: "release, drop",
      type: "Verb",
      forms: "hold - held - held",
      example: "The stadium can hold 50,000 people.",
      exampleArabic: "الملعب يستوعب 50,000 شخص",
      unit: "Unit 9"
    },
    {
      word: "Acknowledge",
      meaning: "يعترف بـ",
      synonym: "admit, recognize",
      antonym: "deny, ignore",
      type: "Verb",
      forms: "acknowledge - acknowledged - acknowledged",
      example: "He acknowledged his mistake.",
      exampleArabic: "اعترف بخطئه",
      unit: "Unit 9"
    },
    {
      word: "Argument",
      meaning: "حجة/جدال",
      synonym: "debate, dispute",
      antonym: "agreement",
      type: "Noun",
      forms: "",
      example: "They had a heated argument.",
      exampleArabic: "دخلوا في جدال حامي",
      unit: "Unit 9"
    },
    {
      word: "Necessarily",
      meaning: "بالضرورة",
      synonym: "inevitably, definitely",
      antonym: "optionally",
      type: "Adverb",
      forms: "",
      example: "Success doesn't necessarily mean happiness.",
      exampleArabic: "النجاح لا يعني بالضرورة السعادة",
      unit: "Unit 9"
    },
    {
      word: "Pointless",
      meaning: "بلا جدوى",
      synonym: "futile, useless",
      antonym: "meaningful, useful",
      type: "Adjective",
      forms: "",
      example: "It's pointless to argue with him.",
      exampleArabic: "من العبث الجدال معه",
      unit: "Unit 9"
    },
    {
      word: "Fruitful",
      meaning: "مثمر",
      synonym: "productive, beneficial",
      antonym: "fruitless, useless",
      type: "Adjective",
      forms: "",
      example: "The meeting was very fruitful.",
      exampleArabic: "الاجتماع كان مثمراً جداً",
      unit: "Unit 9"
    },
    {
      word: "Massive",
      meaning: "ضخم",
      synonym: "huge, enormous",
      antonym: "tiny, small",
      type: "Adjective",
      forms: "",
      example: "The earthquake caused massive damage.",
      exampleArabic: "الزلزال تسبب في أضرار ضخمة",
      unit: "Unit 9"
    },
    {
      word: "Absolute",
      meaning: "مطلق",
      synonym: "complete, total",
      antonym: "partial, relative",
      type: "Adjective",
      forms: "",
      example: "There was absolute silence in the room.",
      exampleArabic: "كان هناك صمت مطلق في الغرفة",
      unit: "Unit 9"
    },
    {
      word: "Warning",
      meaning: "تحذير",
      synonym: "alert, caution",
      antonym: "encouragement",
      type: "Noun",
      forms: "",
      example: "The weather warning came too late.",
      exampleArabic: "جاء تحذير الطقس متأخراً جداً",
      unit: "Unit 9"
    },
    {
      word: "Ignored",
      meaning: "تجاهل",
      synonym: "disregarded, overlooked",
      antonym: "noticed, acknowledged",
      type: "Verb",
      forms: "ignore - ignored - ignored",
      example: "He ignored my advice completely.",
      exampleArabic: "تجاهل نصيحتي تماماً",
      unit: "Unit 9"
    },

    // Unit 10 - Sports and Events
    {
      word: "Paralympics",
      meaning: "الأولمبياد لذوي الاحتياجات الخاصة",
      synonym: "Paralympic Games",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The Paralympics inspire millions worldwide.",
      exampleArabic: "الأولمبياد الخاص يلهم الملايين حول العالم",
      unit: "Unit 10"
    },
    {
      word: "Facilities",
      meaning: "مرافق/تسهيلات",
      synonym: "amenities, services",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The hotel has excellent facilities.",
      exampleArabic: "الفندق له مرافق ممتازة",
      unit: "Unit 10"
    },
    {
      word: "Ceremony",
      meaning: "مراسم/احتفال",
      synonym: "celebration, ritual",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The opening ceremony was spectacular.",
      exampleArabic: "حفل الافتتاح كان رائعاً",
      unit: "Unit 10"
    },
    {
      word: "Category",
      meaning: "فئة",
      synonym: "class, group",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Athletes compete in different categories.",
      exampleArabic: "الرياضيون يتنافسون في فئات مختلفة",
      unit: "Unit 10"
    },
    {
      word: "Audience",
      meaning: "جمهور",
      synonym: "spectators, viewers",
      antonym: "performers",
      type: "Noun",
      forms: "",
      example: "The audience cheered for their team.",
      exampleArabic: "الجمهور شجع فريقهم",
      unit: "Unit 10"
    },
    {
      word: "Prediction",
      meaning: "تنبؤ",
      synonym: "forecast, expectation",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "His prediction about the match was correct.",
      exampleArabic: "توقعه حول المباراة كان صحيحاً",
      unit: "Unit 10"
    },
    {
      word: "Combine",
      meaning: "يجمع/يدمج",
      synonym: "mix, merge",
      antonym: "separate, divide",
      type: "Verb",
      forms: "combine - combined - combined",
      example: "We need to combine effort and talent.",
      exampleArabic: "نحتاج لدمج الجهد والموهبة",
      unit: "Unit 10"
    },
    {
      word: "Impress",
      meaning: "يبهر",
      synonym: "amaze, astound",
      antonym: "disappoint",
      type: "Verb",
      forms: "impress - impressed - impressed",
      adjective: "Impressive (مبهر), Impressed (منبهر)",
      example: "The athlete's performance impressed everyone.",
      exampleArabic: "أداء الرياضي أبهر الجميع",
      unit: "Unit 10"
    },
    {
      word: "Inspiration",
      meaning: "إلهام",
      synonym: "motivation, encouragement",
      antonym: "discouragement",
      type: "Noun",
      forms: "",
      example: "She is an inspiration to young athletes.",
      exampleArabic: "هي مصدر إلهام للرياضيين الشباب",
      unit: "Unit 10"
    },
    {
      word: "Passionate",
      meaning: "شغوف",
      synonym: "enthusiastic, devoted",
      antonym: "indifferent, apathetic",
      type: "Adjective",
      forms: "",
      example: "He is passionate about football.",
      exampleArabic: "هو شغوف بكرة القدم",
      unit: "Unit 10"
    },
    {
      word: "Permanently",
      meaning: "بشكل دائم",
      synonym: "forever, indefinitely",
      antonym: "temporarily",
      type: "Adverb",
      forms: "",
      example: "The building was permanently closed.",
      exampleArabic: "المبنى أُغلق بشكل دائم",
      unit: "Unit 10"
    },
    {
      word: "Poliomyelitis (Polio)",
      meaning: "شلل الأطفال",
      synonym: "infantile paralysis",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Polio vaccines have saved millions of lives.",
      exampleArabic: "لقاحات شلل الأطفال أنقذت ملايين الأرواح",
      unit: "Unit 10"
    },
    {
      word: "Fluency",
      meaning: "طلاقة",
      synonym: "proficiency, smoothness",
      antonym: "hesitation",
      type: "Noun",
      adjective: "Fluent (فصيح)",
      example: "Her fluency in English is impressive.",
      exampleArabic: "طلاقتها في الإنجليزية مبهرة",
      unit: "Unit 10"
    },
    {
      word: "Stressed",
      meaning: "يشعر بالتوتر",
      synonym: "anxious, worried",
      antonym: "relaxed, calm",
      type: "Adjective",
      forms: "",
      example: "She felt stressed before the exam.",
      exampleArabic: "شعرت بالتوتر قبل الامتحان",
      unit: "Unit 10"
    },
    {
      word: "Impact",
      meaning: "تأثير",
      synonym: "influence, effect",
      antonym: "",
      type: "Noun/Verb",
      forms: "impact - impacted - impacted",
      example: "Technology has a huge impact on our lives.",
      exampleArabic: "للتكنولوجيا تأثير كبير على حياتنا",
      unit: "Unit 10"
    },

    // Unit 11 - Heritage and Culture  
    {
      word: "Dig up",
      meaning: "يحفر لاستخراج",
      synonym: "excavate, uncover",
      antonym: "bury, cover",
      type: "Phrasal Verb",
      forms: "dig up - dug up - dug up",
      example: "Archaeologists dig up ancient artifacts.",
      exampleArabic: "علماء الآثار يحفرون لاستخراج القطع الأثرية القديمة",
      unit: "Unit 11"
    },
    {
      word: "Bury",
      meaning: "يدفن",
      synonym: "inter, entomb",
      antonym: "unearth, dig up",
      type: "Verb",
      forms: "bury - buried - buried",
      example: "Ancient treasures were buried in the tomb.",
      exampleArabic: "الكنوز القديمة دُفنت في المقبرة",
      unit: "Unit 11"
    },
    {
      word: "Worth",
      meaning: "يستحق/قيمة",
      synonym: "value, merit",
      antonym: "worthless",
      type: "Adjective/Noun",
      forms: "",
      example: "This painting is worth millions.",
      exampleArabic: "هذه اللوحة تستحق ملايين",
      unit: "Unit 11"
    },
    {
      word: "Pillar",
      meaning: "عمود",
      synonym: "column, support",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The temple has beautiful stone pillars.",
      exampleArabic: "المعبد له أعمدة حجرية جميلة",
      unit: "Unit 11"
    },
    {
      word: "Reign",
      meaning: "فترة حكم",
      synonym: "rule, period of rule",
      antonym: "",
      type: "Noun/Verb",
      forms: "reign - reigned - reigned",
      example: "During the king's reign, the country prospered.",
      exampleArabic: "خلال حكم الملك، ازدهرت البلاد",
      unit: "Unit 11"
    },
    {
      word: "Captivate",
      meaning: "يأسر/يفتن",
      synonym: "fascinate, enchant",
      antonym: "bore, repel",
      type: "Verb",
      forms: "captivate - captivated - captivated",
      example: "The ancient stories captivate young minds.",
      exampleArabic: "القصص القديمة تأسر عقول الشباب",
      unit: "Unit 11"
    },
    {
      word: "Mausoleum",
      meaning: "ضريح",
      synonym: "tomb, monument",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The Taj Mahal is a famous mausoleum.",
      exampleArabic: "تاج محل ضريح مشهور",
      unit: "Unit 11"
    },
    {
      word: "Monolingual",
      meaning: "أحادي اللغة",
      synonym: "single-language",
      antonym: "bilingual, multilingual",
      type: "Adjective",
      forms: "",
      example: "Many people are monolingual speakers.",
      exampleArabic: "كثير من الناس متحدثون بلغة واحدة",
      unit: "Unit 11"
    },
    {
      word: "Multilingual",
      meaning: "متعدد اللغات",
      synonym: "polyglot",
      antonym: "monolingual",
      type: "Adjective",
      forms: "",
      example: "Switzerland is a multilingual country.",
      exampleArabic: "سويسرا دولة متعددة اللغات",
      unit: "Unit 11"
    },
    {
      word: "Deep-seated",
      meaning: "عميق/متأصل",
      synonym: "ingrained, rooted",
      antonym: "superficial",
      type: "Adjective",
      forms: "",
      example: "He has deep-seated beliefs about tradition.",
      exampleArabic: "لديه معتقدات متأصلة حول التقاليد",
      unit: "Unit 11"
    },
    {
      word: "Hand in",
      meaning: "يسلم",
      synonym: "submit, deliver",
      antonym: "withhold, keep",
      type: "Phrasal Verb",
      forms: "hand in - handed in - handed in",
      example: "Please hand in your assignment tomorrow.",
      exampleArabic: "يرجى تسليم واجبك غداً",
      unit: "Unit 11"
    },
    {
      word: "Hand out",
      meaning: "يوزع",
      synonym: "distribute, give out",
      antonym: "collect, gather",
      type: "Phrasal Verb",
      forms: "hand out - handed out - handed out",
      example: "The teacher handed out the test papers.",
      exampleArabic: "المعلم وزع أوراق الامتحان",
      unit: "Unit 11"
    },
    {
      word: "Clear-cut",
      meaning: "واضح",
      synonym: "obvious, definite",
      antonym: "ambiguous, unclear",
      type: "Adjective",
      forms: "",
      example: "The rules are clear-cut and easy to follow.",
      exampleArabic: "القواعد واضحة وسهلة الاتباع",
      unit: "Unit 11"
    },
    {
      word: "Well-known",
      meaning: "معروف",
      synonym: "famous, renowned",
      antonym: "unknown, obscure",
      type: "Adjective",
      forms: "",
      example: "Shakespeare is a well-known playwright.",
      exampleArabic: "شكسبير كاتب مسرحي معروف",
      unit: "Unit 11"
    },
    {
      word: "Balanced",
      meaning: "متوازن",
      synonym: "even, stable",
      antonym: "unbalanced, biased",
      type: "Adjective",
      forms: "",
      example: "A balanced diet is important for health.",
      exampleArabic: "النظام الغذائي المتوازن مهم للصحة",
      unit: "Unit 11"
    },
    {
      word: "Precious",
      meaning: "ثمين",
      synonym: "valuable, priceless",
      antonym: "worthless, cheap",
      type: "Adjective",
      forms: "",
      example: "Time is precious, don't waste it.",
      exampleArabic: "الوقت ثمين، لا تضيعه",
      unit: "Unit 11"
    },
    {
      word: "Extended",
      meaning: "ممتد",
      synonym: "prolonged, lengthy",
      antonym: "brief, short",
      type: "Adjective",
      forms: "extend - extended - extended",
      example: "The meeting took an extended period of time.",
      exampleArabic: "الاجتماع استغرق فترة زمنية ممتدة",
      unit: "Unit 11"
    },

    // Unit 12 - Society and Future
    {
      word: "Concentrate",
      meaning: "يركز",
      synonym: "focus, pay attention",
      antonym: "distract, scatter",
      type: "Verb",
      forms: "concentrate - concentrated - concentrated",
      example: "Students need to concentrate during exams.",
      exampleArabic: "الطلاب يحتاجون للتركيز أثناء الامتحانات",
      unit: "Unit 12"
    },
    {
      word: "Accent",
      meaning: "لهجة",
      synonym: "pronunciation, dialect",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "She speaks English with a British accent.",
      exampleArabic: "تتحدث الإنجليزية بلهجة بريطانية",
      unit: "Unit 12"
    },
    {
      word: "Nation",
      meaning: "أمة/شعب",
      synonym: "country, people",
      antonym: "",
      type: "Noun",
      adjective: "National (قومي)",
      example: "Egypt is a great nation with rich history.",
      exampleArabic: "مصر أمة عظيمة بتاريخ غني",
      unit: "Unit 12"
    },
    {
      word: "Initiative",
      meaning: "مبادرة",
      synonym: "proposal, plan",
      antonym: "passivity",
      type: "Noun",
      forms: "",
      example: "The government launched a new health initiative.",
      exampleArabic: "الحكومة أطلقت مبادرة صحية جديدة",
      unit: "Unit 12"
    },
    {
      word: "Adhere to",
      meaning: "يلتزم بـ",
      synonym: "stick to, follow",
      antonym: "abandon, ignore",
      type: "Phrasal Verb",
      forms: "",
      example: "We must adhere to the safety rules.",
      exampleArabic: "يجب أن نلتزم بقواعد السلامة",
      unit: "Unit 12"
    },
    {
      word: "Endangered",
      meaning: "مهدد بالانقراض",
      synonym: "threatened, at risk",
      antonym: "safe, protected",
      type: "Adjective",
      forms: "",
      example: "Many animals are endangered species.",
      exampleArabic: "كثير من الحيوانات أنواع مهددة بالانقراض",
      unit: "Unit 12"
    },
    {
      word: "Eloquent",
      meaning: "بليغ/فصيح",
      synonym: "articulate, fluent",
      antonym: "inarticulate",
      type: "Adjective",
      forms: "",
      example: "The speaker was very eloquent.",
      exampleArabic: "المتحدث كان بليغاً جداً",
      unit: "Unit 12"
    },
    {
      word: "Mixture",
      meaning: "خليط",
      synonym: "blend, combination",
      antonym: "separation",
      type: "Noun",
      forms: "",
      example: "The city is a mixture of old and new.",
      exampleArabic: "المدينة خليط من القديم والجديد",
      unit: "Unit 12"
    },
    {
      word: "Ancestors",
      meaning: "أجداد",
      synonym: "forefathers, predecessors",
      antonym: "descendants, grandchildren",
      type: "Noun",
      forms: "",
      example: "We should honor our ancestors.",
      exampleArabic: "يجب أن نكرم أجدادنا",
      unit: "Unit 12"
    },
    {
      word: "Majority",
      meaning: "أغلبية",
      synonym: "most, greater part",
      antonym: "minority",
      type: "Noun",
      forms: "",
      example: "The majority of students passed the exam.",
      exampleArabic: "أغلبية الطلاب نجحوا في الامتحان",
      unit: "Unit 12"
    },

    // Additional important words and phrases
    {
      word: "Pros and cons",
      meaning: "مميزات وعيوب",
      synonym: "advantages and disadvantages",
      antonym: "",
      type: "Phrase",
      forms: "",
      example: "Let's discuss the pros and cons of this plan.",
      exampleArabic: "دعنا نناقش مميزات وعيوب هذه الخطة",
      unit: "Unit 12"
    },
    {
      word: "Brainstorm",
      meaning: "عصف ذهني",
      synonym: "think creatively",
      antonym: "",
      type: "Verb/Noun",
      forms: "brainstorm - brainstormed - brainstormed",
      example: "Let's brainstorm some new ideas.",
      exampleArabic: "دعنا نقوم بعصف ذهني لأفكار جديدة",
      unit: "Unit 12"
    },
    {
      word: "Evidence",
      meaning: "دليل",
      synonym: "proof, testimony",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The police found evidence at the crime scene.",
      exampleArabic: "الشرطة وجدت دليلاً في مسرح الجريمة",
      unit: "Unit 12"
    },
    {
      word: "In advance",
      meaning: "مقدماً",
      synonym: "beforehand, earlier",
      antonym: "late, afterward",
      type: "Phrase",
      forms: "",
      example: "Please book your tickets in advance.",
      exampleArabic: "احجز تذاكرك مقدماً من فضلك",
      unit: "Unit 12"
    },
    {
      word: "Come up with",
      meaning: "يأتي بأفكار",
      synonym: "invent, devise",
      antonym: "",
      type: "Phrasal Verb",
      forms: "come up with - came up with - come up with",
      example: "We need to come up with a solution.",
      exampleArabic: "نحتاج أن نأتي بحل",
      unit: "Unit 12"
    },
    {
      word: "Grade",
      meaning: "درجة في امتحان/صف دراسي",
      synonym: "mark, score",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "I got a good grade in the math test.",
      exampleArabic: "حصلت على درجة جيدة في امتحان الرياضيات",
      unit: "Unit 12"
    },
    {
      word: "Degree",
      meaning: "شهادة جامعية",
      synonym: "diploma, qualification",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "She has a degree in computer science.",
      exampleArabic: "لديها شهادة في علوم الكمبيوتر",
      unit: "Unit 12"
    },
    {
      word: "Infectious",
      meaning: "معدي",
      synonym: "contagious, transmissible",
      antonym: "non-infectious",
      type: "Adjective",
      forms: "",
      example: "COVID-19 is a highly infectious disease.",
      exampleArabic: "كوفيد-19 مرض شديد العدوى",
      unit: "Unit 12"
    },
    {
      word: "Cumulative",
      meaning: "تراكمي",
      synonym: "accumulative, increasing",
      antonym: "individual, separate",
      type: "Adjective",
      forms: "",
      example: "The cumulative effect of pollution is serious.",
      exampleArabic: "التأثير التراكمي للتلوث خطير",
      unit: "Unit 12"
    },
    {
      word: "Counselor",
      meaning: "مستشار قانوني",
      synonym: "advisor, consultant",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "The school counselor helps students with problems.",
      exampleArabic: "مستشار المدرسة يساعد الطلاب في مشاكلهم",
      unit: "Unit 12"
    },
    {
      word: "Commuter",
      meaning: "متنقل يومياً",
      synonym: "daily traveler",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "Many commuters use the subway to get to work.",
      exampleArabic: "كثير من المتنقلين يستخدمون المترو للذهاب للعمل",
      unit: "Unit 12"
    },
    {
      word: "Human Resources",
      meaning: "الموارد البشرية",
      synonym: "Personnel, HR",
      antonym: "",
      type: "Noun",
      forms: "",
      example: "She works in the Human Resources department.",
      exampleArabic: "تعمل في قسم الموارد البشرية",
      unit: "Unit 12"
    },
    {
      word: "Dressed in",
      meaning: "يرتدي",
      synonym: "wearing, clothed in",
      antonym: "undressed",
      type: "Phrase",
      forms: "",
      example: "She was dressed in a beautiful blue dress.",
      exampleArabic: "كانت ترتدي فستاناً أزرق جميل",
      unit: "Unit 12"
    },
    {
      word: "Struggle",
      meaning: "يكافح",
      synonym: "fight, battle",
      antonym: "surrender, give up",
      type: "Verb/Noun",
      forms: "struggle - struggled - struggled",
      example: "Students struggle with difficult subjects.",
      exampleArabic: "الطلاب يكافحون مع المواد الصعبة",
      unit: "Unit 12"
    },
    {
      word: "Proof",
      meaning: "دليل/يثبت",
      synonym: "evidence, verify",
      antonym: "disproof, deny",
      type: "Noun/Verb",
      forms: "prove - proved - proven",
      example: "We need proof of your identity.",
      exampleArabic: "نحتاج دليلاً على هويتك",
      unit: "Unit 12"
    }
  ];

  const toggleSaveWord = (word: string) => {
    setSavedWords(prev => {
      const newSavedWords = prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word];
      
      // Show toast notification
      if (!prev.includes(word)) {
        toast({
          title: "تم حفظ الكلمة",
          description: `تم إضافة "${word}" إلى قائمة المراجعة الخاصة بك`,
          variant: "default",
        });
      }
      
      return newSavedWords;
    });
  };

  const clearAllBookmarks = () => {
    setSavedWords([]);
    setBookmarksDialogOpen(false);
    toast({
      title: "تم مسح جميع الكلمات المحفوظة",
      description: "تم إزالة جميع الكلمات من قائمة المراجعة الخاصة بك",
      variant: "destructive",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredWords = vocabularyData.filter(word => {
    // First apply search filter
    const matchesSearch = 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meaning.includes(searchTerm) ||
      word.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply saved filter if needed
    return showSavedOnly 
      ? matchesSearch && savedWords.includes(word.word)
      : matchesSearch;
  });

  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10", "Unit 11", "Unit 12"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100" dir="rtl">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700">
              <Button variant="outline">← العودة للرئيسية</Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold gradient-text flex items-center justify-center gap-2">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                📘 قسم الكلمات - Vocabulary
              </h1>
              <p className="text-sm md:text-lg text-gray-600">أهم 200+ كلمة في منهج 3 ثانوي - 12 وحدة كاملة</p>
            </div>
            <div>
              <Dialog open={bookmarksDialogOpen} onOpenChange={setBookmarksDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="relative"
                    onClick={() => setBookmarksDialogOpen(true)}
                  >
                    <Bookmark className={`w-5 h-5 ${savedWords.length > 0 ? 'text-purple-600 fill-purple-600' : ''}`} />
                    {savedWords.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                        {savedWords.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">قائمة الكلمات المحفوظة</DialogTitle>
                  </DialogHeader>
                  
                  {savedWords.length > 0 ? (
                    <>
                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <div className="space-y-2">
                          {vocabularyData
                            .filter(word => savedWords.includes(word.word))
                            .map((word, idx) => (
                              <div key={idx} className="flex justify-between items-center p-2 border-b">
                                <div>
                                  <div className="font-bold text-purple-700">{word.word}</div>
                                  <div className="text-sm text-gray-600">{word.meaning}</div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => toggleSaveWord(word.word)}
                                >
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))
                          }
                        </div>
                      </ScrollArea>
                      <DialogFooter className="sm:justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowSavedOnly(true);
                            setBookmarksDialogOpen(false);
                          }}
                        >
                          عرض المحفوظة فقط
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={clearAllBookmarks}
                        >
                          مسح الكل
                        </Button>
                      </DialogFooter>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="text-gray-400 mb-2">
                        <Bookmark className="w-16 h-16 mx-auto opacity-30" />
                      </div>
                      <p className="text-gray-500">لم تقم بحفظ أي كلمات بعد</p>
                      <p className="text-sm text-gray-400 mt-2">اضغط على زر الحفظ في أي كلمة لإضافتها إلى قائمة المراجعة</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث عن كلمة أو معنى..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button
              variant={showSavedOnly ? "default" : "outline"}
              size="icon"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={showSavedOnly ? "bg-purple-600 hover:bg-purple-700" : ""}
              title={showSavedOnly ? "عرض جميع الكلمات" : "عرض المحفوظة فقط"}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              إجمالي الكلمات: {vocabularyData.length}
            </Badge>
            {savedWords.length > 0 && (
              <Badge variant="default" className="text-lg px-4 py-2 bg-purple-600">
                المحفوظة للمراجعة: {savedWords.length}
              </Badge>
            )}
            {showSavedOnly && (
              <Button 
                variant="link" 
                onClick={() => setShowSavedOnly(false)} 
                className="text-purple-600 p-0 h-auto"
              >
                <X className="w-4 h-4 mr-1" />
                إلغاء التصفية
              </Button>
            )}
          </div>
        </div>

        {/* Tabs for Units */}
        <Tabs defaultValue="all" className="w-full">
          <div className="bg-white rounded-lg p-2 mb-6 shadow-sm overflow-x-auto">
            <TabsList className="grid min-w-max w-full grid-cols-7 lg:grid-cols-13 h-auto">
              <TabsTrigger value="all" className="text-sm">الكل</TabsTrigger>
              {units.map(unit => (
                <TabsTrigger key={unit} value={unit} className="text-sm">{unit}</TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWords.length > 0 ? (
                filteredWords.map((word, index) => (
                  <WordCard 
                    key={index} 
                    word={word} 
                    isSaved={savedWords.includes(word.word)}
                    onToggleSave={() => toggleSaveWord(word.word)}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-gray-500 text-lg">لا توجد كلمات تطابق بحثك</p>
                  {showSavedOnly && savedWords.length === 0 && (
                    <div className="mt-4">
                      <p className="text-gray-500">لم تقم بحفظ أي كلمات بعد</p>
                      <Button 
                        variant="link" 
                        onClick={() => setShowSavedOnly(false)} 
                        className="text-purple-600 mt-2"
                      >
                        عرض جميع الكلمات
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {units.map(unit => (
            <TabsContent key={unit} value={unit}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {vocabularyData
                  .filter(word => {
                    const matchesUnit = word.unit === unit;
                    return showSavedOnly 
                      ? matchesUnit && savedWords.includes(word.word)
                      : matchesUnit;
                  })
                  .map((word, index) => (
                    <WordCard 
                      key={index} 
                      word={word} 
                      isSaved={savedWords.includes(word.word)}
                      onToggleSave={() => toggleSaveWord(word.word)}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Study Tips */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 نصائح للحفظ الفعال</h3>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">🎯 طريقة المراجعة:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>راجع الكلمات المحفوظة يومياً</li>
                <li>اكتب الكلمة 5 مرات</li>
                <li>استخدم الكلمة في جملة من عندك</li>
                <li>راجع وحدة كاملة أسبوعياً</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🧠 حيل الذاكرة:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>اربط الكلمة بصورة ذهنية</li>
                <li>اخترع قصة قصيرة للكلمة</li>
                <li>اربط الكلمة بكلمة عربية تشبهها</li>
                <li>استخدم البطاقات التعليمية</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⏰ جدولة المراجعة:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>20 دقيقة يومياً أفضل من ساعتين أسبوعياً</li>
                <li>راجع الكلمات الصعبة أكثر</li>
                <li>اختبر نفسك بدون النظر للمعنى</li>
                <li>استخدم الكلمات في محادثات</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

interface WordCardProps {
  word: any;
  isSaved: boolean;
  onToggleSave: () => void;
}

const WordCard = ({ word, isSaved, onToggleSave }: WordCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-purple-700">{word.word}</CardTitle>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={onToggleSave}
            className={`${isSaved ? 'bg-purple-600 hover:bg-purple-700 bookmark-active' : ''}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </Button>
        </div>
        <Badge variant="secondary">{word.unit}</Badge>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <div>
          <span className="font-semibold text-gray-700">المعنى: </span>
          <span className="text-gray-800">{word.meaning}</span>
        </div>
        
        <div>
          <span className="font-semibold text-indigo-600">النوع: </span>
          <Badge variant="outline" className="bg-indigo-50">{word.type}</Badge>
        </div>

        {word.synonym && (
          <div>
            <span className="font-semibold text-blue-600">المرادف: </span>
            <span className="text-blue-700">{word.synonym}</span>
          </div>
        )}

        {word.antonym && (
          <div>
            <span className="font-semibold text-red-600">المضاد: </span>
            <span className="text-red-700">{word.antonym}</span>
          </div>
        )}

        {word.forms && (
          <div>
            <span className="font-semibold text-purple-600">التصريفات: </span>
            <span className="text-purple-700 text-sm">{word.forms}</span>
          </div>
        )}

        {word.adjective && (
          <div>
            <span className="font-semibold text-orange-600">صيغة الصفة: </span>
            <span className="text-orange-700">{word.adjective}</span>
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="font-semibold text-gray-700 mb-1">مثال:</div>
          <div className="text-sm text-gray-800 mb-2">{word.example}</div>
          <div className="text-sm text-gray-600 italic">{word.exampleArabic}</div>
        </div>
      </CardContent>
      {isSaved && (
        <CardFooter className="bg-purple-50 py-2 px-4 flex justify-end">
          <div className="flex items-center text-xs text-purple-700">
            <CheckCircle className="w-3 h-3 mr-1" /> تم الحفظ للمراجعة
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Vocabulary;
