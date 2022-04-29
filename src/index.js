import CodeFlask from "codeflask";
import lint from './eslint'

let code = `var msg = "Hello World"\nconsole.log(msg)`;

const flask = new CodeFlask("#editor", {
  language: "js",
  lineNumbers: true,
});

flask.updateCode(code);

flask.onUpdate((code) => {
  const messages = lint(code);
  console.log(messages);

  document.getElementById("lint-errors").innerHTML = `<pre>${JSON.stringify(
    messages
  )}</pre>`;
});
