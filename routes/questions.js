const queAns = require('../database/models/queAns');
const users = require('../database/models/user');
const router = require('express').Router();
const authCheck = require('../utils/authcheck');
const compiler = require("../utils/compiler");

router.use(authCheck);
router.use('/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if(lang !== 'java' && lang !== 'cpp' && lang !== 'python')
        res.status(302).redirect('/prepare');
    else
        next();
});

function getFormValues(reqStatus, reqDiff){
    let status = [false, false];
    let difficulty = [false, false, false];

    if(reqStatus){
        if(reqStatus.includes('solved') && reqStatus !== 'unsolved')
            status[0] = true;
        if(reqStatus.includes('unsolved'))
            status[1] = true;
    }
    if(!status[0] && !status[1])
        status = [false, true];


    if(reqDiff){
        if(reqDiff.includes('easy'))
            difficulty[0] = true;
        if(reqDiff.includes('medium'))
            difficulty[1] = true;
        if(reqDiff.includes('hard'))
            difficulty[2] = true;
    }
    if(!difficulty[0] && !difficulty[1] && !difficulty[2])
        difficulty = [true, false, false];

    return {status, difficulty};
}
async function getQuestions(lang, diff){
    if(lang === 'python')
        lang = 'python3';

    if(diff[0] && diff[1] && diff[2])
        return queAns.find({ lang });

    if(diff[0] && !diff[1] && !diff[2])
        return queAns.find({lang, difficulty: 0 });
    if(!diff[0] && diff[1] && !diff[2])
        return queAns.find({lang, difficulty: 1 });
    if(!diff[0] && !diff[1] && diff[2])
        return queAns.find({lang, difficulty: 2 });

    if(diff[0] && diff[1] && !diff[2])
        return queAns.find({lang, difficulty: { $ne: 2 } });
    if(!diff[0] && diff[1] && diff[2])
        return queAns.find({lang, difficulty: { $ne: 0 } });
    if(diff[0] && !diff[1] && diff[2])
        return queAns.find({lang, difficulty: { $ne: 1 } });
}
function filterQuestions(questions, status, user){
    if(status[0] && status[1]) {
        questions.filter(x => user.solved.includes(x.id)).forEach(x => {
            x.solved = true;
        });
        return questions;
    }
    else if(status[0]){
        questions = questions.filter(x => user.solved.includes(x.id));
        questions.forEach(x => {
            x.solved = true;
        });
        return questions;
    }
    else if(status[1])
        return questions.filter(x => !user.solved.includes(x.id));
}

router.get('/', (req, res) => {
    res.status(302);
    res.redirect('/prepare');
});
router.get('/:lang', async (req, res) => {
   const lang = req.params.lang;
   const {status, difficulty} = getFormValues(req.query.status, req.query.difficulty);

   const questions = filterQuestions(await getQuestions(lang, difficulty), status, req.user);

   let title;
   switch (lang){
       case 'java':
           title = 'JAVA';
           break;
       case 'python':
           title = 'PYTHON';
           break;
       case 'cpp':
           title = 'C++';
           break;
   }


   res.status(202);
   res.render('questions', { title, user: req.user, questionStatus: status, difficulty, language: lang, questions });
});



function reformat(text){
    if(text)
        return text.replace(/(\r\n|\r|\n)/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    return null;
}
async function fetchData(id){
    const result = await queAns.findOne({ _id: id });
    return  {
        id: result.id,
        lang: result.lang,
        title: reformat(result.head),
        description: reformat(result.description),
        difficulty: result.difficulty,
        maxScore: result.maxScore,
        question: reformat(result.question),
        stdin: result.stdin,
        stdout: result.stdout,
        inputFormat: reformat(result.inputFormat),
        constraints: reformat(result.constraints),
        outputFormat: reformat(result.outputFormat),
        sampleInput: reformat(result.sampleInput),
        sampleOutput: reformat(result.sampleOutput),
        explanation: reformat(result.explanation),
        boilerplate: result.boilerplateCode,
        message: null
    }
}

router.get('/:lang/:id', async (req, res) => {

    const data = await fetchData(req.params.id);

    res.status(202);
    res.render("problem", { user: req.user, ...data, scrollToResult: false });
});
router.post('/:lang/:id', async (req, res) => {
    const user = req.user;
    let data = await fetchData(req.params.id);

    data.boilerplate = req.body.script;
    data.themeName = req.body.theme;
    const { boilerplate: script, lang, stdin, stdout } = data;
    const { output, err } = await compiler(lang, script, stdin);

    const result = {
        success: false,
        output: reformat(output),
        stdin: reformat(stdin),
        stdout: reformat(stdout)
    }


    if(err){
        res.status(500);
        res.render("error", { statusCode: res.statusCode, errorText: err, errorDesc: null });
        return;
    }

    let alreadySolved = false;
    if(output === stdout || output + '\n' === stdout){
        result.success = true;
        result.message = "Congratulations!";

        alreadySolved = user.solved.includes(data.id);
        if(!alreadySolved){
            user.javaPoints += data.maxScore;
            user.solved.push(req.params.id);
            await users.findOneAndUpdate({ id: user.id }, { javaPoints: user.javaPoints, solved: user.solved });
        }
    }
    else {
        result.message = "Wrong Answer!";
    }

    res.status(202);
    res.render("problem", { user, ...data, result, alreadySolved, scrollToResult: true });
});

module.exports = router;