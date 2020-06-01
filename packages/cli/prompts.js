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
        name: "Guest (so no login or profile pages)",
        value: false,
      },
      {
        name: "I will implementing my own",
        value: "custom",
      },
      {
        name: "Larvel Sanctum (cookies)",
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
    ],
  },
  {
    type: "input",
    name: "apiURL",
    message: "URL of you API endpoint :",
    default: "http://localhost:3000",
  },
  {
    type: "confirm",
    name: "users",
    message: "Install default users CRUD pages templates :",
    default: false,
  },
  {
    type: "confirm",
    name: "materialTheme",
    message: "Install nice material theme override by Tim Creative :",
    default: false,
  },
  {
    type: "confirm",
    name: "staticDashboard",
    message: "Use nice default material dashboard with static data :",
    default: false,
  },
];
