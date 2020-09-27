module.exports = [
  {
    type: "input",
    name: "apiURL",
    message: "URL of you API endpoint :",
    default: "http://localhost:3000",
  },
  {
    type: "list",
    name: "dataProvider",
    message: "Select your suited data provider type :",
    default: false,
    choices: [
      {
        name: "None (just the basic admin layout)",
        value: false,
      },
      {
        name: "I will implementing my own",
        value: "custom",
      },
      {
        name: "Laravel using Spatie query builder",
        value: "laravel",
      },
      {
        name: "Hydra for Symfony API Platform",
        value: "hydra",
      },
      {
        name: "JSON Server as fake REST API",
        value: "jsonServer",
      },
      {
        name: "Simple REST API",
        value: "simpleRest",
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
        name: "Guest (no login page template)",
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
    type: "checkbox",
    name: "auth",
    message: "Select additional authentication templates to add :",
    default: [],
    choices: [
      {
        name: "Registration form for public user creation",
        value: "register",
      },
      {
        name: "Reset forms templates for password reset",
        value: "reset",
      },
      {
        name: "Profile form template for account and password editing",
        value: "profile",
      },
    ],
    when: (input) => !!input.authProvider,
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
];
