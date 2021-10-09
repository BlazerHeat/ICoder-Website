const queAns = require('../database/models/queAns');
const chalk = require('chalk');


queAns.create({

    lang: "java",
    head: "Java BigInteger",
    description: "Easy",
    difficulty: 0,
    maxScore: 5,
    question: "In this problem, you have to add and multiply huge numbers! These numbers are so big that you can't contain them in any ordinary data types like a long integer.\n\nUse the power of Java's BigInteger class and solve this problem.",
    stdin: "1234\n20",
    stdout: "1254\n24680\n",

    inputFormat: "There will be two lines containing two numbers, A and B.",
    constraints: "A and B are non-negative integers and can have maximum 200 digits.",
    outputFormat: "Output two lines. The first line should contain A&#43;B, and the second line should contain A&#215;B. Don't print any leading zeros.",

    sampleInput: "1234\n20",
    sampleOutput: "1254\n24680",

    explanation: "1234&#43;20&#61;1254\n1234&#215;20&#61;24680",

    boilerplateCode: "import java.io.*;\n" +
        "import java.util.*;\n" +
        "import java.text.*;\n" +
        "import java.math.*;\n" +
        "import java.util.regex.*;\n" +
        "\n" +
        "public class Solution {\n" +
        "\n" +
        "    public static void main(String[] args) {\n" +
        "        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n" +
        "    }\n" +
        "}"
}).catch(err => {
    console.error(chalk.red(err.toString()));
});