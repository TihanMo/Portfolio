let translations = {}; // Globale Variable, um die Übersetzungen zu speichern
let stopTyping; // Funktion zum Stoppen der Typanimation

// Funktion zum Laden der JSON-Datei
async function loadTranslations() {
  try {
    const response = await fetch('translations.json'); // Lade die JSON-Datei
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    translations = await response.json(); // Speichere die geladenen Übersetzungen
    console.log("Translations loaded:", translations); // Debug-Ausgabe
    initializeTerminal(); // Initialisiere das Terminal, nachdem die Übersetzungen geladen wurden
  } catch (error) {
    console.error('Fehler beim Laden der Übersetzungen:', error);
  }
}

function typeLetter(text, element) {
  element.innerHTML = "$ ";
  let i = 0;
  let isTyping = true;

  function type() {
    if (!isTyping) return; // Abbrechen, wenn isTyping auf false gesetzt wurde

    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100); // Anpassung der Geschwindigkeit der Typing-Animation
    }
  }

  // Start der Typanimation
  type();

  // Rückgabe einer Funktion, um die Typanimation zu stoppen
  return () => {
    isTyping = false;
    element.innerHTML = ""; // Setze den Inhalt zurück, wenn die Animation gestoppt wird
  };
}

function applyTranslations(language) {
  if (!translations[language]) {
    console.error(`Übersetzungen für die Sprache "${language}" wurden nicht gefunden.`);
    return;
  }

  const elements = document.querySelectorAll('[data-translate-key]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-translate-key');
    const translation = translations[language][key];
    if (translation) {
      if (key === 'view_project' || element.tagName.toLowerCase() === 'option') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

function initializeTerminal() {
  const selectedLanguage = document.getElementById("language-select").value;
  applyTranslations(selectedLanguage);

  const terminalElement = document.querySelector('[data-translate-key="welcome"]');
  const terminalText = translations[selectedLanguage]?.["welcome"] || "Welcome to my Portfolio";

  if (typeof stopTyping === 'function') {
    stopTyping();
  }

  terminalElement.innerHTML = "";
  stopTyping = typeLetter(terminalText, terminalElement);

  const introElement = document.querySelector('[data-translate-key="intro"]');
  const introText = translations[selectedLanguage]?.["intro"] || "";
  introElement.textContent = introText;
}

document.addEventListener("DOMContentLoaded", function() {
  loadTranslations(); // Lade die Übersetzungen, wenn das Dokument geladen ist

  const sortSelect = document.getElementById('sort-select');
  const projectContainer = document.querySelector('#projects');
  let projectsArray = Array.from(document.querySelectorAll('.project'));
  let currentFilter = 'all';

  sortSelect.addEventListener('change', () => {
    sortAndDisplayProjects();
  });

  const filterButtons = document.querySelectorAll('.filter-buttons button');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });

  function filterProjects(filterValue) {
    currentFilter = filterValue;
    sortAndDisplayProjects();
  }

  function sortAndDisplayProjects() {
    const sortOrder = sortSelect.value;

    let filteredProjects = projectsArray.filter(project => {
      const projectCategories = project.getAttribute('data-category').split(' ');
      return currentFilter === 'all' || projectCategories.includes(currentFilter);
    });

    filteredProjects.sort((a, b) => {
      const dateA = new Date(a.getAttribute('data-date'));
      const dateB = new Date(b.getAttribute('data-date'));
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    projectContainer.innerHTML = '';
    filteredProjects.forEach(project => {
      projectContainer.appendChild(project);
    });
  }

  filterProjects('all');

  document.getElementById("language-select").addEventListener("change", function () {
    initializeTerminal();
  });
});
