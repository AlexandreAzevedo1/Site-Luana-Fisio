// Configure aqui o número do WhatsApp da clínica
// Formato: somente números com DDI e DDD, por exemplo: 5591999998888
const WHATSAPP_NUMBER = "5500000000000"; // TROQUE PARA O SEU NÚMERO

function buildWhatsAppLink(message = "") {
  const base = "https://wa.me/";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `${base}${WHATSAPP_NUMBER}${text}`;
}

function setWhatsAppLinks() {
  const defaultMsg =
    "Olá! Gostaria de agendar uma avaliação na clínica LUANAFISIO. Podemos conversar?";

  const heroMsg =
    "Olá! Gostaria de agendar uma avaliação na LUANAFISIO. Estes são meus dados:";

  const links = [
    { id: "top-whatsapp", msg: defaultMsg },
    { id: "hero-whatsapp", msg: heroMsg },
    { id: "contact-whatsapp", msg: defaultMsg },
    { id: "bottom-whatsapp", msg: defaultMsg },
    { id: "floating-whatsapp", msg: defaultMsg },
  ];

  links.forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    if (el) el.href = buildWhatsAppLink(msg);
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const reason = formData.get("reason") || "";
    const message = formData.get("message") || "";

    const reasonTextMap = {
      dor: "Dor / Lesão",
      "pos-operatorio": "Pós-operatório",
      pilates: "Pilates",
      avaliacao: "Avaliação geral",
      outro: "Outro",
    };

    const reasonText = reasonTextMap[reason] || "";

    const finalMessage = [
      "Olá! Gostaria de agendar uma avaliação na LUANAFISIO.",
      "",
      name && `Nome: ${name}`,
      phone && `Telefone/WhatsApp: ${phone}`,
      reasonText && `Motivo do contato: ${reasonText}`,
      message && "",
      message && `Mensagem: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(finalMessage), "_blank");
  });
}

function setCurrentYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
}

function initExerciseArea() {
  const form = document.getElementById("exercise-login-form");
  const locked = document.getElementById("exercise-locked");
  const area = document.getElementById("exercise-area");
  const nameSpan = document.getElementById("exercise-patient-name");
  const logoutBtn = document.getElementById("exercise-logout");
  const list = document.getElementById("exercise-videos");

  if (!form || !locked || !area || !nameSpan || !logoutBtn || !list) return;

  const DEMO_CODE = "LUANA123"; // código demonstrativo

  const demoVideos = [
    {
      title: "Mobilidade de coluna lombar",
      duration: "2 min",
      timesPerDay: "2x ao dia",
      url: "#",
    },
    {
      title: "Fortalecimento de glúteos",
      duration: "3 min",
      timesPerDay: "3x por semana",
      url: "#",
    },
    {
      title: "Alongamento cervical suave",
      duration: "1 min",
      timesPerDay: "Sempre que sentir tensão",
      url: "#",
    },
  ];

  function renderVideos() {
    list.innerHTML = "";
    demoVideos.forEach((video) => {
      const li = document.createElement("li");
      li.className = "exercises-video-item";
      li.innerHTML = `
        <span class="exercises-video-title">${video.title}</span>
        <span class="exercises-video-meta">Duração: ${video.duration} · Frequência: ${video.timesPerDay}</span>
        <a href="${video.url}" class="exercises-video-link">Assistir vídeo (exemplo)</a>
      `;
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get("patientName") || "").toString().trim();
    const code = (data.get("accessCode") || "").toString().trim();

    if (!name || !code) return;

    if (code !== DEMO_CODE) {
      alert("Código de acesso inválido. Use o código demonstrativo LUANA123 para testar.");
      return;
    }

    nameSpan.textContent = name;
    renderVideos();
    locked.classList.add("hidden");
    area.classList.remove("hidden");
  });

  logoutBtn.addEventListener("click", () => {
    form.reset();
    area.classList.add("hidden");
    locked.classList.remove("hidden");
    nameSpan.textContent = "";
    list.innerHTML = "";
  });
}

function initCalculators() {
  const bmiForm = document.getElementById("bmi-form");
  const bmiResult = document.getElementById("bmi-result");
  const ergoForm = document.getElementById("ergonomics-form");
  const ergoResult = document.getElementById("ergonomics-result");

  if (bmiForm && bmiResult) {
    bmiForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(bmiForm);
      const weight = Number(data.get("weight"));
      const heightCm = Number(data.get("height"));

      if (!weight || !heightCm) return;

      const heightM = heightCm / 100;
      const bmi = weight / (heightM * heightM);
      let category = "";

      if (bmi < 18.5) category = "Abaixo do peso";
      else if (bmi < 25) category = "Peso adequado";
      else if (bmi < 30) category = "Sobrepeso";
      else category = "Obesidade (graus variados)";

      bmiResult.innerHTML = `
        <p><strong>IMC:</strong> ${bmi.toFixed(1)}</p>
        <p><strong>Classificação:</strong> ${category}</p>
        <p>Esta calculadora é apenas um guia inicial. A avaliação completa deve ser feita com um(a) profissional.</p>
      `;
    });
  }

  if (ergoForm && ergoResult) {
    ergoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(ergoForm);
      const position = data.get("position");
      const pain = data.get("pain");
      const chair = data.get("chair");

      let message = "";

      if (pain === "frequente") {
        message +=
          "Você relata dores frequentes. Recomenda-se fortemente uma avaliação presencial de fisioterapia para análise postural e ajuste do ambiente de trabalho. ";
      } else if (pain === "as_vezes") {
        message +=
          "Atenção às dores ocasionais. Pequenas pausas, alongamentos guiados e correção da postura podem ajudar a evitar piora do quadro. ";
      } else {
        message += "Ótimo que você não sente dores frequentes. Vamos manter bons hábitos de ergonomia. ";
      }

      if (position === "sentado") {
        message +=
          "Para trabalho sentado em computador, mantenha pés apoiados no chão, olhos na altura do topo da tela e apoio lombar adequado. ";
      } else if (position === "em_pe") {
        message +=
          "Para trabalho em pé, prefira alternar apoio dos pés, utilizar calçados adequados e, se possível, tapetes anti-fadiga. ";
      } else if (position === "misto") {
        message +=
          "Alternar entre sentado e em pé é positivo. Considere uma estação de trabalho ajustável e pausas regulares. ";
      }

      if (chair === "nao" || chair === "nao_sei") {
        message +=
          "Invista em uma cadeira com regulagem de altura e apoio lombar, ou adapte com almofadas específicas para a região lombar.";
      } else if (chair === "sim") {
        message +=
          "Aproveite os recursos da sua cadeira: ajuste altura, apoio lombar e distância da mesa para manter a coluna neutra.";
      }

      ergoResult.innerHTML = `<p>${message}</p>
        <p>Estas orientações são gerais e não substituem uma avaliação presencial individualizada.</p>`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setWhatsAppLinks();
  initContactForm();
  setCurrentYear();
  initExerciseArea();
  initCalculators();
});

