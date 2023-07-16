const types = [
  "diagram",
  "feat",
  "fix",
  "setup",
  "chore",
  "devops",
  "test",
  "refactor",
  "api",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", types],
  },
};
