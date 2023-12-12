
const checkBox= document.getElementById('accept')
const proceedButton= document.getElementById('proceed-button')
checkBox.addEventListener('change', function() {
    if(this.checked) {
        proceedButton.disabled === false
    } else {
        proceedButton.disabled === true
    }
})
proceedButton.addEventListener('click', function(){
    if(checkBox.checked){
        Window.location.href = 'Questionpage.html'
    } else {alert('per procedere devi aver accettato i termini e le condizioni')}
})