const topicSelect = document.getElementById("topic");
const table = document.getElementById("table");
const flipSound = new Audio("card.mp3");

let allCards = [];
let drawnCards = [];
let selectedSpread = null;

const spreadDescription = document.getElementById("spread-description");
const descriptionBox = document.getElementById("description-box");
const spreadContainer = document.getElementById("spread-selection");
const classicOptions = document.getElementById("classic-options");

const spreadTypes = [
  {
    name: "Klasyczny",
    count: 3,
    labels: ["Karta 1", "Karta 2", "Karta 3"],
    description: "Klasyczny rodzaj rozkładu jest odpowiedni dla osób, które mają konkretne i nurtujące ich pytanie. Zostaną ci zaproponowane trzy tematy, które najczęściej poruszają ludzi — miłość, kariera lub przyszłość. Ten rozkład różni się od innych tym, że będziesz musiał zajrzeć w głąb swojej duszy i zastanowić się, które pytanie nurtuje cię najbardziej. Następnie wyciągniesz 3 karty, które dadzą ci odpowiedź."
  },
  {
    name: "Przeszłość–Teraźniejszość–Przyszłość",
    count: 3,
    labels: ["Przeszłość", "Teraźniejszość", "Przyszłość"],
    description: "„Przeszłość - Teraźniejszość - Przyszłość” jest jednym z najbardziej podstawowych i potężnych odczytów Tarota, który pozwala zobaczyć rozwój sytuacji w czasie. Doskonale sprawdza się w każdej kwestii - miłości, pracy, stanu wewnętrznego, zdrowia, relacji, ścieżki życiowej. W „Przeszłość - Teraźniejszość - Przyszłość” możesz zadać konkretne pytanie lub nie zadawać go wcale - wszystko zależy od Twojego celu. Bez pytania - głębiej, szerzej, filozoficznie. Z pytaniem - skoncentrowane, jasne, przydatne do podejmowania decyzji."
  },
  {
    name: "Miłość–Wyzwanie–Rada",
    count: 3,
    labels: ["Miłość", "Wyzwanie", "Rada"],
    description: "To psychologicznie trafny i bardzo osobisty rozkład, idealny do analizy obecnych relacji miłosnych, stanu duszy, emocjonalnych przywiązań lub poszukiwania partnera. Pomaga nie tylko dowiedzieć się, co się dzieje, ale także głębiej zrozumieć, gdzie jesteś, co przeszkadza i co z tym zrobić."
  },
  {
    name: "Duchowe przesłanie",
    count: 1,
    labels: ["Przesłanie"],
    description: "To intuicyjny i głęboki rozkład, skupiający się nie na zewnętrznych wydarzeniach, lecz na wewnętrznym zrozumieniu, duszy i ścieżce. Szczególnie dobrze sprawdza się w momentach, gdy czujesz, że „wszystko niby jest w porządku, ale coś jednak nie gra”, albo gdy poszukujesz sensu, wsparcia od Wszechświata czy duchowego przewodnictwa. To przesłanie od wyższych sił / intuicji / duchowych przewodników — w takiej formie, w jakiej sam to postrzegasz. Karty nie tyle przewidują przyszłość, ile zwracają się do twojej duszy, pomagając usłyszeć to, co już jest w tobie."
  },
  {
    name: "Droga 5 kart",
    count: 5,
    labels: ["Początek", "Wyzwanie", "Wewnętrzna siła", "Rada", "Rezultat"],
    description: "To symboliczna podróż odzwierciedlająca twoją ścieżkę życiową, drogę w konkretnej sytuacji lub wewnętrzny rozwój. Jest szczególnie pomocny, gdy stoisz na rozdrożu, czujesz, że się zmieniasz, szukasz swojego kierunku lub chcesz zrozumieć, gdzie jesteś i dokąd dalej iść."
  }
];

