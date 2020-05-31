module.exports = [
  {
    type: "list",
    name: "authentication",
    description: "Select authentication type",
    default: "guest",
    choices: [
      {
        name: "Guest",
        value: "guest",
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
