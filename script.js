/* ==========================================================================
   Vrica Gede Penggalih (Vricap) Portfolio — Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initMobileNav();
    initProjectFilters();
    initTerminal();
    initDmsGalleryModal();
    initCopyEmail();
    initScrollSpy();
    updateYear();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle Management
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeBtn.querySelector('i');

    const savedTheme = localStorage.getItem('vricap_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, icon);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('vricap_theme', newTheme);
        updateThemeIcon(newTheme, icon);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
}

/* --------------------------------------------------------------------------
   2. Subtitle Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const phrases = [
        'Software Engineer',
        'Systems & Language Creator',
        'Full-Stack Developer',
        'Arch Linux Enthusiast',
        'UNIX Philosophy Advocate'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        toggleBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/* --------------------------------------------------------------------------
   4. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive UNIX Terminal
   -------------------------------------------------------------------------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const clearBtn = document.getElementById('term-clear-btn');
    const inputRow = document.getElementById('terminal-input-row');

    if (!input || !body) return;

    let commandHistory = [];
    let historyIndex = -1;

    clearBtn.addEventListener('click', () => {
        clearTerminal();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = input.value.trim();
            if (rawCmd) {
                commandHistory.push(rawCmd);
                historyIndex = commandHistory.length;
                processCommand(rawCmd);
            }
            input.value = '';
            body.scrollTop = body.scrollHeight;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    function clearTerminal() {
        const lines = body.querySelectorAll('.term-line');
        lines.forEach(line => line.remove());
    }

    function processCommand(cmdStr) {
        const cmd = cmdStr.toLowerCase().trim();

        // Echo command line
        const echoLine = document.createElement('div');
        echoLine.className = 'term-line';
        echoLine.innerHTML = `<span class="term-prompt"><span class="prompt-user">guest@vricap</span>:<span class="prompt-path">~</span>$</span> <span class="term-command">${escapeHtml(cmdStr)}</span>`;
        body.insertBefore(echoLine, inputRow);

        let output = '';

        switch (cmd) {
            case 'help':
                output = `
                    Available commands:<br/>
                    &nbsp;&nbsp;<span class="term-highlight">about</span>     - Who is Vrica Gede Penggalih?<br/>
                    &nbsp;&nbsp;<span class="term-highlight">projects</span>  - List key software engineering projects<br/>
                    &nbsp;&nbsp;<span class="term-highlight">kusmala</span>   - Learn about my custom programming language<br/>
                    &nbsp;&nbsp;<span class="term-highlight">skills</span>    - Technical skills & tools overview<br/>
                    &nbsp;&nbsp;<span class="term-highlight">arch</span>      - Display system info & Arch Linux badge<br/>
                    &nbsp;&nbsp;<span class="term-highlight">contact</span>   - Contact details & email<br/>
                    &nbsp;&nbsp;<span class="term-highlight">theme</span>     - Toggle dark / light color theme<br/>
                    &nbsp;&nbsp;<span class="term-highlight">clear</span>     - Clear terminal history<br/>
                    &nbsp;&nbsp;<span class="term-highlight">sudo</span>      - Run command with root privileges
                `;
                break;

            case 'about':
                output = `
                    Vrica Gede Penggalih (Vricap)<br/>
                    Role: Software Engineer / Programmer<br/>
                    OS: Arch Linux<br/>
                    Philosophy: UNIX Philosophy ("Do one thing and do it well", Simplicity).<br/>
                    Greeting: ꦱꦸꦒꦺꦁꦫꦮꦸꦃ! (Sugeng Rawuh!)
                `;
                break;

            case 'projects':
                output = `
                    1. <span class="term-highlight">kusmala</span>: Indonesian-syntax interpreted programming language written in Go.<br/>
                    2. <span class="term-highlight">dms aino</span>: Full-Stack Document Management System with digital signing (React, Node, Express, Mongo).<br/>
                    3. <span class="term-highlight">taskm</span>: Terminal task manager for Linux in Go.<br/>
                    4. <span class="term-highlight">gherver</span>: Low-level HTTP server from scratch in Go (TCP sockets).
                `;
                break;

            case 'kusmala':
                output = `
                    kusmala — Custom Interpreted Programming Language<br/>
                    • Written in: Go (Golang)<br/>
                    • Syntax: Bahasa Indonesia emphasis<br/>
                    • Features: First-class & High-order functions, string/integer/boolean/array types.<br/>
                    • Demo: <a href="https://www.youtube.com/watch?v=3Bi_v5VWL5M" target="_blank" style="color:#38bdf8;text-decoration:underline;">YouTube Demo</a><br/>
                    • Try Playground: <a href="https://ku-7a61eb073c154657985fb0a5e6bce6e6.ecs.ap-southeast-1.on.aws/" target="_blank" style="color:#38bdf8;text-decoration:underline;">AWS Playground</a>
                `;
                break;

            case 'skills':
                output = `
                    • Languages: Go, JavaScript, PHP, Python, Dart<br/>
                    • Web: React, Node.js, Express.js, Laravel, REST APIs<br/>
                    • DB & Auth: MongoDB, PostgreSQL, JWT, RBAC<br/>
                    • Environment: Arch Linux, Bash, Git, AWS
                `;
                break;

            case 'arch':
                output = `
                    <pre style="color:#38bdf8;font-family:monospace;margin:0.5rem 0;">
       /\\         vricap@arch-pc
      /  \\        --------------
     / /\\ \\       OS: Arch Linux x86_64
    / /  \\ \\      Kernel: Linux 6.x
   / /    \\ \\     Shell: zsh / bash
  / /  /\\  \\ \\    Philosophy: KISS (Keep It Simple, Stupid)
 / /  /  \\  \\ \\   Editor: Neovim / VS Code
/___/    \\___\\
                    </pre>
                `;
                break;

            case 'contact':
                output = `
                    Email: vricagedepenggalih@gmail.com<br/>
                    GitHub: https://github.com/vricap<br/>
                    LinkedIn: https://www.linkedin.com/in/vrica-gede-penggalih-266277260/
                `;
                break;

            case 'theme':
                document.getElementById('theme-toggle').click();
                output = `Theme toggled successfully!`;
                break;

            case 'clear':
                clearTerminal();
                return;

            case 'sudo':
                output = `<span style="color:#ef4444;">[sudo] password for guest: <br/>Permission denied: guest is not in the sudoers file. This incident will be reported.</span>`;
                break;

            default:
                output = `<span style="color:#ef4444;">command not found: ${escapeHtml(cmdStr)}</span>. Type <span class="term-highlight">'help'</span> for list of commands.`;
                break;
        }

        const outLine = document.createElement('div');
        outLine.className = 'term-line output-line';
        outLine.innerHTML = output;
        body.insertBefore(outLine, inputRow);
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* --------------------------------------------------------------------------
   6. DMS Screenshots Modal Lightbox
   -------------------------------------------------------------------------- */
