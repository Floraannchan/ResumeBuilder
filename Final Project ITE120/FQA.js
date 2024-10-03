document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const toggleBtn = question.querySelector('.toggle-btn');

        if (!answer.classList.contains('open')) {
            answer.classList.add('open');
            toggleBtn.textContent = "-";
        } else {
            answer.classList.remove('open');
            toggleBtn.textContent = "+";
        }
    });
});
