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
      view_project: '<i class="fas fa-link"></i> View Project'
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
      view_project: '<i class="fas fa-link"></i> Projekt ansehen'
    }
};
  
document.getElementById("language-select").addEventListener("change", function(event) {
    const selectedLanguage = event.target.value;
    applyTranslations(selectedLanguage);
});
  
function applyTranslations(language) {
    document.querySelectorAll("[data-translate-key]").forEach(element => {
      const key = element.getAttribute("data-translate-key");
      element.innerHTML = translations[language][key];
    });
}

applyTranslations("de");
  