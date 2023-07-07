const types = [
  "diagram",
  "feat",
  "fix",
  "setup",
  "chore",
  "devops",
  "test",
  "refactor",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", types],
  },
};
