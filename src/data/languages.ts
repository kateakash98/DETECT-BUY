import { LanguageOption } from '../types';

export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
];

export const UI_TRANSLATIONS: Record<string, {
  safeBadge: string;
  cautionBadge: string;
  riskyBadge: string;
  tagline: string;
  subheading: string;
  checkNow: string;
  claimsFound: string;
  beforeYouPay: string;
  fileComplaint: string;
}> = {
  en: {
    safeBadge: 'Strong Trust Evidence',
    cautionBadge: 'Verify Before Buying',
    riskyBadge: 'High Risk Warning',
    tagline: 'Detect Before You Buy.',
    subheading: "Don't trust every advertisement. Verify the product, check the seller and make an informed decision before purchasing.",
    checkNow: 'Start AI Detection',
    claimsFound: 'Advertising Claims Analyzed',
    beforeYouPay: 'Precautions Before You Pay',
    fileComplaint: 'Draft Official Complaint',
  },
  hi: {
    safeBadge: 'खरीदना सुरक्षित',
    cautionBadge: 'सावधान रहें',
    riskyBadge: 'उच्च जोखिम चेतावनी',
    tagline: 'खरीदने से पहले जाँचें।',
    subheading: 'हर विज्ञापन पर भरोसा न करें। उत्पाद की पुष्टि करें, विक्रेता की जाँच करें और खरीदने से पहले सोच-समझकर निर्णय लें।',
    checkNow: 'एआई जाँच शुरू करें',
    claimsFound: 'विश्लेषित विज्ञापन दावे',
    beforeYouPay: 'पैसे देने से पहले सावधानियाँ',
    fileComplaint: 'आधिकारिक शिकायत का मसौदा तैयार करें',
  },
  mr: {
    safeBadge: 'खरेदी करणे सुरक्षित',
    cautionBadge: 'सावधगिरी बाळगा',
    riskyBadge: 'उच्च जोखीम इशारा',
    tagline: 'खरेदी करण्यापूर्वी खात्री करा.',
    subheading: 'प्रत्येक जाहिरातीवर विश्वास ठेवू नका. उत्पादनाची पडताळणी करा, विक्रेत्याची तपासणी करा आणि खरेदी करण्यापूर्वी माहितीपूर्ण निर्णय घ्या.',
    checkNow: 'एआय तपासणी सुरू करा',
    claimsFound: 'तपासलेले जाहिरात दावे',
    beforeYouPay: 'पैसे भरण्यापूर्वी घ्यावयाची काळजी',
    fileComplaint: 'अधिकृत तक्रार मसुदा तयार करा',
  },
  gu: {
    safeBadge: 'ખરીદી કરવી સલામત',
    cautionBadge: 'સાવધાન રહો',
    riskyBadge: 'ઉચ્ચ જોખમ ચેતવણી',
    tagline: 'ખરીદતા પહેલા ચકાસો.',
    subheading: 'દરેક જાહેરાત પર વિશ્વાસ ન કરો. ઉત્પાદન ચકાસો, વિક્રેતાની તપાસ કરો અને ખરીદતા પહેલા જાણકાર નિર્ણય લો.',
    checkNow: 'AI તપાસ શરૂ કરો',
    claimsFound: 'ચકાસાયેલા દાવાઓ',
    beforeYouPay: 'ચૂકવણી કરતા પહેલા સાવચેતી',
    fileComplaint: 'સત્તાવાર ફરિયાદ તૈયાર કરો',
  },
  ta: {
    safeBadge: 'வாங்க பாதுகாப்பானது',
    cautionBadge: 'எச்சரிக்கையாக இருங்கள்',
    riskyBadge: 'அதிக ஆபத்து எச்சரிக்கை',
    tagline: 'வாங்குவதற்கு முன் சரிபார்க்கவும்.',
    subheading: 'ஒவ்வொரு விளம்பரத்தையும் நம்பாதீர்கள். தயாரிப்பை சரிபார்க்கவும், விற்பனையாளரைச் சரிபார்த்து வாங்குவதற்கு முன் தகவலறிந்த முடிவை எடுக்கவும்.',
    checkNow: 'AI சோதனையைத் தொடங்குங்கள்',
    claimsFound: 'ஆராயப்பட்ட விளம்பரக் கூற்றுகள்',
    beforeYouPay: 'பணம் செலுத்துவதற்கு முன் முன்னெச்சரிக்கைகள்',
    fileComplaint: 'அதிகாரப்பூர்வ புகார் வரைவை உருவாக்கவும்',
  },
  te: {
    safeBadge: 'కొనుగోలు సురక్షితం',
    cautionBadge: 'జాగ్రత్తగా ఉండండి',
    riskyBadge: 'అధిక ప్రమాద హెచ్చరిక',
    tagline: 'కొనేముందు సరిచూసుకోండి.',
    subheading: 'ప్రతి ప్రకటనను నమ్మకండి. ఉత్పత్తిని ధృవీకరించండి, విక్రేతను తనిఖీ చేయండి మరియు కొనుగోలు చేయడానికి ముందు సమాచారంతో కూడిన నిర్ణయం తీసుకోండి.',
    checkNow: 'AI విశ్లేషణ ప్రారంభించండి',
    claimsFound: 'విశ్లేషించబడిన ప్రకటన క్లెయిమ్‌లు',
    beforeYouPay: 'చెల్లించే ముందు తీసుకోవాల్సిన జాగ్రత్తలు',
    fileComplaint: 'అధికారిక ఫిర్యాదును సిద్ధం చేయండి',
  },
  bn: {
    safeBadge: 'কেনা নিরাপদ',
    cautionBadge: 'সতর্ক থাকুন',
    riskyBadge: 'উচ্চ ঝুঁকি সতর্কতা',
    tagline: 'কেনার আগে যাচাই করুন।',
    subheading: 'প্রতিটি বিজ্ঞাপন বিশ্বাস করবেন না। পণ্য যাচাই করুন, বিক্রেতা পরীক্ষা করুন এবং কেনার আগে সচেতন সিদ্ধান্ত নিন।',
    checkNow: 'AI যাচাই শুরু করুন',
    claimsFound: 'বিজ্ঞাপনের দাবি বিশ্লেষণ',
    beforeYouPay: 'অর্থ প্রদানের আগে সতর্কতা',
    fileComplaint: 'অফিসিয়াল অভিযোগ খসড়া করুন',
  },
};
