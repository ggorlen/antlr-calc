// Generated from grammar/Expr.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import ExprLexer from "./ExprLexer";

// This class defines a complete generic visitor for a parse tree produced by ExprParser.

export default class ExprVisitor extends antlr4.tree.ParseTreeVisitor {
  constructor() {  
    super();
    this.memory = {};
  }

  // Visit a parse tree produced by ExprParser#prog.
  visitProg(ctx) {
    return this.visitChildren(ctx).filter(e => !isNaN(e));
  }


  // Visit a parse tree produced by ExprParser#expressionStatement.
  visitExpressionStatement(ctx) {
    return this.visit(ctx.expr());
  }


  // Visit a parse tree produced by ExprParser#assignment.
  visitAssignment(ctx) {
    return this.memory[ctx.ID().getText()] = this.visit(ctx.expr());
  }


  // Visit a parse tree produced by ExprParser#newline.
  visitNewline(ctx) {
    return this.visitChildren(ctx);
  }


  // Visit a parse tree produced by ExprParser#number.
  visitNumber(ctx) {
    return +ctx.getText();
  }


  // Visit a parse tree produced by ExprParser#identifier.
  visitIdentifier(ctx) {
    const id = ctx.ID().getText();

    if (id in this.memory) {
      return this.memory[ctx.ID().getText()];
    }
    
    const {line, column} = ctx.start;
    throw Error(`${line},${column}: identifier ${id} must be initialized before use`);
  }


  // Visit a parse tree produced by ExprParser#addSub.
  visitAddSub(ctx) {
    const left = this.visit(ctx.lhs);
    const right = this.visit(ctx.rhs);
     
    if (ExprLexer.literalNames[ctx.op.type] === "'+'") {
      return left + right;
    }
     
    return left - right;
  }


  // Visit a parse tree produced by ExprParser#parenExpr.
  visitParenExpr(ctx) {
    return this.visit(ctx.expr());
  }


  // Visit a parse tree produced by ExprParser#mulDiv.
  visitMulDiv(ctx) {
    const left = this.visit(ctx.lhs);
    const right = this.visit(ctx.rhs);
    
    if (ExprLexer.literalNames[ctx.op.type] === "'*'") {
      return left * right;
    }
    
    return left / right;
  }


  // Visit a parse tree produced by ExprParser#exponentiate.
  visitExponentiate(ctx) {
    const left = this.visit(ctx.lhs);
    const right = this.visit(ctx.rhs);
    return left ** right;
  }
}
