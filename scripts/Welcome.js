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
		Window.location.href = 'Questionpage.html'
	} else {
		alert('per procedere devi aver accettato i termini e le condizioni')
	}
})
