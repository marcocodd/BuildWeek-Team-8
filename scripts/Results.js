window.addEventListener('load', () => {
	const correctPerc = document.getElementById('correctPerc')
	const wrongPerc = document.getElementById('wrongPerc')
	const correctNumber = document.getElementById('correctNumber')
	const wrongNumber = document.getElementById('wrongNumber')
	const totalQuestions = document.getElementsByClassName('totalQuestions')
	const results = JSON.parse(localStorage.getItem('results'))
	console.log(results)
	const correctAnswers = results.correctAnswers
	const wrongAnswers = results.wrongAnswers
	const total_questions = results.total_questions
	const correctPercNumberTarget =
		correctAnswers === 0 ? 0 : Math.floor((correctAnswers / total_questions) * 100)
	const wrongPercNumberTarget =
		wrongAnswers === 0 ? 0 : Math.floor((wrongAnswers / total_questions) * 100)

	document.getElementsByClassName('circle-text percentage')[0].innerHTML =
		correctPercNumberTarget >= 60
			? `<h3 class="bold">Congratulations!</h3>
                <h3 class="purpleH3 bold">You passed the exam.</h3>
                <span>
                  We'll send you the certificate in few minutes. Check your
                  email (including promotions / spam folder)
                </span>`
			: `<h3 class="bold">Sorry 😢</h3>
                <h3 class="purpleH3 bold">You failed the exam.</h3>`

	if (correctPercNumberTarget >= 60) {
		generateConfettis()
	}
	//apply the numeber of total questions for each totalQuestions HTML element
	for (let i = 0; i < totalQuestions.length; i++) {
		totalQuestions[i].innerText = total_questions
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

	incrementEffect(correctNumber, correctAnswers, 2500)
	incrementEffect(wrongNumber, wrongAnswers, 2500)

	document
		.getElementsByClassName('chart')[0]
		.style.setProperty('--perc', correctPercNumberTarget / 100)

	const detailsMainWarapper = document.getElementById('details')
	const iconList = [
		'fa-regular fa-circle',
		'fa-regular fa-circle-dot',
		' fa-solid fa-xmark',
		'fa-solid fa-check',
	]
	const details = results.details
	details.forEach((detail, index) => {
		const detailWrapper = document.createElement('div')
		detailWrapper.classList.add('detail-wrapper')
		const detailTitle = document.createElement('h3')
		let headerIcon = detail.given_answer === detail.correct_answer ? iconList[3] : iconList[2]
		detailTitle.innerHTML = `(${index + 1}) <i class="${headerIcon}"></i> ${detail.question}`
		detailWrapper.appendChild(detailTitle)
		detailsMainWarapper.appendChild(detailWrapper)
		const questionsUl = document.createElement('ul')
		questionsUl.classList.add('questions-ul')
		detail.answers.forEach(answer => {
			const li = document.createElement('li')
			const icon1 = answer === detail.given_answer ? iconList[1] : iconList[0]
			let icon2 =
				answer === detail.correct_answer
					? iconList[3]
					: answer === detail.given_answer
					? iconList[2]
					: ''
			icon2 = icon2 ? `<i class="${icon2}"></i>` : ''
			li.innerHTML = `<i class="${icon1}"></i> ${answer} ${icon2}`
			questionsUl.appendChild(li)
		})
		detailWrapper.appendChild(questionsUl)
	})
})
