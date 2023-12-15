const generateConfettis = () => {
	const generateConfetti = () => {
		var coriandolo = document.createElement('div')
		coriandolo.classList.add('confetti')

		// Colori dei coriandoli
		var colori = ['#fff', '#c2128d', '#00ffff', '#ffff00', '#2cff00']
		var coloreCasuale = colori[Math.floor(Math.random() * colori.length)]
		coriandolo.style.backgroundColor = coloreCasuale

		// Posizione e animazione
		coriandolo.style.left = Math.random() * 100 + '%'
		var durataAnimazione = 3 + Math.random() // Durata casuale tra 3 e 4 secondi
		coriandolo.style.animation = `fall ${durataAnimazione}s linear forwards`

		document.getElementById('confettis').appendChild(coriandolo)

		// Rimozione dopo l'animazione
		setTimeout(function () {
			coriandolo.remove()
		}, durataAnimazione * 1000)
	}

	// Aumento della frequenza di generazione dei coriandoli
	var interval = setInterval(generateConfetti, 25)

	// Arresto della generazione dopo 3 secondi
	setTimeout(function () {
		clearInterval(interval)
	}, 3000)
}
