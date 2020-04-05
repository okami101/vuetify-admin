// these prompts are used if the plugin is late-installed into an existing
// project and invoked by `vue invoke`.

const prompts = (module.exports = [
  {
    type: "input",
    name: "locale",
    message: "The locale of project localiqdzation.",
    validate: (input) => !!input,
    default: "en",
  },
]);
