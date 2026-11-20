/**
 * Battery Fair — Shared Application Logic & Internationalization
 * ----------------------------------------------------------------
 * Handles: navbar scroll behaviour, hamburger menu,
 * language dropdown, active-link highlighting, and multi-language
 * translation (English, Hindi, Kannada) with localStorage persistence.
 */

'use strict';

const BatteryI18n = (() => {
  const STORAGE_KEY = 'batteryfair_lang';
  const DEFAULT_LANG = 'en';

  const LANG_NAMES = {
    'en': 'English',
    'kn': 'ಕನ್ನಡ',
    'hi': 'हिन्दी'
  };

  const TRANSLATIONS = {
    en: {
      // Navbar & Mobile Menu
      'nav.home': 'Home',
      'nav.find': 'Find Battery',
      'nav.sale': 'Sell / Exchange',
      'nav.calculator': 'Calculator',
      'nav.navigate': 'Navigate',
      'nav.language': 'Language',

      // Index Page
      'index.hero_badge': 'Serving Dealers Across India',
      'index.hero_title': 'India\'s First<br><span class="highlight-word">Fair</span> Battery Marketplace',
      'index.hero_subtitle': 'Compare prices from local dealers, store your warranty cards digitally, and get honest value for your old battery&nbsp;&mdash;&nbsp;all in one place.',
      'index.btn_customer': 'I\'m a Customer',
      'index.btn_dealer': 'I\'m a Dealer',
      'index.stat_dealers': 'Dealers listed',
      'index.stat_warranty': 'Warranty cards saved',
      'index.stat_savings': 'Saved on old batteries',
      'index.problems_title': 'Three problems every battery buyer faces',
      'index.how_title': 'How Battery Fair Works',
      'index.soon_title': 'We\'re just getting started',
      'index.cta_title': 'Ready to find your next battery?',
      'index.cta_subtitle': 'Join thousands of customers across India who already save time and money with Battery Fair.',
      'index.btn_find_battery': 'Find My Battery',
      'index.btn_check_value': 'Check Old Battery Value',

      // Finder Page
      'finder.hero_title': 'Find a Battery Dealer Near You',
      'finder.hero_subtitle': 'Search by city, area or pincode across India',
      'finder.search_placeholder': 'Try "Bengaluru", "Pune" or "560001"',
      'finder.btn_search': 'Search',
      'finder.btn_clear': 'Clear all filters',
      'finder.label_type': 'Battery Type',
      'finder.label_brand': 'Brand',
      'finder.btn_book_fitting': 'Book Fitting',
      'finder.modal_title': 'Book a Fitting',
      'finder.btn_confirm_booking': 'Confirm Booking',
      'finder.modal_success_title': 'Booking Confirmed!',

      // Calculator Page
      'calc.hero_title': 'Old Battery Price Calculator',
      'calc.hero_subtitle': 'Estimate fair scrap & exchange value for your used battery based on current dealer rates across India.',
      'calc.details_title': 'Battery Details',
      'calc.details_subtitle': 'Select your old battery specifications to calculate its estimated market value.',
      'calc.btn_find_dealer': 'Find a dealer to sell',
      'calc.breakdown_title': 'Valuation Breakdown',
      'calc.note_text': 'Rates are updated weekly by dealers and recyclers.',
      'calc.rates_table_title': 'Weekly Lead Scrap Benchmark Rates in India',

      // Sale Page
      'sale.hero_title': 'Dealer Portal',
      'sale.hero_subtitle': 'Register battery sales, issue digital warranty cards, and manage customer records.',
      'sale.login_title': 'Dealer Login',
      'sale.login_desc': 'Enter any 10-digit mobile number to access your dealer warranty vault.',
      'sale.btn_login': 'Login',
      'sale.btn_logout': 'Logout',
      'sale.reg_title': 'Register a Sale',
      'sale.btn_issue': 'Register Sale',
      'sale.preview_title': 'Warranty Card Preview',
      'sale.customers_title': 'My Customers'
    },
    hi: {
      // Navbar & Mobile Menu
      'nav.home': 'होम',
      'nav.find': 'बैटरी खोजें',
      'nav.sale': 'बेचें / बदलें',
      'nav.calculator': 'कैलकुलेटर',
      'nav.navigate': 'नेविगेट करें',
      'nav.language': 'भाषा',

      // Index Page
      'index.hero_badge': 'पूरे भारत में डीलरों की सेवा',
      'index.hero_title': 'भारत का पहला<br><span class="highlight-word">उचित</span> बैटरी मार्केटप्लेस',
      'index.hero_subtitle': 'स्थानीय डीलरों से कीमतों की तुलना करें, अपने वारंटी कार्ड डिजिटल रूप से सहेजें, और अपनी पुरानी बैटरी का उचित मूल्य पाएं — सब एक ही स्थान पर।',
      'index.btn_customer': 'मैं एक ग्राहक हूँ',
      'index.btn_dealer': 'मैं एक डीलर हूँ',
      'index.stat_dealers': 'सूचीबद्ध डीलर',
      'index.stat_warranty': 'वारंटी कार्ड सहेजे गए',
      'index.stat_savings': 'पुरानी बैटरियों पर बचत',
      'index.problems_title': 'हर बैटरी खरीदार के सामने आने वाली तीन समस्याएं',
      'index.how_title': 'बैटरी फेयर कैसे काम करता है',
      'index.soon_title': 'हम अभी शुरुआत कर रहे हैं',
      'index.cta_title': 'अपनी अगली बैटरी खोजने के लिए तैयार हैं?',
      'index.cta_subtitle': 'पूरे भारत के उन हजारों ग्राहकों में शामिल हों जो बैटरी फेयर के साथ समय और पैसा बचा रहे हैं।',
      'index.btn_find_battery': 'मेरी बैटरी खोजें',
      'index.btn_check_value': 'पुरानी बैटरी का मूल्य जांचें',

      // Finder Page
      'finder.hero_title': 'अपने नजदीकी बैटरी डीलर खोजें',
      'finder.hero_subtitle': 'पूरे भारत में शहर, क्षेत्र या पिनकोड के अनुसार खोजें',
      'finder.search_placeholder': '"बेंगलुरु", "पुणे", या "560001" आज़माएं',
      'finder.btn_search': 'खोजें',
      'finder.btn_clear': 'सभी फिल्टर हटाएं',
      'finder.label_type': 'बैटरी का प्रकार',
      'finder.label_brand': 'ब्रांड',
      'finder.btn_book_fitting': 'फिटिंग बुक करें',
      'finder.modal_title': 'फिटिंग बुक करें',
      'finder.btn_confirm_booking': 'बुकिंग की पुष्टि करें',
      'finder.modal_success_title': 'बुकिंग कन्फर्म हो गई!',

      // Calculator Page
      'calc.hero_title': 'पुरानी बैटरी मूल्य कैलकुलेटर',
      'calc.hero_subtitle': 'पूरे भारत में मौजूदा डीलर दरों के आधार पर अपनी प्रयुक्त बैटरी के उचित स्क्रैप और एक्सचेंज मूल्य का अनुमान लगाएं।',
      'calc.details_title': 'बैटरी का विवरण',
      'calc.details_subtitle': 'अपनी पुरानी बैटरी का अनुमानित बाजार मूल्य जानने के लिए उसके विनिर्देश चुनें।',
      'calc.btn_find_dealer': 'बेचने के लिए डीलर खोजें',
      'calc.breakdown_title': 'मूल्यांकन विवरण',
      'calc.note_text': 'दरें डीलरों और रिसाइकलरों द्वारा साप्ताहिक रूप से अपडेट की जाती हैं।',
      'calc.rates_table_title': 'भारत में साप्ताहिक लेड स्क्रैप बेंचमार्क दरें',

      // Sale Page
      'sale.hero_title': 'डीलर पोर्टल',
      'sale.hero_subtitle': 'बैटरी बिक्री दर्ज करें, डिजिटल वारंटी कार्ड जारी करें और ग्राहक रिकॉर्ड प्रबंधित करें।',
      'sale.login_title': 'डीलर लॉगिन',
      'sale.login_desc': 'अपने डीलर वारंटी वॉल्ट तक पहुँचने के लिए कोई भी 10 अंकों का मोबाइल नंबर दर्ज करें।',
      'sale.btn_login': 'लॉगिन',
      'sale.btn_logout': 'लॉग आउट',
      'sale.reg_title': 'बिक्री दर्ज करें',
      'sale.btn_issue': 'बिक्री दर्ज करें',
      'sale.preview_title': 'वारंटी कार्ड पूर्वावलोकन',
      'sale.customers_title': 'मेरे ग्राहक'
    },
    kn: {
      // Navbar & Mobile Menu
      'nav.home': 'ಮುಖಪುಟ',
      'nav.find': 'ಬ್ಯಾಟರಿ ಹುಡುಕಿ',
      'nav.sale': 'ಮಾರಾಟ / ವಿನಿಮಯ',
      'nav.calculator': 'ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      'nav.navigate': 'ನ್ಯಾವಿಗೇಟ್',
      'nav.language': 'ಭಾಷೆ',

      // Index Page
      'index.hero_badge': 'ಭಾರತದಾದ್ಯಂತ ಡೀಲರ್‌ಗಳಿಗೆ ಸೇವೆ',
      'index.hero_title': 'ಭಾರತದ ಮೊದಲ<br><span class="highlight-word">ನ್ಯಾಯಯುತ</span> ಬ್ಯಾಟರಿ ಮಾರುಕಟ್ಟೆ',
      'index.hero_subtitle': 'ಸ್ಥಳೀಯ ಡೀಲರ್‌ಗಳಿಂದ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ, ವಾರಂಟಿ ಕಾರ್ಡ್‌ಗಳನ್ನು ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲಿ ಉಳಿಸಿ ಮತ್ತು ಹಳೆಯ ಬ್ಯಾಟರಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ ಪಡೆಯಿರಿ — ಎಲ್ಲವೂ ಒಂದೇ ಕಡೆ.',
      'index.btn_customer': 'ನಾನು ಗ್ರಾಹಕ',
      'index.btn_dealer': 'ನಾನು ಡೀಲರ್',
      'index.stat_dealers': 'ನೋಂದಾಯಿತ ಡೀಲರ್‌ಗಳು',
      'index.stat_warranty': 'ವಾರಂಟಿ ಕಾರ್ಡ್‌ಗಳು ಉಳಿಸಲಾಗಿದೆ',
      'index.stat_savings': 'ಹಳೆಯ ಬ್ಯಾಟರಿಗಳಲ್ಲಿ ಉಳಿತಾಯ',
      'index.problems_title': 'ಪ್ರತಿಯೊಬ್ಬ ಬ್ಯಾಟರಿ ಖರೀದಿದಾರರು ಎದುರಿಸುವ ಮೂರು ಸಮಸ್ಯೆಗಳು',
      'index.how_title': 'ಬ್ಯಾಟರಿ ಫೇರ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
      'index.soon_title': 'ನಾವು ಇದೀಗ ಪ್ರಾರಂಭಿಸುತ್ತಿದ್ದೇವೆ',
      'index.cta_title': 'ನಿಮ್ಮ ಮುಂದಿನ ಬ್ಯಾಟರಿ ಹುಡುಕಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
      'index.cta_subtitle': 'ಬ್ಯಾಟರಿ ಫೇರ್ ಮೂಲಕ ಸಮಯ ಮತ್ತು ಹಣ ಉಳಿಸುತ್ತಿರುವ ಭಾರತದಾದ್ಯಂತದ ಸಾವಿರಾರು ಗ್ರಾಹಕರೊಂದಿಗೆ ಸೇರಿ.',
      'index.btn_find_battery': 'ನನ್ನ ಬ್ಯಾಟರಿ ಹುಡುಕಿ',
      'index.btn_check_value': 'ಹಳೆಯ ಬ್ಯಾಟರಿ ಮೌಲ್ಯ ಪರಿಶೀಲಿಸಿ',

      // Finder Page
      'finder.hero_title': 'ನಿಮ್ಮ ಹತ್ತಿರದ ಬ್ಯಾಟರಿ ಡೀಲರ್ ಹುಡುಕಿ',
      'finder.hero_subtitle': 'ಭಾರತದಾದ್ಯಂತ ನಗರ, ಪ್ರದೇಶ ಅಥವಾ ಪಿನ್‌ಕೋಡ್ ಮೂಲಕ ಹುಡುಕಿ',
      'finder.search_placeholder': '"ಬೆಂಗಳೂರು", "ಪುಣೆ", ಅಥವಾ "560001" ಪ್ರಯತ್ನಿಸಿ',
      'finder.btn_search': 'ಹುಡುಕಿ',
      'finder.btn_clear': 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
      'finder.label_type': 'ಬ್ಯಾಟರಿ ಪ್ರಕಾರ',
      'finder.label_brand': 'ಬ್ರಾಂಡ್',
      'finder.btn_book_fitting': 'ಫಿಟ್ಟಿಂಗ್ ಬುಕ್ ಮಾಡಿ',
      'finder.modal_title': 'ಫಿಟ್ಟಿಂಗ್ ಬುಕ್ ಮಾಡಿ',
      'finder.btn_confirm_booking': 'ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ',
      'finder.modal_success_title': 'ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ!',

      // Calculator Page
      'calc.hero_title': 'ಹಳೆಯ ಬ್ಯಾಟರಿ ಬೆಲೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      'calc.hero_subtitle': 'ಭಾರತದಾದ್ಯಂತ ಪ್ರಸ್ತುತ ಡೀಲರ್ ದರಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಹಳೆಯ ಬ್ಯಾಟರಿಯ ನ್ಯಾಯಯುತ ಸ್ಕ್ರ್ಯಾಪ್ ಮತ್ತು ವಿನಿಮಯ ಮೌಲ್ಯವನ್ನು ಲೆಕ್ಕಹಾಕಿ.',
      'calc.details_title': 'ಬ್ಯಾಟರಿ ವಿವರಗಳು',
      'calc.details_subtitle': 'ನಿಮ್ಮ ಹಳೆಯ ಬ್ಯಾಟರಿಯ ಅಂದಾಜು ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯವನ್ನು ಲೆಕ್ಕಹಾಕಲು ವಿವರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      'calc.btn_find_dealer': 'ಮಾರಾಟ ಮಾಡಲು ಡೀಲರ್ ಹುಡುಕಿ',
      'calc.breakdown_title': 'ಮೌಲ್ಯಮಾಪನ ವಿವರ',
      'calc.note_text': 'ದರಗಳನ್ನು ಡೀಲರ್‌ಗಳು ಮತ್ತು ಮರುಬಳಕೆದಾರರು ವಾರಕ್ಕೊಮ್ಮೆ ನವೀಕರಿಸುತ್ತಾರೆ.',
      'calc.rates_table_title': 'ಭಾರತದಲ್ಲಿ ಸಾಪ್ತಾಹಿಕ ಸೀಸದ ಸ್ಕ್ರ್ಯಾಪ್ ಬೆಂಚ್‌ಮಾರ್ಕ್ ದರಗಳು',

      // Sale Page
      'sale.hero_title': 'ಡೀಲರ್ ಪೋರ್ಟಲ್',
      'sale.hero_subtitle': 'ಬ್ಯಾಟರಿ ಮಾರಾಟವನ್ನು ನೋಂದಾಯಿಸಿ, ಡಿಜಿಟಲ್ ವಾರಂಟಿ ಕಾರ್ಡ್ ನೀಡಿ ಮತ್ತು ಗ್ರಾಹಕರ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      'sale.login_title': 'ಡೀಲರ್ ಲಾಗಿನ್',
      'sale.login_desc': 'ನಿಮ್ಮ ಡೀಲರ್ ವಾರಂಟಿ ವಾಲ್ಟ್ ಪ್ರವೇಶಿಸಲು ಯಾವುದೇ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
      'sale.btn_login': 'ಲಾಗಿನ್',
      'sale.btn_logout': 'ಲಾಗ್ ಔಟ್',
      'sale.reg_title': 'ಮಾರಾಟವನ್ನು ನೋಂದಾಯಿಸಿ',
      'sale.btn_issue': 'ಮಾರಾಟ ನೋಂದಾಯಿಸಿ',
      'sale.preview_title': 'ವಾರಂಟಿ ಕಾರ್ಡ್ ಮುನ್ನೋಟ',
      'sale.customers_title': 'ನನ್ನ ಗ್ರಾಹಕರು'
    }
  };

  const SELECTOR_MAP = {
    '.navbar__links a[data-page="index.html"]': 'nav.home',
    '.navbar__links a[data-page="finder.html"]': 'nav.find',
    '.navbar__links a[data-page="sale.html"]': 'nav.sale',
    '.navbar__links a[data-page="calculator.html"]': 'nav.calculator',

    '.mobile-menu a[data-page="index.html"]': 'nav.home',
    '.mobile-menu a[data-page="finder.html"]': 'nav.find',
    '.mobile-menu a[data-page="sale.html"]': 'nav.sale',
    '.mobile-menu a[data-page="calculator.html"]': 'nav.calculator',

    '.mobile-menu__label:nth-of-type(1)': 'nav.navigate',
    '.mobile-menu__label:nth-of-type(2)': 'nav.language'
  };

  function getStoredLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return DEFAULT_LANG;
  }

  function saveStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
  }

  function updateElement(el, translation) {
    if (!el || !translation) return;

    // Check if element contains an SVG child (button or link icon)
    const hasSvg = el.querySelector('svg');
    if (hasSvg) {
      let textUpdated = false;
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
          node.textContent = ' ' + translation.trim() + ' ';
          textUpdated = true;
          break;
        }
      }
      if (!textUpdated) {
        const innerSpan = el.querySelector('[data-i18n-inner], .i18n-text');
        if (innerSpan) innerSpan.innerHTML = translation;
      }
    } else {
      if (translation.includes('<')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    }
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = DEFAULT_LANG;
    saveStoredLang(lang);

    // Update document lang attribute
    document.documentElement.lang = lang;

    // Update toggle text
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      const labelEl = langToggle.querySelector('.lang-dropdown__label');
      if (labelEl) labelEl.textContent = LANG_NAMES[lang] || 'English';
    }

    // Update active dropdown items
    const langMenu = document.getElementById('lang-menu');
    if (langMenu) {
      langMenu.querySelectorAll('.lang-dropdown__item').forEach(item => {
        item.classList.toggle('lang-dropdown__item--active', item.dataset.lang === lang);
      });
    }

    // Update active mobile menu items
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('[data-lang]').forEach(item => {
        item.classList.toggle('mobile-menu__link--active', item.dataset.lang === lang);
      });
    }

    // Apply translations to data-i18n elements
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        updateElement(el, dict[key]);
      }
    });

    // Apply placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Apply SELECTOR_MAP
    Object.entries(SELECTOR_MAP).forEach(([selector, key]) => {
      if (dict[key]) {
        document.querySelectorAll(selector).forEach(el => {
          updateElement(el, dict[key]);
        });
      }
    });

    // Dispatch custom event for page-level dynamic re-renders if needed
    window.dispatchEvent(new CustomEvent('batteryfair:languagechange', { detail: { lang } }));
  }

  return {
    setLanguage,
    getLanguage: getStoredLang,
    TRANSLATIONS,
    LANG_NAMES
  };
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     Active Link Highlighting
     ============================== */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add(
        link.closest('.mobile-menu')
          ? 'mobile-menu__link--active'
          : 'navbar__link--active'
      );
    }
  });


  /* ==============================
     Hamburger Menu
     ============================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a navigation link is tapped
    mobileMenu.querySelectorAll('a[data-page]').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  /* ==============================
     Language Switcher (Desktop & Mobile)
     ============================== */
  const langToggle = document.getElementById('lang-toggle');
  const langMenu   = document.getElementById('lang-menu');

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });

    // Choose language in dropdown
    langMenu.querySelectorAll('.lang-dropdown__item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = item.dataset.lang;
        BatteryI18n.setLanguage(code);
        langMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      langMenu.classList.remove('open');
    });
  }

  // Mobile menu language links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('[data-lang]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const code = link.dataset.lang;
        BatteryI18n.setLanguage(code);
        mobileMenu.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
      });
    });
  }

  // Initialize language from localStorage (defaults to 'en')
  BatteryI18n.setLanguage(BatteryI18n.getLanguage());


  /* ==============================
     Navbar Shadow on Scroll
     ============================== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const updateShadow = () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', updateShadow, { passive: true });
    updateShadow();
  }

});
