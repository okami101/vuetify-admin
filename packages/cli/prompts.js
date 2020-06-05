module.exports = [
  {
    type: "list",
    name: "dataProvider",
    message: "Select your suited data provider type :",
    default: false,
    choices: [
      {
        name: "None, I will write my own",
        value: false,
      },
      {
        name: "Laravel",
        value: "laravel",
      },
      {
        name: "Hydra (Symfony API Platform)",
        value: "hydra",
      },
      {
        name: "JSON Server",
        value: "jsonServer",
      },
    ],
  },
  {
    type: "list",
    name: "authProvider",
    message: "Select your suited authentication type :",
    default: false,
    choices: [
      {
        name: "Guest (so no login page template)",
        value: false,
      },
      {
        name: "I will implementing my own",
        value: "custom",
      },
      {
        name: "Laravel Sanctum (cookies)",
        value: "sanctum",
      },
      {
        name: "JWT",
        value: "jwt",
      },
      {
        name: "Basic HTTP",
        value: "basic",
      },
      {
        name: "Fake local authentication (no need of API server)",
        value: "fake",
      },
    ],
  },
  {
    type: "input",
    name: "apiURL",
    message: "URL of you API endpoint :",
    default: "http://localhost:3000",
  },
  {
    type: "checkbox",
    name: "locales",
    message: "Select supported locales :",
    default: ["en"],
    choices: [
      {
        name: "English",
        value: "en",
      },
      {
        name: "French",
        value: "fr",
      },
    ],
  },
  {
    type: "confirm",
    name: "profile",
    message: "Install profile pages template :",
    default: false,
  },
  {
    type: "confirm",
    name: "users",
    message: "Install default users CRUD pages templates :",
    default: false,
  },
  {
    type: "confirm",
    name: "impersonation",
    message: "Add impersonation feature :",
    default: false,
  },
  {
    type: "confirm",
    name: "material",
    message: "Install nice material theme with dashboard by Tim Creative :",
    default: false,
  },
];
