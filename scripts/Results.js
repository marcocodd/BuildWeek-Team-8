const correctPerc = document.getElementById('correctPerc')
const wrongPerc = document.getElementById('wrongPerc')
const correctNumber = document.getElementById('correctNumber')
const wrongNumber = document.getElementById('wrongNumber')
const totalQuestions = document.getElementsByClassName('totalQuestions')
const answers = localStorage.getItem('score').split('-')

const correctTarget = answers[0]
const totalTarget = answers[1]
const correctPercNumberTarget = Math.floor((correctTarget / totalTarget) * 100)
const wrongPercNumberTarget = Math.floor(((totalTarget - correctTarget) / totalTarget) * 100)

for (let i = 0; i < totalQuestions.length; i++) {
	totalQuestions[i].innerText = totalTarget
}

const incrementEffect = (element, targetNumber, duration) => {
	let start = null
	const step = timestamp => {
		if (!start) start = timestamp
		const progress = timestamp - start
		const rate = Math.min(progress / duration, 1) // Ensure it doesn't go over 1
		const easeOut = 1 - Math.pow(1 - rate, 3) // Cubic easing out

		const currentNumber = Math.round(easeOut * targetNumber)
		element.innerText = currentNumber.toString().padStart(2, '0')

		if (progress < duration) {
			requestAnimationFrame(step)
		} else {
			element.innerText = targetNumber.toString().padStart(2, '0') // Ensure it ends at targetNumber
		}
	}
	requestAnimationFrame(step)
}
//correct answers percentage
incrementEffect(correctPerc, correctPercNumberTarget, 2500)
//wrong answers percentage
incrementEffect(wrongPerc, wrongPercNumberTarget, 2500)

incrementEffect(correctNumber, correctTarget, 2500)
incrementEffect(wrongNumber, totalTarget - correctTarget, 2500)

document
	.getElementsByClassName('chart')[0]
	.style.setProperty('--perc', correctPercNumberTarget / 100)
