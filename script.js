let typingTimeout;
let stopTyping;

function typeLetter(text, element) {
    element.innerHTML = "$ ";
    let i = 0;
    let isTyping = true;

    function type() {
        if (!isTyping) return;

        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 100);
        }
    }

    type();

    return () => {
        isTyping = false;
        clearTimeout(typingTimeout);
    };
}

const translations = {
    en: {
        about: "About Me",
        projects: "Projects",
        contact: "Contact",
        welcome: "Welcome to my Portfolio",
        intro: "I am Tihan Morrol, an IMS student with a passion for software development. Here you can find a selection of my projects.",
        insurance_calculator_angular: "Insurance Calculator (Angular)",
        insurance_calculator_angular_desc: "An insurance calculator developed with Angular to enable the calculation and display of insurance rates.",
        tasks_api: "Task Management REST API",
        tasks_api_desc: "A REST API for managing tasks, developed with modern web technologies.",
        multimedia_website: "Multimedia Website",
        multimedia_website_desc: "A demo website created with the React framework Next.js to demonstrate its features.",
        insurance_calculator_react: "Insurance Calculator (React)",
        insurance_calculator_react_desc: "An insurance calculator created with React to calculate various insurance rates.",
        static_zoo_website: "Static Zoo Website",
        static_zoo_website_desc: "A simple static website about a zoo, created with plain HTML and CSS.",
        technologies: "Technologies:",
        more_projects: "If you would like to see more of my projects, visit:",
        reach_out: "You can reach me via email at:",
        view_project: '<i class="fas fa-link"></i> View Project',
        sort_by: "Sort by:",
        newest_first: "Newest First",
        oldest_first: "Oldest First",
        all: "All",
        web_development: "Web Development",
        api_development: "API Development",
        design: "Design"
    },
    de: {
        about: "Über mich",
        projects: "Projekte",
        contact: "Kontakt",
        welcome: "Willkommen zu meinem Portfolio",
        intro: "Ich bin Tihan Morrol, ein IMS Schüler mit Leidenschaft für Softwareentwicklung. Hier finden Sie eine Auswahl meiner Projekte.",
        insurance_calculator_angular: "Versicherungsrechner (Angular)",
        insurance_calculator_angular_desc: "Ein Versicherungsrechner, der mit Angular entwickelt wurde, um die Berechnung und Anzeige von Versicherungstarifen zu ermöglichen.",
        tasks_api: "Rest-API zu Tasks",
        tasks_api_desc: "Eine Rest-API zur Verwaltung von Aufgaben, entwickelt mit modernen Web-Technologien.",
        multimedia_website: "Multimedia Website",
        multimedia_website_desc: "Eine Demo-Webseite, die mit dem React-Framework Next.js erstellt wurde, um dessen Funktionen zu demonstrieren.",
        insurance_calculator_react: "Versicherungsrechner (React)",
        insurance_calculator_react_desc: "Ein Versicherungsrechner, der mit React erstellt wurde, um die verschiedenen Versicherungstarife zu berechnen.",
        static_zoo_website: "Statische Zoo Website",
        static_zoo_website_desc: "Eine einfache statische Website über einen Zoo, erstellt mit reinem HTML und CSS.",
        technologies: "Technologien:",
        more_projects: "Wenn Sie noch weitere Projekte von mir sehen möchten besuchen Sie:",
        reach_out: "Sie können mich per E-Mail erreichen:",
        view_project: '<i class="fas fa-link"></i> Projekt ansehen',
        sort_by: "Sortieren nach:",
        newest_first: "Neueste zuerst",
        oldest_first: "Älteste zuerst",
        all: "Alle",
        web_development: "Webentwicklung",
        api_development: "API-Entwicklung",
        design: "Design"
    }
};

function applyTranslations(language) {
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-translate-key');
        const translation = translations[language][key];
        if (translation) {
            if (key === 'view_project') {
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
    const terminalText = translations[selectedLanguage]["welcome"];

    if (typeof stopTyping === 'function') {
        stopTyping();
    }

    terminalElement.innerHTML = "";

    stopTyping = typeLetter(terminalText, terminalElement);

    const introElement = document.querySelector('[data-translate-key="intro"]');
    const introText = translations[selectedLanguage]["intro"];
    introElement.textContent = introText;
}

document.addEventListener("DOMContentLoaded", function() {
    initializeTerminal();

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
