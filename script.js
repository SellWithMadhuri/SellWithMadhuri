document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Master Plan Feature Cards
    const FEATURES = [
        "60% हरियाली और खुले स्थान / 40% सुव्यवस्थित विकास क्षेत्र",
        "22 गांवों में 22 टाउन प्लानिंग (TP) योजनाएं",
        "विशेष ज़ोन: इंडस्ट्रियल, नॉलेज एंड आईटी, आवासीय, लॉजिस्टिक्स",
        "केंद्रीय वाणिज्यिक कॉरिडोर और पर्यटन रिसॉर्ट ज़ोन",
        "100% भूमिगत डक्टिंग और ऑप्टिकल फाइबर केबलिंग",
        "24/7 ऑटोमेटेड SCADA जल आपूर्ति और सीवरेज रीसाइक्लिंग",
        "अहमदाबाद-धोलेरा 4 लेन एक्सप्रेसवे & ग्रीनफील्ड इंटरनेशनल एयरपोर्ट",
        "सोलर पार्क 5,000 MW नवीकरणीय ऊर्जा हब"
    ];

    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        FEATURES.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feature-item-card';
            card.innerHTML = `✔ ${item}`;
            featuresContainer.appendChild(card);
        });
    }

    // 2. Render Downloads & Brochure Section
    const DOWNLOADS = [
        {
            title: "Sanctuary Home Official Brochure",
            icon: "📄",
            desc: "सैंक्चुअरी होम प्रोजेक्ट ब्रोशर - लेआउट प्लॉन्स, लोकेशन एडवांटेज और प्रोजेक्ट हाइलाइट्स।",
            path: "resources/Sancuary home brochure.pdf",
            type: "PDF (19.6 MB)"
        },
        {
            title: "Dholera Smart City Presentation (PPTX)",
            icon: "📊",
            desc: "धोलेरा स्मार्ट सिटी 30-स्लाइड्स प्रेजेंटेशन पावरपॉइंट डेक।",
            path: "resources/Dholera_Smart_City_30_Slide_Presentation.pptx",
            type: "PPTX (72.6 KB)"
        },
        {
            title: "Dholera Hindi Presentation (PPTX)",
            icon: "🇮🇳",
            desc: "धोलेरा स्मार्ट सिटी 30-स्लाइड्स हिंदी प्रेजेंटेशन पावरपॉइंट डेक।",
            path: "resources/Dholera_Smart_City_30_Slide_Hindi_Presentation.pptx",
            type: "PPTX (76.8 KB)"
        },
        {
            title: "Project Document Scan 1",
            icon: "📁",
            desc: "आधिकारिक दस्तावेज स्कैन फाइल (Adobe Scan 27-Jun-2026)",
            path: "resources/Adobe Scan 27-Jun-2026.pdf",
            type: "PDF (18.7 MB)"
        },
        {
            title: "Project Document Scan 2",
            icon: "📂",
            desc: "सैंक्चुअरी होम अप्रूवल & टाइटल क्लियरेंस डॉक्यूमेंट्स",
            path: "resources/SKM_C45826052714100.pdf",
            type: "PDF (1.5 MB)"
        },
        {
            title: "Project Document Scan 3",
            icon: "📋",
            desc: "धोलेरा SIR मास्टर प्लान डॉक्यूमेंट रीकैप",
            path: "resources/Scan 2026-5-27 (18,33,50).pdf",
            type: "PDF (4.5 MB)"
        }
    ];

    const resourcesList = document.getElementById('resources-list');
    if (resourcesList) {
        resourcesList.innerHTML = '';
        DOWNLOADS.forEach(res => {
            const card = document.createElement('div');
            card.className = 'res-card';
            card.innerHTML = `
                <div>
                    <div class="res-icon">${res.icon}</div>
                    <div class="res-title">${res.title}</div>
                    <div class="res-desc">${res.desc}</div>
                </div>
                <a href="${res.path}" download class="download-link"><span>⬇️ डाउनलोड ${res.type}</span></a>
            `;
            resourcesList.appendChild(card);
        });
    }

    // 3. Scroll-Triggered Animations (IntersectionObserver & Fallback)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.anim-target').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback if IntersectionObserver is not supported
        document.querySelectorAll('.anim-target').forEach(el => {
            el.classList.add('in-view');
        });
    }
});

