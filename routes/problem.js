const router = require('express').Router();
const queAns = require('../database/models/queAns');
const chalk = require("chalk");
const compiler = require("../compiler");

function replaceBreakLineWithBr(text){
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

async function fetchData(){
    const result = await queAns.findOne();
    return  {
        lang: result.lang,
        title: replaceBreakLineWithBr(result.head),
        description: replaceBreakLineWithBr(result.description),
        difficulty: result.difficulty,
        maxScore: result.maxScore,
        question: replaceBreakLineWithBr(result.question),
        stdin: result.stdin,
        stdout: result.stdout,
        inputFormat: replaceBreakLineWithBr(result.inputFormat),
        constraints: replaceBreakLineWithBr(result.constraints),
        outputFormat: replaceBreakLineWithBr(result.outputFormat),
        sampleInput: replaceBreakLineWithBr(result.sampleInput),
        sampleOutput: replaceBreakLineWithBr(result.sampleOutput),
        explanation: replaceBreakLineWithBr(result.explanation),
        boilerplate: result.boilerplateCode,
        message: null
    }
}

router.get('/', async (req, res) => {
    const data = await fetchData();
    res.status(202);
    res.render("problem", data);
});

router.post('/', async (req, res) => {
    let data = await fetchData();
    data.boilerplate = req.body.script;

    const { boilerplate: script, lang, stdin, stdout } = data;
    const { output, err } = await compiler(lang, script, stdin);

    if(err){
        res.status(500);
        res.render("error", { statusCode: res.statusCode, errorText: err, errorDesc: null });
        return;
    }


    if(output === stdout || output + '\n' === stdout)
        data.message = "Correct Code!";
    else
        data.message = "Incorrect Code!";

    res.status(202);
    res.render("problem", data);
});


module.exports = router;