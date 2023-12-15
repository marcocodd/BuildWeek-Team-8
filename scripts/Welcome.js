const proceedButton = document.getElementById('proceed-button')
const checkBox = document.getElementById('accept')

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

const selectDifficulty = function () {
	const difficulty = document.getElementById('difficulty').value
	const numberQuestions = parseInt(document.getElementById('numberOfQuestions').value)
	console.log(difficulty, numberQuestions)
	if (isNaN(numberQuestions)) {
		numberQuestions = 10
	}
	if (numberQuestions < 5) {
		numberQuestions = 5
	}
	if (numberQuestions > 30) {
		numberQuestions = 30
	}

	const difficultyObject = {
		difficulty,
		amount: numberQuestions,
	}

	const JSONString = JSON.stringify(difficultyObject)

	localStorage.setItem('epicode-benchmark-setting', JSONString)

	if (checkBox.checked) {
		window.location.href = window.location.origin + '/Questionpage.html'
	}
}

document.getElementById('proceed-button').addEventListener('click', selectDifficulty)
