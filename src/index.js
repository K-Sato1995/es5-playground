import CodeFlask from "codeflask";
// Copied the versions from here: https://github.com/node-red/nrlint/blob/master/package.json#L50
import Linter from "eslint4b";

let code = `var msg = "Hello World"\nconsole.log(msg)`;

const linter = new Linter();

const lint = (code) => {
  const rules = linter.getRules();

  // Set reccomended rules
  const ruleConfig = [...rules.entries()].reduce((result, [ruleId, rule]) => {
    if (rule.meta.docs.recommended) {
        result[ruleId] = 2;
    }
    return result;
}, {})

  // Verify a code.
  // See the official document of the Linter class.
  const messages = linter.verify(
    code,
    {
      parserOptions: {
        ecmaVersion: 3
      },
      rules: {
        ...ruleConfig,
        'no-undef': 0
      }
    },
  );

  return messages;
};

const flask = new CodeFlask("#editor", {
  language: "js",
  lineNumbers: true,
});

flask.updateCode(code);

flask.onUpdate((code) => {
  const messages = lint(code);
  console.log(messages);

  document.getElementById("lint-errors").innerHTML = (`<pre>${JSON.stringify(messages)}</pre>`);
});
