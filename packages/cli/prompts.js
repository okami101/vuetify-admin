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
        name: "Guest",
        value: false,
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
];
