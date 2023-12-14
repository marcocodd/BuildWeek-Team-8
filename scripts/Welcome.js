const checkBox = document.getElementById('accept')
const proceedButton = document.getElementById('proceed-button')
console.log(proceedButton)
checkBox.addEventListener('change', function () {
	console.log(this.checked)
	if (this.checked) {
		proceedButton.disabled = false
	} else {
		proceedButton.disabled = true
	}
	console.log(proceedButton, proceedButton.disabled)
})
proceedButton.addEventListener('click', function () {
	if (checkBox.checked) {
		window.location.href = 'Questionpage.html'
	} else {
		alert('per procedere devi aver accettato i termini e le condizioni')
	}
})

const selectDifficulty = function() {
    const difficulty = document.getElementById("difficulty").value;
    const numQuestions = parseInt(document.getElementById("numberQuestions").value);
    if (numQuestions < 5 || numQuestions > 30) {
        alert("Number must be between 5 and 30.");
        return;
    }
    console.log("Difficulty selected:", difficulty);
    console.log("Number questions:", numQuestions);

	window.location.href = "Welcomepage.html" + "Questionpage.html"

}
