let translations = {};
let stopTyping;

async function loadTranslations() {
  try {
    const response = await fetch('translations.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    translations = await response.json();
    console.log("Translations loaded:", translations);
    initializeTerminal();
  } catch (error) {
    console.error('Fehler beim Laden der Übersetzungen:', error);
  }
}

function typeLetter(text, element) {
  element.innerHTML = "$ ";
  let i = 0;
  let isTyping = true;

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  element.appendChild(cursor);

  function type() {
    if (!isTyping) return;

    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, 100);
    } else {
      cursor.classList.add("blink");
    }
  }

  type();

  return () => {
    isTyping = false;
    cursor.remove();
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

  if (!terminalElement) {
    console.error("Terminal element not found");
    return;
  }

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

document.addEventListener('DOMContentLoaded', function() {
  loadTranslations();
  initializeTerminal();

  const themeSelect = document.getElementById('theme-select');
  const languageSelect = document.getElementById('language-select');
  const sortSelect = document.getElementById('sort-select');
  const projectContainer = document.querySelector('#projects');
  let projectsArray = Array.from(document.querySelectorAll('.project'));
  let currentFilter = 'all';

  const themes = {
    default: {
      '--primary-color': '#77aaff',
      '--secondary-color': '#5599ee',
      '--dark-color': '#333',
      '--light-color': '#fff',
      '--background-color': '#EEEEEE',
    },
    dark: {
      '--primary-color': '#9F7AEA',
      '--secondary-color': '#F6AD55',
      '--dark-color': '#1A202C',
      '--light-color': '#CBD5E0',
      '--background-color': '#2D3748',
    },
    warm: {
      '--primary-color': '#E09F3E',
      '--secondary-color': '#D8572A',
      '--dark-color': '#2B2D42',
      '--light-color': '#FAF4E1',
      '--background-color': '#FFD9C0',
    },
    cool: {
      '--primary-color': '#00A6A6',
      '--secondary-color': '#00B4D8',
      '--dark-color': '#23395D',
      '--light-color': '#EAF2F8',
      '--background-color': '#CAF0F8',
    },
  };

  function changeTheme(theme) {
    const root = document.documentElement;
    const selectedTheme = themes[theme];
    for (const [key, value] of Object.entries(selectedTheme)) {
      root.style.setProperty(key, value);
    }
  }

  themeSelect.addEventListener('change', (event) => {
    changeTheme(event.target.value);
  });

  changeTheme('default');

  languageSelect.addEventListener('change', function () {
    const selectedLanguage = languageSelect.value;
    applyTranslations(selectedLanguage);
    initializeTerminal();
  });

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
});
