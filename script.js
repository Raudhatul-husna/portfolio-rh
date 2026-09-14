/* =========================================================
   RAUDHATUL HUSNA — PORTFOLIO SCRIPT
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LIVE DEMO LINKS ---------- */
  const DEMO_LINKS = {
    showroom: 'https://carshowroom.infinityfree.me/',
    dental: 'https://raudhatul-husna.github.io/Audry-dental/index.html',
    lumea: 'https://raudhatul-husna.github.io/lumea-beauty-spa/'
  };

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('is-hidden');
    }, 500);
  });

  setTimeout(() => {
    if (loader) loader.classList.add('is-hidden');
  }, 2500);


  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ---------- SCROLL PROGRESS + NAVBAR ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  function onScroll() {

    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const pct =
      docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    if (scrollProgress) {
      scrollProgress.style.width = pct + '%';
    }

    if (navbar) {
      navbar.classList.toggle(
        'is-scrolled',
        scrollTop > 30
      );
    }

    if (backTop) {
      backTop.classList.toggle(
        'is-visible',
        scrollTop > 500
      );
    }
  }

  document.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );

  onScroll();


  /* ---------- BACK TO TOP ---------- */
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ---------- MOBILE NAV ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger) {

    hamburger.addEventListener('click', () => {

      hamburger.classList.toggle('is-open');

      if (navMenu) {
        navMenu.classList.toggle('is-open');

        hamburger.setAttribute(
          'aria-expanded',
          navMenu.classList.contains('is-open')
        );
      }
    });
  }

  if (navMenu) {

    navMenu
      .querySelectorAll('.nav-link')
      .forEach(link => {

        link.addEventListener('click', () => {

          if (hamburger) {
            hamburger.classList.remove('is-open');
          }

          navMenu.classList.remove('is-open');
        });

      });
  }


  /* ---------- ACTIVE NAV LINK ---------- */
  const navLinks =
    document.querySelectorAll('.nav-link');

  const sections =
    [...navLinks]
      .map(link =>
        document.querySelector(
          link.getAttribute('href')
        )
      )
      .filter(Boolean);

  if (sections.length) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              const id =
                '#' + entry.target.id;

              navLinks.forEach(link => {

                link.classList.toggle(
                  'active',
                  link.getAttribute('href') === id
                );

              });
            }
          });

        },
        {
          rootMargin: '-45% 0px -50% 0px',
          threshold: 0
        }
      );

    sections.forEach(section => {
      navObserver.observe(section);
    });
  }


  /* ---------- ACCENT COLOR ---------- */
  const accentBtn =
    document.getElementById('accentBtn');

  const accentPanel =
    document.getElementById('accentPanel');

  const accentDots =
    document.querySelectorAll('.accent-dot');

  const savedAccent =
    localStorage.getItem('rh-accent');

  if (savedAccent) {

    document.documentElement
      .setAttribute(
        'data-accent',
        savedAccent
      );
  }


  function markActiveDot() {

    const current =
      document.documentElement
        .getAttribute('data-accent') || 'blue';

    accentDots.forEach(dot => {

      dot.classList.toggle(
        'is-active',
        dot.dataset.accent === current
      );

    });
  }

  markActiveDot();


  if (accentBtn) {

    accentBtn.addEventListener(
      'click',
      e => {

        e.stopPropagation();

        if (accentPanel) {
          accentPanel.classList.toggle(
            'is-open'
          );
        }
      }
    );
  }


  document.addEventListener(
    'click',
    e => {

      if (
        accentPanel &&
        !accentPanel.contains(e.target) &&
        e.target !== accentBtn
      ) {

        accentPanel.classList.remove(
          'is-open'
        );
      }
    }
  );


  accentDots.forEach(dot => {

    dot.addEventListener(
      'click',
      () => {

        const value =
          dot.dataset.accent;

        document.documentElement
          .setAttribute(
            'data-accent',
            value
          );

        localStorage.setItem(
          'rh-accent',
          value
        );

        markActiveDot();
      }
    );
  });


  /* ---------- TYPING EFFECT ---------- */
  const typingEl =
    document.getElementById('typingText');

  if (typingEl) {

    const roles = [
      'Web Developer',
      'UI/UX Enthusiast',
      'Software Engineering Student',
      'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {

      const current =
        roles[roleIndex];

      if (!deleting) {

        charIndex++;

        typingEl.textContent =
          current.slice(
            0,
            charIndex
          );

        if (charIndex === current.length) {

          deleting = true;

          setTimeout(
            typeLoop,
            1400
          );

          return;
        }

      } else {

        charIndex--;

        typingEl.textContent =
          current.slice(
            0,
            charIndex
          );

        if (charIndex === 0) {

          deleting = false;

          roleIndex =
            (roleIndex + 1) %
            roles.length;
        }
      }

      setTimeout(
        typeLoop,
        deleting ? 40 : 80
      );
    }

    typeLoop();
  }


  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls =
    document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right'
    );

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'in-view'
            );

            revealObserver.unobserve(
              entry.target
            );
          }
        });

      },
      {
        threshold: 0.15
      }
    );

  revealEls.forEach(el => {
    revealObserver.observe(el);
  });


  /* ---------- COUNTERS ---------- */
  const counters =
    document.querySelectorAll('.counter');

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          const el = entry.target;

          const target =
            parseInt(
              el.dataset.target,
              10
            ) || 0;

          let current = 0;

          const step =
            Math.max(
              1,
              Math.ceil(target / 40)
            );

          const tick = () => {

            current += step;

            if (current >= target) {

              el.textContent =
                target;

              return;
            }

            el.textContent =
              current;

            requestAnimationFrame(tick);
          };

          tick();

          counterObserver.unobserve(el);
        });

      },
      {
        threshold: 0.5
      }
    );

  counters.forEach(el => {
    counterObserver.observe(el);
  });


  /* ---------- SKILL PROGRESS ---------- */
  const progressBars =
    document.querySelectorAll('.progress');

  const progressObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'in-view'
            );

            progressObserver.unobserve(
              entry.target
            );
          }
        });

      },
      {
        threshold: 0.4
      }
    );

  progressBars.forEach(el => {
    progressObserver.observe(el);
  });


  /* ---------- CARD TILT ---------- */
  const tiltCards =
    document.querySelectorAll(
      '.cap-card, .project-card, .activity-card'
    );

  tiltCards.forEach(card => {

    card.addEventListener(
      'mousemove',
      e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
          rect.width - 0.5;

        const y =
          (e.clientY - rect.top) /
          rect.height - 0.5;

        card.style.setProperty(
          '--rx',
          (x * 10).toFixed(2) + 'deg'
        );

        card.style.setProperty(
          '--ry',
          (-y * 10).toFixed(2) + 'deg'
        );
      }
    );

    card.addEventListener(
      'mouseleave',
      () => {

        card.style.setProperty(
          '--rx',
          '0deg'
        );

        card.style.setProperty(
          '--ry',
          '0deg'
        );
      }
    );
  });


  /* ---------- PROJECT FILTER + SEARCH ---------- */
  const filterButtons =
    document.querySelectorAll('.filter');

  const projectCards =
    document.querySelectorAll('.project-card');

  const searchInput =
    document.getElementById('projectSearch');

  let activeFilter = 'all';


  function applyProjectFilter() {

    const term =
      (searchInput?.value || '')
        .toLowerCase()
        .trim();

    projectCards.forEach(card => {

      const cats =
        (card.dataset.category || '')
          .split(' ');

      const matchesFilter =
        activeFilter === 'all' ||
        cats.includes(activeFilter);

      const matchesSearch =
        !term ||
        (card.dataset.search || '')
          .toLowerCase()
          .includes(term);

      card.hidden =
        !(matchesFilter && matchesSearch);
    });
  }


  filterButtons.forEach(btn => {

    btn.addEventListener(
      'click',
      () => {

        filterButtons.forEach(
          b => b.classList.remove('active')
        );

        btn.classList.add('active');

        activeFilter =
          btn.dataset.filter;

        applyProjectFilter();
      }
    );
  });


  if (searchInput) {

    searchInput.addEventListener(
      'input',
      applyProjectFilter
    );
  }


  /* ---------- TIMELINE TABS ---------- */
  const timelineTabs =
    document.querySelectorAll(
      '#timelineTabs button'
    );

  const timelineItems =
    document.querySelectorAll(
      '.timeline-item'
    );

  timelineTabs.forEach(tab => {

    tab.addEventListener(
      'click',
      () => {

        timelineTabs.forEach(
          t => t.classList.remove('active')
        );

        tab.classList.add('active');

        const type =
          tab.dataset.timeline;

        timelineItems.forEach(item => {

          const show =
            type === 'all' ||
            item.dataset.type === type;

          item.toggleAttribute(
            'data-hidden',
            !show
          );
        });
      }
    );
  });


  /* =========================================================
     PROJECT DATA
     HOMEFIX SUDAH DIHAPUS
  ========================================================= */

  const projectData = {

    showroom: {

      tag: 'PHP + Database',

      title: 'Showroom Mobil',

      desc:
        'Website katalog mobil dengan pengelolaan data berbasis PHP dan MySQL untuk menampilkan daftar kendaraan secara dinamis.',

      goal:
        'Mengelola dan menampilkan data mobil dari database secara terstruktur.',

      features:
        'CRUD data mobil, halaman katalog, pencarian, koneksi database MySQL.',

      tech:
        'PHP, MySQL, CSS.',

      challenge:
        'Merancang relasi tabel yang efisien dan menghubungkan sistem dengan database MySQL.',

      demo:
        DEMO_LINKS.showroom,

      github:
        '#'
    },


    dental: {

      tag: 'UI + JavaScript',

      title: 'Dental Care',

      desc:
        'Website klinik gigi dengan tampilan bersih, informatif dan interaktif untuk memberikan pengalaman pengguna yang nyaman.',

      goal:
        'Memberikan informasi layanan klinik secara jelas dan menarik secara visual.',

      features:
        'Informasi layanan, animasi interaktif, jadwal dan formulir kontak.',

      tech:
        'HTML, CSS, JavaScript.',

      challenge:
        'Menjaga tampilan agar tetap bersih, profesional dan mudah digunakan.',

      demo:
        DEMO_LINKS.dental,

      github:
        '#'
    },


    lumea: {

      tag: 'Web Design + JavaScript',

      title: 'LUMÉA Beauty & Spa',

      desc:
        'Website Beauty & Spa dengan konsep modern, elegan, responsive dan interaktif.',

      goal:
        'Membuat website layanan kecantikan dan relaksasi yang menarik serta mudah digunakan.',

      features:
        'Landing page, informasi layanan, booking/appointment, responsive layout dan interaksi JavaScript.',

      tech:
        'HTML, CSS, JavaScript.',

      challenge:
        'Membangun tampilan beauty & spa yang elegan sekaligus tetap ringan dan nyaman digunakan.',

      demo:
        DEMO_LINKS.lumea,

      github:
        '#'
    },


    placeholder: {

      tag: 'Project',

      title: 'Project Baru',

      desc:
        'Slot project ini dapat digunakan untuk project terbaru.',

      goal:
        'Menampilkan project terbaru.',

      features:
        'Dapat diganti sesuai project.',

      tech:
        'HTML, CSS, JavaScript.',

      challenge:
        'Terus mengembangkan kemampuan melalui project baru.',

      demo:
        '#',

      github:
        '#'
    }
  };


  /* ---------- PROJECT MODAL ---------- */

  const projectModal =
    document.getElementById(
      'projectModal'
    );

  const openButtons =
    document.querySelectorAll(
      '.project-open'
    );


  openButtons.forEach(btn => {

    btn.addEventListener(
      'click',
      () => {

        const projectName =
          btn.dataset.project;

        const data =
          projectData[projectName];

        if (
          !data ||
          !projectModal
        ) {
          return;
        }


        /* DATA MODAL */

        const tag =
          document.getElementById(
            'modalProjectTag'
          );

        const title =
          document.getElementById(
            'modalProjectTitle'
          );

        const desc =
          document.getElementById(
            'modalProjectDesc'
          );

        const goal =
          document.getElementById(
            'modalGoal'
          );

        const features =
          document.getElementById(
            'modalFeatures'
          );

        const tech =
          document.getElementById(
            'modalTech'
          );

        const challenge =
          document.getElementById(
            'modalChallenge'
          );


        if (tag) {
          tag.textContent =
            data.tag;
        }

        if (title) {
          title.textContent =
            data.title;
        }

        if (desc) {
          desc.textContent =
            data.desc;
        }

        if (goal) {
          goal.textContent =
            data.goal;
        }

        if (features) {
          features.textContent =
            data.features;
        }

        if (tech) {
          tech.textContent =
            data.tech;
        }

        if (challenge) {
          challenge.textContent =
            data.challenge;
        }


        /* ---------- LIVE DEMO BUTTON ---------- */

        const modalButtons =
          projectModal.querySelectorAll(
            '.modal-actions a'
          );

        const liveDemoBtn =
          modalButtons[0];

        const githubBtn =
          modalButtons[1];


        if (liveDemoBtn) {

          liveDemoBtn.href =
            data.demo;

          liveDemoBtn.target =
            '_blank';

          liveDemoBtn.rel =
            'noopener noreferrer';

          if (data.demo === '#') {

            liveDemoBtn.style.display =
              'none';

          } else {

            liveDemoBtn.style.display =
              'inline-flex';
          }
        }


        if (githubBtn) {

          githubBtn.href =
            data.github;

          if (data.github === '#') {

            githubBtn.style.display =
              'none';

          } else {

            githubBtn.style.display =
              'inline-flex';

            githubBtn.target =
              '_blank';

            githubBtn.rel =
              'noopener noreferrer';
          }
        }


        openModal(projectModal);
      }
    );
  });


  /* ---------- BLOG MODAL ---------- */

  const blogData = {

    html: {

      tag: 'Web Development',

      title:
        'Belajar HTML & CSS dari Dasar',

      text:
        'Catatan ini merangkum proses belajar struktur halaman web, semantic HTML, dan styling responsive menggunakan CSS.'
    },


    php: {

      tag: 'Programming',

      title:
        'Mulai Mengenal PHP & MySQL',

      text:
        'Ringkasan proses belajar menghubungkan aplikasi web dengan database menggunakan PHP dan MySQL.'
    },


    project: {

      tag: 'Project',

      title:
        'Pelajaran dari Membangun Website',

      text:
        'Beberapa hal yang dipelajari selama proses merancang dan mengembangkan project website kuliah.'
    }
  };


  const blogModal =
    document.getElementById(
      'blogModal'
    );


  document
    .querySelectorAll('.blog-card')
    .forEach(card => {

      card.addEventListener(
        'click',
        () => {

          const data =
            blogData[
              card.dataset.blog
            ];

          if (
            !data ||
            !blogModal
          ) {
            return;
          }

          document.getElementById(
            'articleTag'
          ).textContent =
            data.tag;

          document.getElementById(
            'articleTitle'
          ).textContent =
            data.title;

          document.getElementById(
            'articleText'
          ).textContent =
            data.text;

          openModal(blogModal);
        }
      );
    });


  /* ---------- CV MODAL ---------- */

  const cvModal =
    document.getElementById(
      'cvModal'
    );

  const previewCvBtn =
    document.getElementById(
      'previewCv'
    );


  if (previewCvBtn) {

    previewCvBtn.addEventListener(
      'click',
      () => openModal(cvModal)
    );
  }


  /* ---------- MODAL HELPERS ---------- */

  function openModal(modal) {

    if (!modal) return;

    modal.classList.add(
      'is-open'
    );

    document.body.style.overflow =
      'hidden';
  }


  function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove(
      'is-open'
    );

    document.body.style.overflow =
      '';
  }


  document
    .querySelectorAll('.modal')
    .forEach(modal => {

      modal.addEventListener(
        'click',
        e => {

          if (
            e.target === modal
          ) {
            closeModal(modal);
          }
        }
      );


      const closeBtn =
        modal.querySelector(
          '.modal-close'
        );

      if (closeBtn) {

        closeBtn.addEventListener(
          'click',
          () => closeModal(modal)
        );
      }
    });


  document.addEventListener(
    'keydown',
    e => {

      if (e.key === 'Escape') {

        document
          .querySelectorAll(
            '.modal.is-open'
          )
          .forEach(modal => {
            closeModal(modal);
          });
      }
    }
  );


  /* =========================================================
     CONTACT FORM → WHATSAPP
     NOMOR: 085361972670
  ========================================================= */

  const contactForm =
    document.getElementById(
      'contactForm'
    );

  const formStatus =
    document.getElementById(
      'formStatus'
    );


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      e => {

        e.preventDefault();


        /* ---------- AMBIL DATA FORM ---------- */

        const name =
          document.getElementById('name')?.value.trim() || '';

        const email =
          document.getElementById('email')?.value.trim() || '';

        const subject =
          document.getElementById('subject')?.value.trim() || '';

        const message =
          document.getElementById('message')?.value.trim() || '';


        /* ---------- PESAN WHATSAPP ---------- */

        const whatsappMessage =
`Halo Raudhatul Husna 👋

Saya ingin menghubungi kamu untuk kolaborasi.

Nama: ${name}
Email: ${email}
Subject: ${subject}

Pesan:
${message}

Saya menemukan portfolio kamu dan tertarik untuk berdiskusi lebih lanjut. Terima kasih.`;


        /* ---------- NOMOR WHATSAPP ---------- */

        const whatsappNumber =
          '6285361972670';


        /* ---------- BUAT LINK WHATSAPP ---------- */

        const whatsappURL =
          'https://wa.me/' +
          whatsappNumber +
          '?text=' +
          encodeURIComponent(
            whatsappMessage
          );


        /* ---------- STATUS ---------- */

        if (formStatus) {

          formStatus.textContent =
            'Membuka WhatsApp...';

          formStatus.classList.remove(
            'success'
          );

          formStatus.classList.add(
            'success'
          );
        }


        /* ---------- BUKA WHATSAPP ---------- */

        window.open(
          whatsappURL,
          '_blank'
        );


        /* ---------- RESET FORM ---------- */

        contactForm.reset();

      }
    );
  }

});