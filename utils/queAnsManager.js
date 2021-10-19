const queAns = require('../database/models/queAns');
const chalk = require('chalk');
const question = require('./question.json');

question.boilerplateCode =
    "import java.util.*;\n" +
    "class Solution{\n" +
    "\t\n" +
    "\tpublic static void main(String []argh)\n" +
    "\t{\n" +
    "\t\tScanner sc = new Scanner(System.in);\n" +
    "\t\t\n" +
    "\t\twhile (sc.hasNext()) {\n" +
    "\t\t\tString input=sc.next();\n" +
    "            //Complete the code\n" +
    "\t\t}\n" +
    "\t\t\n" +
    "\t}\n" +
    "}";


    console.log(question);















queAns.create(question).catch(err => {
    console.error(chalk.red(err.toString()));
});