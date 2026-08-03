document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Hamburger Toggle Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
            }
        });
    }

    // Interactive ROI Investment Calculator Logic
    const plotSizeInput = document.getElementById('plot-size');
    const holdingYearsSelect = document.getElementById('holding-years');
    const btnCalculate = document.getElementById('btn-calculate');

    const resInitial = document.getElementById('res-initial');
    const resProjected = document.getElementById('res-projected');
    const resRoi = document.getElementById('res-roi');

    function calculateROI() {
        if (!plotSizeInput || !holdingYearsSelect) return;
        
        const sqYards = parseFloat(plotSizeInput.value) || 100;
        const ratePerSqYd = 6250;
        const initialCost = sqYards * ratePerSqYd;
        const years = parseInt(holdingYearsSelect.value) || 5;

        let multiplier = 2.0;
        if (years === 5) multiplier = 3.0;
        if (years === 10) multiplier = 6.0;

        const projectedVal = initialCost * multiplier;
        const roiPercent = Math.round(((projectedVal - initialCost) / initialCost) * 100);

        if (resInitial) resInitial.innerText = `₹${initialCost.toLocaleString('en-IN')}`;
        if (resProjected) resProjected.innerText = `₹${projectedVal.toLocaleString('en-IN')}`;
        if (resRoi) resRoi.innerText = `+${roiPercent}% Return`;
    }

    if (btnCalculate) btnCalculate.addEventListener('click', calculateROI);
    if (plotSizeInput) plotSizeInput.addEventListener('input', calculateROI);
    if (holdingYearsSelect) holdingYearsSelect.addEventListener('change', calculateROI);

    // 1. Render Master Plan Feature Cards
    const FEATURES = [
        "60% Greenery & Open Spaces / 40% Planned Development Zone",
        "22 Town Planning (TP) Schemes unifying 22 villages",
        "Special Zones: Industrial, Knowledge & IT, Residential, Logistics",
        "Central Commercial Corridor & Tourism Resort Zone",
        "100% Underground Ducting & Optical Fiber Cabling",
        "24/7 Automated SCADA Water Supply & Sewage Recycling",
        "Ahmedabad-Dholera 4-Lane Expressway & Greenfield International Airport",
        "Solar Park 5,000 MW Renewable Energy Hub"
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
    const animTargets = document.querySelectorAll('.anim-target');
    animTargets.forEach(el => el.classList.add('in-view'));

    if ('IntersectionObserver' in window) {
        const observerOptions = { threshold: 0.05, rootMargin: "50px 0px 50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        animTargets.forEach(el => observer.observe(el));
    }


    // 4. Realistic Smart City Canvas Background Engine (Metro Trains, EV Traffic, Solar Rays & Semiconductor Chip Signals)
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. Realistic Metro Bullet Trains on Tracks
    const metroTrains = [
        { y: height * 0.22, speed: 7, length: 180, color: '#10b981', label: 'Dholera Metro Bullet Line 1', progress: -200 },
        { y: height * 0.58, speed: -9, length: 220, color: '#3b82f6', label: 'Expressway EV Corridor Line 2', progress: width + 200 }
    ];

    // 2. Realistic Solar Energy Rays (Solar Park 5000MW)
    const solarRays = [];
    for (let i = 0; i < 15; i++) {
        solarRays.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.4,
            speedY: Math.random() * 0.8 + 0.4,
            length: Math.random() * 60 + 40,
            opacity: Math.random() * 0.4 + 0.2
        });
    }

    // 3. TATA Semiconductor Chip Data Signals & Smart Grid Nodes
    const chipSignals = [];
    for (let i = 0; i < 35; i++) {
        chipSignals.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4,
            radius: Math.random() * 2.5 + 1.5,
            label: Math.random() > 0.6 ? 'TATA CHIP' : (Math.random() > 0.5 ? '5G SCADA' : 'EV SENSOR')
        });
    }

    function drawSmartCityScene() {
        ctx.clearRect(0, 0, width, height);

        // A. Draw Smart Grid Underground Utility Networks
        for (let i = 0; i < chipSignals.length; i++) {
            for (let j = i + 1; j < chipSignals.length; j++) {
                const dx = chipSignals[i].x - chipSignals[j].x;
                const dy = chipSignals[i].y - chipSignals[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(chipSignals[i].x, chipSignals[i].y);
                    ctx.lineTo(chipSignals[j].x, chipSignals[j].y);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.4 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // B. Draw Solar Energy Rays (Solar Park Beams)
        solarRays.forEach(ray => {
            ray.y += ray.speedY;
            if (ray.y > height) {
                ray.y = -ray.length;
                ray.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.moveTo(ray.x, ray.y);
            ctx.lineTo(ray.x, ray.y + ray.length);
            const rayGrad = ctx.createLinearGradient(ray.x, ray.y, ray.x, ray.y + ray.length);
            rayGrad.addColorStop(0, 'transparent');
            rayGrad.addColorStop(0.5, `rgba(234, 179, 8, ${ray.opacity})`);
            rayGrad.addColorStop(1, 'transparent');
            ctx.strokeStyle = rayGrad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // C. Draw Chip Signals & Smart Sensors
        chipSignals.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;

            if (s.x < 0 || s.x > width) s.vx *= -1;
            if (s.y < 0 || s.y > height) s.vy *= -1;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#06b6d4';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // D. Draw Realistic High-Speed Metro Trains & Tracks
        metroTrains.forEach(train => {
            // Draw Metro Track Line
            ctx.beginPath();
            ctx.moveTo(0, train.y);
            ctx.lineTo(width, train.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 8]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Move Train
            train.progress += train.speed;
            if (train.speed > 0 && train.progress > width + train.length) {
                train.progress = -train.length;
            } else if (train.speed < 0 && train.progress < -train.length) {
                train.progress = width + train.length;
            }

            // Draw Metro Train Body
            const trainHeadX = train.progress;
            const trainTailX = train.progress - (train.speed > 0 ? train.length : -train.length);

            const trainGrad = ctx.createLinearGradient(trainTailX, train.y, trainHeadX, train.y);
            trainGrad.addColorStop(0, 'transparent');
            trainGrad.addColorStop(0.3, train.color);
            trainGrad.addColorStop(0.9, '#ffffff');
            trainGrad.addColorStop(1, train.color);

            ctx.beginPath();
            ctx.moveTo(trainTailX, train.y);
            ctx.lineTo(trainHeadX, train.y);
            ctx.strokeStyle = trainGrad;
            ctx.lineWidth = 5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = train.color;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw Train Front Headlight Glow
            ctx.beginPath();
            ctx.arc(trainHeadX, train.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(drawSmartCityScene);
    }

    drawSmartCityScene();
});



