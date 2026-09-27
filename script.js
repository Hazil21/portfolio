/**
 * Hazil Hassan - Portfolio & Interactive AI Showcase
 * Apple Dark-Theme Interactivity & Client-Side Inference Simulator
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initPlayground();
  initResumeModal();
  initCopyActions();
  initContactForm();
  initTiltEffect();
});

/* ==========================================================================
   1. Apple Glass Dock Navigation & ScrollSpy
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-item a");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll handler
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const navOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ScrollSpy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          const parent = link.parentElement;
          if (link.getAttribute("href") === `#${id}`) {
            parent.classList.add("active");
          } else {
            parent.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. Interactive AI Playground Simulator
   ========================================================================== */
function initPlayground() {
  // Tabs
  const tabs = document.querySelectorAll(".sim-tab");
  const views = {
    diseaseSim: document.getElementById("diseaseSim"),
    leadSim: document.getElementById("leadSim")
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      Object.keys(views).forEach(key => {
        if (key === target) {
          views[key].classList.add("active");
        } else {
          views[key].classList.remove("active");
        }
      });
    });
  });

  // Tab 1: Medical Diagnostic Engine
  const pathologySelect = document.getElementById("pathologySelect");
  const biomarkerSlider = document.getElementById("biomarkerSlider");
  const biomarkerVal = document.getElementById("biomarkerVal");
  const ageSlider = document.getElementById("ageSlider");
  const ageVal = document.getElementById("ageVal");
  const runDiseaseBtn = document.getElementById("runDiseaseInference");
  const diseaseScore = document.getElementById("diseaseScore");
  const diseaseMeter = document.getElementById("diseaseMeter");
  const diseaseDecision = document.getElementById("diseaseDecision");
  const activeModelBadge = document.getElementById("activeModelBadge");
  const evalLatency = document.getElementById("evalLatency");
  const evalRecall = document.getElementById("evalRecall");

  biomarkerSlider.addEventListener("input", (e) => {
    biomarkerVal.textContent = `${e.target.value}%`;
    calculateDiseaseRisk();
  });

  ageSlider.addEventListener("input", (e) => {
    ageVal.textContent = `${e.target.value} yrs`;
    calculateDiseaseRisk();
  });

  pathologySelect.addEventListener("change", () => {
    const val = pathologySelect.value;
    if (val === "brain") {
      activeModelBadge.textContent = "CNN-TF-MRI-V2";
      evalRecall.textContent = "97.8%";
    } else if (val === "breast") {
      activeModelBadge.textContent = "CNN-HISTOPATH-V1";
      evalRecall.textContent = "98.2%";
    } else if (val === "heart") {
      activeModelBadge.textContent = "RANDOM-FOREST-CLINICAL";
      evalRecall.textContent = "96.4%";
    } else {
      activeModelBadge.textContent = "XGBOOST-DIABETES-V3";
      evalRecall.textContent = "95.9%";
    }
    calculateDiseaseRisk();
  });

  runDiseaseBtn.addEventListener("click", () => {
    runDiseaseBtn.style.transform = "scale(0.97)";
    setTimeout(() => { runDiseaseBtn.style.transform = ""; }, 150);
    // Simulate real neural network inference latency jitter
    evalLatency.textContent = `${Math.floor(11 + Math.random() * 8)}ms`;
    calculateDiseaseRisk();
  });

  function calculateDiseaseRisk() {
    const biomarker = parseFloat(biomarkerSlider.value);
    const age = parseFloat(ageSlider.value);
    const pathology = pathologySelect.value;

    let baseWeight = 0.55;
    if (pathology === "brain" || pathology === "breast") baseWeight = 0.65;

    // Computational simulated risk formula
    let rawScore = (biomarker * 0.72) + (age * 0.35 * baseWeight);
    let confidence = Math.min(Math.max(rawScore, 12), 99.4);
    diseaseScore.textContent = `${confidence.toFixed(1)}%`;

    if (confidence >= 65) {
      diseaseMeter.style.borderTopColor = "#ff453a";
      diseaseMeter.style.borderRightColor = "#ff453a";
      diseaseDecision.style.background = "rgba(255, 69, 58, 0.12)";
      diseaseDecision.style.borderColor = "rgba(255, 69, 58, 0.3)";
      diseaseDecision.style.color = "#fca5a5";
      diseaseDecision.textContent = "⚠️ Pathological Marker Detected • Priority Review";
    } else if (confidence >= 40) {
      diseaseMeter.style.borderTopColor = "#ff9f0a";
      diseaseMeter.style.borderRightColor = "#ff9f0a";
      diseaseDecision.style.background = "rgba(255, 159, 10, 0.12)";
      diseaseDecision.style.borderColor = "rgba(255, 159, 10, 0.3)";
      diseaseDecision.style.color = "#fed7aa";
      diseaseDecision.textContent = "⚡ Moderate Clinical Risk • Secondary Screening Advised";
    } else {
      diseaseMeter.style.borderTopColor = "#30d158";
      diseaseMeter.style.borderRightColor = "#30d158";
      diseaseDecision.style.background = "rgba(48, 209, 88, 0.12)";
      diseaseDecision.style.borderColor = "rgba(48, 209, 88, 0.3)";
      diseaseDecision.style.color = "#86efac";
      diseaseDecision.textContent = "✓ Low Risk Profile • Within Normal Tolerances";
    }
  }

  // Tab 2: Lead Conversion Prediction Simulator
  const leadEngSlider = document.getElementById("leadEngSlider");
  const leadEngVal = document.getElementById("leadEngVal");
  const touchSlider = document.getElementById("touchSlider");
  const touchVal = document.getElementById("touchVal");
  const budgetTier = document.getElementById("budgetTier");
  const runLeadBtn = document.getElementById("runLeadInference");
  const leadScore = document.getElementById("leadScore");
  const leadMeter = document.getElementById("leadMeter");
  const leadDecision = document.getElementById("leadDecision");

  leadEngSlider.addEventListener("input", (e) => {
    leadEngVal.textContent = `${e.target.value} / 100`;
    calculateLeadConversion();
  });

  touchSlider.addEventListener("input", (e) => {
    touchVal.textContent = `${e.target.value} interaction${e.target.value > 1 ? "s" : ""}`;
    calculateLeadConversion();
  });

  budgetTier.addEventListener("change", calculateLeadConversion);

  runLeadBtn.addEventListener("click", () => {
    runLeadBtn.style.transform = "scale(0.97)";
    setTimeout(() => { runLeadBtn.style.transform = ""; }, 150);
    calculateLeadConversion();
  });

  function calculateLeadConversion() {
    const eng = parseFloat(leadEngSlider.value);
    const touch = parseFloat(touchSlider.value);
    const tier = budgetTier.value;

    let tierBonus = 15;
    if (tier === "enterprise") tierBonus = 25;
    if (tier === "smb") tierBonus = 5;

    // Random Forest simulated probability formula
    let prob = (eng * 0.58) + (touch * 2.5) + tierBonus;
    prob = Math.min(Math.max(prob, 8.5), 98.6);
    leadScore.textContent = `${prob.toFixed(1)}%`;

    if (prob >= 75) {
      leadMeter.style.borderTopColor = "#2997ff";
      leadMeter.style.borderRightColor = "#2997ff";
      leadDecision.style.background = "rgba(41, 151, 255, 0.12)";
      leadDecision.style.borderColor = "rgba(41, 151, 255, 0.3)";
      leadDecision.style.color = "#93c5fd";
      leadDecision.textContent = "🔥 High Intent Lead • Direct Enterprise Routing";
    } else if (prob >= 45) {
      leadMeter.style.borderTopColor = "#ff9f0a";
      leadMeter.style.borderRightColor = "#ff9f0a";
      leadDecision.style.background = "rgba(255, 159, 10, 0.12)";
      leadDecision.style.borderColor = "rgba(255, 159, 10, 0.3)";
      leadDecision.style.color = "#fed7aa";
      leadDecision.textContent = "⚡ Mid Funnel Lead • Trigger Automated Drip Campaign";
    } else {
      leadMeter.style.borderTopColor = "#6e6e73";
      leadMeter.style.borderRightColor = "#6e6e73";
      leadDecision.style.background = "rgba(255, 255, 255, 0.05)";
      leadDecision.style.borderColor = "rgba(255, 255, 255, 0.12)";
      leadDecision.style.color = "#a1a1a6";
      leadDecision.textContent = "❄️ Cold Lead • Retargeting Sequence Assigned";
    }
  }
}

