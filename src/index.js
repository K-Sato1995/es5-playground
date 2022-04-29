import CodeFlask from "codeflask";
// Copied the versions from here: https://github.com/node-red/nrlint/blob/master/package.json#L50
import Linter from "eslint4b";

let code = `var msg = "Hello World"\nconsole.log(msg)`;

const linter = new Linter();

linter.defineRule("no-es6-funcs", {
  meta: {
    docs: {
      recommended: false
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if(!node.callee || !node.callee.property) {
          return;
        }
        const functionName = node.callee.property.name;
        const es6ArrayFunctions = [
          'find',
          'findIndex',
          'copyWithin',
          'values',
          'fill'
        ];
        const es6StringFunctions = [
          'startsWith',
          'endsWith',
          'includes',
          'repeat'
        ];
        const es6Functions = [].concat(
          es6ArrayFunctions,
          es6StringFunctions
        );
        if (es6Functions.indexOf(functionName) > -1) {
          context.report({
            node: node.callee.property,
            message: 'ES6 methods not allowed: ' + functionName
          });
        }
      }
    };
  }
})


const lint = (code) => {
  const rules = linter.getRules();

  console.log(rules)

  
  // Set reccomended rules
  const ruleConfig = [...rules.entries()].reduce((result, [ruleId, rule]) => {
    if (rule.meta.docs.recommended) {
        result[ruleId] = 2;
    }
    return result;
}, {})

  const messages = linter.verify(
    code,
    {
      parserOptions: {
        ecmaVersion: 5,
      },
      rules: {
        ...ruleConfig,
        'no-undef': 0,
        'unusedVar': 0,
        "no-es6-funcs": 2
      },
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
