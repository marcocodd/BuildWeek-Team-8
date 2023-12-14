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
    const numberQuestions = parseInt(document.getElementById("numberQuestions").value);
    if (numberQuestions < 5 || numberQuestions > 30) {
        alert("Number must be between 5 and 30.");
    }

	const difficultyObject = {
        amount: difficulty,
        numberQuestions: numberQuestions
    }

	const JSONString = JSON.stringify(difficultyObject);

	localStorage('epicode-benchmark-setting', JSONString);

    window.location.href = window.location.origin + "/Questionpage.html"
}