spreadTypes.forEach(spread => {
  const btn = document.createElement("button");
  btn.classList.add("spread-button");
  btn.textContent = spread.name;
  btn.type = "button";

  btn.addEventListener("click", () => {
    document.querySelectorAll(".spread-button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedSpread = spread;

    classicOptions.classList.toggle("hidden", spread.name !== "Klasyczny");
    spreadDescription.textContent = spread.description;
    descriptionBox.classList.add("visible");
    descriptionBox.classList.remove("hidden");
  });

  btn.addEventListener("mouseenter", () => {
    spreadDescription.textContent = spread.description;
    descriptionBox.classList.add("visible");
    descriptionBox.classList.remove("hidden");
  });

  btn.addEventListener("mouseleave", () => {
    if (!selectedSpread || selectedSpread.name !== spread.name) {
      spreadDescription.textContent = selectedSpread?.description || "";
    }
  });

  spreadContainer.appendChild(btn);
});

function nextStep() {
  const spread = selectedSpread;
  const topic = topicSelect.value;

  if (!spread) return alert("Wybierz swój rozkład");
  if (spread.name === "Klasyczny" && !topic) return alert("Wybierz temat wróżby.");

  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function step3() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const birthdate = document.getElementById("birthdate").value;
  if (!name || !surname || !birthdate){ 
     return alert("Wypełnij wszystkie pola!");

}

const hasDigits = /\d/;
if (hasDigits.test(name) || hasDigits.test(surname)) {
  return alert("Imię i nazwisko nie mogą zawierać cyfr. Wprowadź poprawne dane.");
}

  const age = calculateAge(birthdate);
  const ageInput = document.getElementById("age");
  ageInput.value = age;
  ageInput.readOnly = true;
  ageInput.style.cssText = "background-color: rgba(255,255,255,0.1); color: #ddaaff; border: 1px solid #ddaaff; box-shadow: inset 0 0 10px #a97cff;";

  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
  return age;
}

document.getElementById("birthdate").addEventListener("change", (e) => {
  const age = calculateAge(e.target.value);
  const ageInput = document.getElementById("age");
  ageInput.value = age;
  ageInput.readOnly = true;
  ageInput.style.cssText = "background-color: rgba(255,255,255,0.1); color: #ddaaff; border: 1px solid #ddaaff; box-shadow: inset 0 0 10px #a97cff;";
});

function drawCards() {
  const spread = selectedSpread;
  if (!spread) return;

  const payload = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    birthdate: document.getElementById("birthdate").value,
    age: document.getElementById("age").value,
    spreadType: spread.name,
    ...(spread.name === "Klasyczny" ? { topic: topicSelect.value } : {})
  };

  fetch("http://127.0.0.1:5000/api/gadanie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) return alert("Brak kart w odpowiedzi!");

      allCards = data.slice(0, spread.count);
      drawnCards = [];

      const deckTitle = document.getElementById("deck-title");
      deckTitle.textContent = `Wybierz ${spread.count} ${spread.count === 1 ? "kartę" : "karty"} z talii:`;

      document.getElementById("step3").classList.add("hidden");
      document.getElementById("deck-zone").classList.remove("hidden");
      document.getElementById("deck-image").style.pointerEvents = "auto";
      table.innerHTML = "";
      document.getElementById("descriptions").innerHTML = "";
    })
    .catch(err => {
      console.error(err);
      alert("Błąd serwera!");
    });
}

function drawFromDeck() {
  if (drawnCards.length >= allCards.length || allCards.length === 0) return;
  const card = allCards[drawnCards.length];
  const label = selectedSpread?.labels?.[drawnCards.length] || "";

  drawnCards.push({ ...card, label });

  const wrapper = document.createElement("div");
  wrapper.className = "card-wrapper";
  if (drawnCards.length === 3 || drawnCards.length === 5) {
    wrapper.style.marginTop = "-90px";
  }

  if (selectedSpread?.labels?.length > drawnCards.length - 1) {
    const labelEl = document.createElement("div");
    labelEl.className = "card-label";
    labelEl.textContent = selectedSpread.labels[drawnCards.length - 1];
    wrapper.appendChild(labelEl);
  }

  const slot = document.createElement("div");
  slot.className = "card-slot fade-in";
  slot.dataset.index = drawnCards.length - 1;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("img");
  front.src = `http://127.0.0.1:5000${card.image}`;
  front.alt = card.name;
  front.className = "card-front";

  const back = document.createElement("img");
  back.src = "images/tarot.jpg";
  back.alt = "Deck";
  back.className = "card-back";

  inner.appendChild(back);
  inner.appendChild(front);
  slot.appendChild(inner);
  wrapper.appendChild(slot);
  table.appendChild(wrapper);

  setTimeout(() => {
    slot.classList.add("flipped");
    flipSound.play();
    if (drawnCards.length === allCards.length) {
      document.getElementById("deck-image").style.pointerEvents = "none";
      setTimeout(() => showDescriptions(drawnCards), 800);
      document.getElementById("menu-end-button").classList.remove("hidden");
    }
  }, 100);
}

function showDescriptions(cards) {
  const desc = document.getElementById("descriptions");
  desc.innerHTML = "";

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card-desc fade-in";
    div.style.opacity = 0;
    div.style.transition = "opacity 20s ease";
    div.dataset.index = index;

    const description = card.description || "Brak opisu.";
    const isClassic = selectedSpread?.name === "Klasyczny";
    const label = isClassic ? "" : ` – ${card.label}`;
    div.innerHTML = `<h4>${card.name}${label}</h4><p>${description}</p>`;

    desc.appendChild(div);

    requestAnimationFrame(() => {
      div.style.opacity = 1;
    });
  });
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function backToStep1() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
}

function backToStep2() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function backToStep3() {
  document.getElementById("deck-zone").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

function goToMainMenu() {
  document.querySelectorAll(".step").forEach(el => el.classList.add("hidden"));
  document.getElementById("table").innerHTML = "";
  document.getElementById("descriptions").innerHTML = "";
  document.getElementById("deck-zone").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("deck-image").style.pointerEvents = "auto";
}

window.drawCards = drawCards;
window.nextStep = nextStep;
window.step3 = step3;
window.drawFromDeck = drawFromDeck;

window.backToStep1 = backToStep1;
window.backToStep2 = backToStep2;
window.backToStep3 = backToStep3;
window.goToMainMenu = goToMainMenu;

