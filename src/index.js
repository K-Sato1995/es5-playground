import CodeFlask from "codeflask";
import lint from "./eslint";
import "./style.css";

let code = `const msg = "Hello World"\n\nconst greeting = () => {\n  console.log(msg)\n}\n\ngreeting()\n\n`;

const editorElem = document.getElementById("editor");

const flask = new CodeFlask(editorElem, {
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