/* ==========================================================================
   3. Verified Resume Modal
   ========================================================================== */
function initResumeModal() {
  const openBtn = document.getElementById("openResumeBtn");
  const modal = document.getElementById("resumeModal");
  const closeBtn = document.getElementById("closeResumeBtn");
  const closeActionBtn = document.getElementById("modalCloseAction");
  const printBtn = document.getElementById("printResumeBtn");

  if (!openBtn || !modal) return;

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeActionBtn) closeActionBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   4. Copy to Clipboard Actions
   ========================================================================== */
function initCopyActions() {
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyPhoneBtn = document.getElementById("copyPhoneBtn");
  const toast = document.getElementById("toastNotice");
  const toastMsg = document.getElementById("toastMsg");

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("haziltyl321@gmail.com").then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        showToast("Email: haziltyl321@gmail.com");
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("+919995778924").then(() => {
        showToast("Phone number copied to clipboard!");
      }).catch(() => {
        showToast("Phone: +91 9995778924");
      });
    });
  }
}

/* ==========================================================================
   5. Interactive Contact Form (Direct Mailto Link Dispatch)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value;
    const email = document.getElementById("senderEmail").value;
    const msg = document.getElementById("senderMsg").value;

    const subject = encodeURIComponent(`AI/ML Engineering Role - Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello Hazil,\n\nMy name is ${name} (${email}).\n\n${msg}\n\nLooking forward to speaking with you.`
    );

    window.location.href = `mailto:haziltyl321@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ==========================================================================
   6. Subtle 3D Magnetic Tilt Effect for Portrait (Apple Pro Display style)
   ========================================================================== */
function initTiltEffect() {
  const wrapper = document.querySelector(".portrait-wrapper");
  if (!wrapper || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 14;
    const rotY = (x / rect.width) * 14;

    wrapper.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    wrapper.style.transition = "transform 0.5s ease-out";
  });

  wrapper.addEventListener("mouseenter", () => {
    wrapper.style.transition = "none";
  });
}
