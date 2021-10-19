const form = document.querySelector('form');
const applyBtn = document.querySelector('.apply-btn');
const filterIcon = document.getElementById('filter-icon');
const questionsForm = document.querySelector('.questions-form');

form.addEventListener('change', function() {
    applyBtn.classList.remove('hide')
});

filterIcon.addEventListener('click', () => {
    if(questionsForm.classList.contains('open-questions-form'))
        questionsForm.classList.remove('open-questions-form');
    else
        questionsForm.classList.add('open-questions-form');
});