function initDmsGalleryModal() {
    const modal = document.getElementById('dms-modal');
    const openBtn = document.getElementById('open-dms-gallery');
    const closeBtn = document.getElementById('close-modal-btn');
    const currentImg = document.getElementById('gallery-current-img');
    const caption = document.getElementById('gallery-caption');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const thumbsContainer = document.getElementById('gallery-thumbnails');

    if (!modal || !openBtn) return;

    const screenshots = [
        { src: 'screenshot/dms/dashboard.jpg', label: 'Main Dashboard View' },
        { src: 'screenshot/dms/dashboard2.jpg', label: 'Dashboard Activity Analytics' },
        { src: 'screenshot/dms/login.jpg', label: 'User Login & Auth' },
        { src: 'screenshot/dms/profile.jpg', label: 'User Profile Settings' },
        { src: 'screenshot/dms/upload.jpg', label: 'Document Upload Form' },
        { src: 'screenshot/dms/lihat-dokumen.jpg', label: 'Document Preview Viewer' },
        { src: 'screenshot/dms/draft.jpg', label: 'Draft Documents List' },
        { src: 'screenshot/dms/kirim-dokumen.jpg', label: 'Send Document Workflow (Sequential/Parallel)' },
        { src: 'screenshot/dms/kirim-dokumen2.jpg', label: 'Send Document Step 2' },
        { src: 'screenshot/dms/pilih-penerima.jpg', label: 'Select Signers & Group Assignment' },
        { src: 'screenshot/dms/sent.jpg', label: 'Sent Documents Status' },
        { src: 'screenshot/dms/inbox.jpg', label: 'Inbox & Pending Signatures' },
        { src: 'screenshot/dms/ttd-dokumen.jpg', label: 'Digital Signing Interface' },
        { src: 'screenshot/dms/ttd-dokumen2.jpg', label: 'Drag & Drop Signature Placement' },
        { src: 'screenshot/dms/signed.jpg', label: 'Completed Signed Documents' },
        { src: 'screenshot/dms/completed.jpg', label: 'Document Completion Certificate' },
        { src: 'screenshot/dms/audit-dokumen.jpg', label: 'Audit Trail Logs' },
        { src: 'screenshot/dms/audit-dokumen2.jpg', label: 'Detailed Audit Verification' },
        { src: 'screenshot/dms/users.jpg', label: 'Admin User Management' },
        { src: 'screenshot/dms/edit-user.jpg', label: 'Edit User & Role Assignment' },
        { src: 'screenshot/dms/tambah-user.jpg', label: 'Add New System User' },
        { src: 'screenshot/dms/filter-dokumen.jpg', label: 'Filter & Search Documents' },
        { src: 'screenshot/dms/documents.jpg', label: 'All Documents Repository' }
    ];

    let currentIndex = 0;

    // Render Thumbnails
    thumbsContainer.innerHTML = '';
    screenshots.forEach((item, idx) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.label;
        img.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
        img.addEventListener('click', () => {
            setGalleryIndex(idx);
        });
        thumbsContainer.appendChild(img);
    });

    function setGalleryIndex(index) {
        currentIndex = index;
        const item = screenshots[currentIndex];
        currentImg.src = item.src;
        caption.textContent = `[${currentIndex + 1} / ${screenshots.length}] ${item.label}`;

        // Update active thumb
        const thumbs = thumbsContainer.querySelectorAll('.gallery-thumb');
        thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === currentIndex);
        });

        // Scroll thumb into view
        if (thumbs[currentIndex]) {
            thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        setGalleryIndex(0);
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
        setGalleryIndex(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % screenshots.length;
        setGalleryIndex(newIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------------------------------------
   7. 1-Click Copy Email
   -------------------------------------------------------------------------- */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const label = document.getElementById('copy-btn-label');
    const emailText = document.getElementById('email-text');

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        const email = emailText.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
            const originalText = label.textContent;
            label.textContent = 'Copied!';
            copyBtn.classList.add('btn-primary');

            setTimeout(() => {
                label.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });
}

/* --------------------------------------------------------------------------
   8. ScrollSpy for Nav Items
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. Footer Dynamic Year
   -------------------------------------------------------------------------- */
function updateYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
