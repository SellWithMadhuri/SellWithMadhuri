document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const viewport = document.getElementById('slides-viewport');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const gridModal = document.getElementById('grid-modal');
    const gridContainer = document.getElementById('grid-container');

    // 1. Render All Slides
    function renderSlides() {
        viewport.innerHTML = '';
        SLIDES.forEach((slide, index) => {
            const card = document.createElement('div');
            card.className = `slide-card ${index === 0 ? 'active' : ''}`;
            card.id = `slide-${index}`;

            if (slide.type === 'hero') {
                card.classList.add('hero-layout');
                card.innerHTML = `
                    <div class="slide-tag">${slide.tag}</div>
                    <div class="hero-title">${slide.title}</div>
                    <div class="hero-subtitle">${slide.subtitle}</div>
                    <div class="hero-pills">
                        ${slide.highlights.map(h => `<div class="pill">${h}</div>`).join('')}
                    </div>
                `;
            } else if (slide.type === 'stats') {
                card.innerHTML = `
                    <div class="slide-header">
                        <div class="slide-tag">${slide.category}</div>
                        <div class="slide-title">${slide.title}</div>
                        <div class="slide-desc">${slide.desc}</div>
                    </div>
                    <div class="stats-grid">
                        ${slide.stats.map(s => `
                            <div class="stat-box">
                                <div class="stat-val">${s.value}</div>
                                <div class="stat-lbl">${s.label}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (slide.type === 'card-grid') {
                card.innerHTML = `
                    <div class="slide-header">
                        <div class="slide-tag">${slide.category}</div>
                        <div class="slide-title">${slide.title}</div>
                        <div class="slide-desc">${slide.desc}</div>
                    </div>
                    <div class="card-grid-container">
                        ${slide.items.map(item => `
                            <div class="grid-item-card">${item}</div>
                        `).join('')}
                    </div>
                `;
            } else if (slide.type === 'highlight-box') {
                card.innerHTML = `
                    <div class="slide-header">
                        <div class="slide-tag">${slide.category}</div>
                        <div class="slide-title">${slide.title}</div>
                        <div class="slide-desc">${slide.desc}</div>
                    </div>
                    <div class="card-grid-container" style="grid-template-columns: 1fr;">
                        ${slide.points.map(p => `
                            <div class="grid-item-card" style="border-left-color: var(--accent-gold); font-size: 20px; padding: 24px;">✔ ${p}</div>
                        `).join('')}
                    </div>
                `;
            } else if (slide.type === 'compare') {
                card.innerHTML = `
                    <div class="slide-header">
                        <div class="slide-tag">${slide.category}</div>
                        <div class="slide-title">${slide.title}</div>
                        <div class="slide-desc">${slide.desc}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 32px;">
                        <div class="stat-box" style="border-color: #64748b;">
                            <div class="stat-lbl" style="font-size: 16px;">${slide.box1.title}</div>
                            <div class="stat-val" style="color: #94a3b8; margin-top: 12px; font-size: 32px;">${slide.box1.detail}</div>
                        </div>
                        <div class="stat-box" style="border-color: var(--accent-green);">
                            <div class="stat-lbl" style="font-size: 16px; color: var(--accent-green);">${slide.box2.title}</div>
                            <div class="stat-val" style="margin-top: 12px; font-size: 32px;">${slide.box2.detail}</div>
                        </div>
                    </div>
                `;
            }
            viewport.appendChild(card);
        });
    }

    // 2. Render Grid Overview Thumbnails
    function renderGridModal() {
        gridContainer.innerHTML = '';
        SLIDES.forEach((slide, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumb-card';
            thumb.innerHTML = `
                <div class="thumb-num">SLIDE ${index + 1}</div>
                <div class="thumb-title">${slide.title}</div>
            `;
            thumb.addEventListener('click', () => {
                goToSlide(index);
                gridModal.classList.remove('open');
            });
            gridContainer.appendChild(thumb);
        });
    }

    // 3. Navigation Controls
    function goToSlide(index) {
        if (index < 0 || index >= SLIDES.length) return;
        document.querySelectorAll('.slide-card').forEach(c => c.classList.remove('active'));
        currentSlide = index;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        
        // Update Footer Progress
        slideCounter.textContent = `Slide ${currentSlide + 1} of ${SLIDES.length}`;
        const pct = ((currentSlide + 1) / SLIDES.length) * 100;
        progressBar.style.width = `${pct}%`;
    }

    document.getElementById('next-btn').addEventListener('click', () => goToSlide(currentSlide + 1));
    document.getElementById('prev-btn').addEventListener('click', () => goToSlide(currentSlide - 1));
    
    document.getElementById('btn-overview').addEventListener('click', () => {
        gridModal.classList.add('open');
    });

    document.getElementById('close-grid').addEventListener('click', () => {
        gridModal.classList.remove('open');
    });

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            goToSlide(currentSlide - 1);
        } else if (e.key.toLowerCase() === 'g') {
            gridModal.classList.toggle('open');
        }
    });

    renderSlides();
    renderGridModal();
    goToSlide(0);
});
