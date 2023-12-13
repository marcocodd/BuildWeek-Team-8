// import { questions } from './questionsArray.js'
// console.log(questions)
let questions = []
const questionsWrapper = document.getElementById('questions-wrapper')
const questionTitle = document.getElementById('questionTitle')
const currentQuestionionNumber = document.getElementById('currentQuestionionNumber')
document.getElementById('totalQuestionionNumber').innerText = questions.length
const TimerText = document.getElementById('TimerText')
const timerDonut = document.getElementById('timerDonut')

let questionIndex = 0
const defaultTimer = 10
let timer = defaultTimer + 1
let intervalID = null
let answer = ''
let correctAnswers = 0
const autoRedirect = false

const getQuestions = async () => {
	return fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			if (data.response_code === 0) {
				return data.results
			}
		})
		.catch(err => null)
}

const start = async () => {
	questions = await getQuestions()
	console.log('')
	startTimer()
	showQuestion()
}

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
	for (let i = 0; i < answers.length; i++) {
		const button = document.createElement('button')
		button.innerHTML = answers[i]
		button.classList.add('btn')
		button.addEventListener('click', e => {
			answer = button.innerText
			button.classList.add('selected')
			const buttons = document.getElementsByClassName('btn')
			for (let i = 0; i < buttons.length; i++) {
				if (buttons[i].innerText !== answer) {
					buttons[i].classList.remove('selected')
				}
			}
		})
		questionsWrapper.appendChild(button)
	}
}

const startTimer = async () => {
	console.log('questions', questions)
	currentQuestionionNumber.innerText = questionIndex + 1
	intervalID = setInterval(() => {
		timer--
		TimerText.innerText = timer
		timerDonut.style.setProperty('--perc', timer / defaultTimer)
		timerDonut.addEventListener('transitionend', nextAnswer)
	}, 1000)
}

// go to next question if the current index is less than the length of the questions array - 1
const nextAnswer = () => {
	if (questionIndex <= questions.length - 1) {
		if (timer === 0) {
			verifyAnswer()
			timer = defaultTimer + 1
			answer = ''
			questionsWrapper.innerHTML = ''

			// if the current index is 0, then we need to increment it by 1
			// to pass to the next question
			if (questionIndex === 0) {
				questionIndex++
			}
			currentQuestionionNumber.innerText = questionIndex + 1
			showQuestion()

			// if the current index is not 0, then we need to increment it by 1
			if (questionIndex > 0) {
				questionIndex++
			}
		}
	} else {
		//stop the time the current index is more than the length of the questions array - 1
		stopTimer()
		localStorage.setItem('score', correctAnswers + '-' + questions.length)
		if (autoRedirect) {
			window.location.href = window.location.origin + '/Resultspage.html'
		}
		return
	}
}
const stopTimer = () => {
	clearInterval(intervalID)
	intervalID = null
	console.log('end timer')
}

//verify if the answer is correct
const verifyAnswer = () => {
	if (answer == questions[questionIndex].correct_answer) {
		correctAnswers++
	}
}

start()
