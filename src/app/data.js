const Cards = [
  {
    name: "Electronic signature",
    details: "An app to generate public/private keys and certificates, sign documents (TXT), and a companion app to submit signed docs for authority verification. It also stores public signatures to protect against MITM attacks.",
    participants: "Solo project",
    techno: "Django",
    society: "School",
    link: "https://github.com/ManoAndriasat/signature_electronic"
  },
  {
    name: "XSS Vulnerability Simulation",
    details: "A web application simulating XSS vulnerabilities, allowing users to understand and test XSS attacks in a controlled environment.",
    participants: "Solo project",
    techno: "Django",
    society: "School",
    link: "https://github.com/ManoAndriasat/xss_injection"
  },
  {
    name: "Adapted Job Search",
    details: "An application that scrapes all tech jobs from PortalJob (Madagascar), analyzes the data to identify high-demand skills and top hiring companies, and generates a tailored motivational letter based on the job requirements and your CV. (no git link available)",
    participants: "Solo project",
    techno: "Django",
    society: "Personnal project",
    link: "",
  },
  {
    name: "Garage management system",
    details: "Development of a garage management system, including vehicle registration, asking appointments, following up on repairs, and managing customer information. (we use free server to host the backend, so it may take time run out of free quota)",
    participants: "Group of 2 (70% contribution)",
    techno: "Stack MEAN (MongoDB, Express.js, Angular, Node.js)",
    society: "Freelance",
    link: "https://m1p12mean-mano-michael.netlify.app/",
    date: "MAR - APR 2024"
  },
  {
    name: "Datamart Design and Dashboard Development",
    details: "Design of a datamart (a specialized data storage system). Automatic data extraction from a data warehouse (DHIS2) to our datamart via an ETL process. Development of an online dashboard and data analysis tools for a government program (PARN).",
    participants: "Solo project",
    techno: "Django Rest Framework - React - DHIS2 - PostgreSQL - scikit_learn",
    society: "Project Coordination Unit",
    link: "none",
    date: "JUN - OCT 2024"
  },
  {
    name: "Dynamic Room Reservation Calendar",
    details: "Development of a room reservation management application, allowing users to manage absences and book vehicles for missions, optimizing resource organization.",
    participants: "Group of 2 (50% contribution)",
    techno: "Django Rest - React",
    society: "Project Coordination Unit",
    link: "none"
  },
  {
    name: "Internal Supply Chain System",
    details: "System designed to automate and optimize the purchasing process within a company, covering all stages from need expression to invoicing, with validation from Department Head, Finance, and Director.",
    participants: "Group of 3 (50% contribution)",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/Systeme-Commerciale"
  },
  {
    name: "CRUD Generator",
    details: "Generates a CRUD API (Spring Boot) with a Vue.js web interface based on a database. Automatically includes authentication, registration, navigation, CRUD operations, PDF import, pagination, and UI design. (git private)",
    participants: "Group of 2 (50% contribution)",
    techno: "Java - Vue.js",
    society: "School",
    link: "https://github.com/judi1968/Generate-crud-Pagination-and-Auth"
  },
  {
    name: "Android App - Car Sales Management",
    details: "Mobile app for managing the sales of used cars, registering client and vehicle details.",
    participants: "Group of 4 (100% contribution to mobile interface & deployment)",
    techno: "Ionic React",
    society: "School",
    link: "https://drive.google.com/file/d/1AlMbnATO4C2aezuQ2OzbaDKpsmK8SJGD/view"
  },
  {
    name: "Used Car Sales Website",
    details: "Website dedicated to selling used cars with advanced filters to simplify the search process.",
    participants: "Group of 4 (95% contribution to frontend)",
    techno: "React",
    society: "School",
    link: "https://varotravam.netlify.app/"
  },
  {
    name: "Medication Optimization for Diseases",
    details: "Optimization of the best set of medications for a given symptom to minimize waste and unnecessary expenses.",
    participants: "Solo project",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/optimisation-meilleur-medicament.git"
  },
  {
    name: "House Construction Quote Generator",
    details: "Project enabling clients to create customized quotes for house construction, with complete management of quotes, work progress tracking, and a dashboard for financial management.",
    participants: "Solo project",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/house_construction.git"
  },
  {
    name: "Dentistry",
    details: "A dentist app that calculates treatment costs. Set your budget and priority—cosmetic or health—and it chooses the best teeth to repair for maximum value.",
    participants: "Solo project",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/Dentisterie"
  },
  {
    name: "Human Resource Management System",
    details: "System automating and optimizing the recruitment process with quizzes, payroll management, leave tracking, and job application handling.",
    participants: "Group of 3 (60% contribution)",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/Ressource-Humaine.git"
  },
  {
    name: "Electricity Outage Prediction",
    details: "Predicts electricity outages based on prior data, sunlight levels, battery capacity, solar panel power, and student attendance.",
    participants: "Solo project",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/Prediction-Coupure-Electricite.git"
  },
  {
    name: "FIFO/LIFO Stock Management",
    details: "Stock management system for multiple stores with FIFO tracking, stock validation before actual withdrawal, and error handling.",
    participants: "Solo project",
    techno: "C# - HTML - CSS",
    society: "School",
    link: "https://github.com/ManoAndriasat/FIFO-LIFO.git"
  }
]

const skillsData = [
  {
    name: "UI/UX Developer",
    details:
      "I have a very particular interest in UI/UX development. I often use JavaScript frameworks and libraries like:",
    languages: ["React", "React Native", "Next", "Angular", "GSAP", "Tailwind", "Webflow"],
    bgColor: "#be5b2a",
  },
  {
    name: "BackEnd",
    details: "Skilled in server-side development and database management.",
    languages: ["Spring Boot", "ASP.net", "Express Js", "PostgreSQL", "Oracle", "MySql", "MongoDB"],
    bgColor: "#b6a897",
  },
  {
    name: "Designer",
    details: "Passionate about design and always looking for ways to improve. I occasionally use:",
    languages: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    bgColor: "#828d94",
  },
  {
    name: "Other Skills",
    details: "Additional skills that improve my development process and make my work more efficient:",
    languages: ["Git", "Docker", "Jira"],
    bgColor: "#d69a3f",
  }
];

export { Cards, skillsData };