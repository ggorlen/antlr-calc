import antlr4 from "antlr4";
import ExprLexer from "./parser/ExprLexer";
import ExprParser from "./parser/ExprParser";
import ExprVisitor from "./parser/ExprVisitor";
import "./style.css";

const evaluateExpr = expr => {
  const errors = {};
  const input = new antlr4.InputStream(expr);
  const lexer = new ExprLexer(input);
  const tokens = new antlr4.CommonTokenStream(lexer);

  const parser = new ExprParser(tokens);
  parser.buildParseTrees = true;
  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
      errors[line] = {line, column, msg};
    }
  });

  const tree = parser.prog();
  const visitor = new ExprVisitor(errors);
  return [errors, tree.accept(visitor)];
};

const errorElem = document.querySelector("#expr-errors");
const inputElem = document.querySelector("#expr-input");
const resultElem = document.querySelector("#expr-results");
resultElem.innerHTML = evaluateExpr(inputElem.value)[1].join("<br>");

inputElem.addEventListener("keyup", event => {
  errorElem.innerText = "";
  resultElem.innerText = "";
  let errors, results;

  try {
    [errors, results] = evaluateExpr(event.target.value + "\n");

    for (const k in errors) {
      const e = errors[k];
      errors[k] = `<span class="error">${e.line},${e.column}: ${e.msg}</span>`;
    }

    resultElem.innerHTML = results.map((e, i) => errors[i+1] || e).join("<br>");
  } 
  catch (err) {
    errorElem.textContent = err;
  }
});

