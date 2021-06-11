grammar Expr;

prog: stat+;

stat
    : expr NEWLINE        # expressionStatement
    | ID '=' expr NEWLINE # assignment
    | NEWLINE             # newline
    ;

expr
    : lhs=expr '**' rhs=expr         # exponentiate
    | lhs=expr op=('*'|'/') rhs=expr # mulDiv
    | lhs=expr op=('+'|'-') rhs=expr # addSub
    | NUMBER                         # number
    | ID                             # identifier
    | '(' expr ')'                   # parenExpr
    ;

ID: [a-zA-Z_]+[0-9a-zA-Z_]*;
NUMBER: ([0-9]|[1-9][0-9]+)|[0-9]+ '.' [0-9]*;
NEWLINE: '\r'? '\n';
WS: [ \t]+ -> skip;

ErrorCharacter: .;
