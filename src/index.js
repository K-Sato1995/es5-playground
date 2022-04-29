import CodeFlask from "codeflask";
import Linter from "eslint4b";



let code = `var msg = "Hello World"\nconsole.log(test)`;
const flask = new CodeFlask("#editor", {
  language: "js",
  lineNumbers: true,
});

flask.updateCode(code);

flask.onUpdate((code) => {
  console.log(code);
});

const linter = new Linter();
const rules = linter.getRules();


// Verify a code.
// See the official document of the Linter class.
const messages = linter.verify(
    "var foo = 0",
    {
        rules: {
            semi: "error"
        }
    },
    { filename: "foo.js" }
);

// const lint = () => {
//   try {
//     const { messages, output } = linter.verifyAndFix(
//       this.state.text,
//       this.state.options,
//       { fix: this.state.fix }
//     );
//     let fatalMessage;

//     if (messages && messages.length > 0 && messages[0].fatal) {
//       fatalMessage = messages[0];
//     }
//     return {
//       messages,
//       output,
//       fatalMessage,
//     };
//   } catch (error) {
//     return {
//       messages: [],
//       output: this.state.text,
//       error,
//     };
//   }
// };
