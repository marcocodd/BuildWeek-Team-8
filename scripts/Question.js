// import { questions } from './questionsArray.js'
console.log(questions)
const questionsWrapper = document.getElementById('questions-wrapper')
const questionTitle = document.getElementById('questionTitle')
const currentQuestionionNumber = document.getElementById('currentQuestionionNumber')
document.getElementById('totalQuestionionNumber').innerText = questions.length
const TimerText = document.getElementById('TimerText')

let questionIndex = 0
const defaultTimer = 10
let timer = defaultTimer
let intervalID = null
let answer = ''
let correctAnswers = 0

const shuffle = array => {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}

	return array
}

const showQuestion = () => {
	const question = questions[questionIndex]
	questionTitle.innerHTML = question.question
	let answers = question.incorrect_answers
	answers.push(question.correct_answer)
	answers = shuffle(answers)
	console.log(answers)
	for (let i = 0; i < answers.length; i++) {
		const button = document.createElement('button')
		button.innerHTML = answers[i]
		button.classList.add('btn')
		button.addEventListener('click', e => {
			answer = button.innerText
			button.classList.add('selected')
			const buttons = document.getElementsByClassName('btn')
			console.log(buttons)
			for (let i = 0; i < buttons.length; i++) {
				if (buttons[i].innerText !== answer) {
					buttons[i].classList.remove('selected')
				}
			}
		})
		questionsWrapper.appendChild(button)
	}
}

const startTimer = () => {
	currentQuestionionNumber.innerText = questionIndex + 1
	intervalID = setInterval(() => {
		timer--
		TimerText.innerText = timer
		if (timer === 0) {
			verifyAnswer()
			nextAnswer()
		}
		if (questionIndex === questions.length - 1) {
			stopTimer()
			localStorage.setItem('score', correctAnswers + '-' + questions.length)
			// window.location.href = window.location.origin + '/Resultspage.html'
		}
	}, 1000)
}

const nextAnswer = () => {
	timer = defaultTimer
	answer = ''
	questionIndex++
	questionsWrapper.innerHTML = ''
	currentQuestionionNumber.innerText = questionIndex + 1
	showQuestion()
}
const stopTimer = () => {
	clearInterval(intervalID)
	intervalID = null
}

//verify if the answer is correct
const verifyAnswer = () => {
	if (answer == questions[questionIndex].correct_answer) {
		correctAnswers++
	}
}

startTimer()
showQuestion()
console.log(window.location)
