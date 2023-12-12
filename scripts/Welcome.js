
const checkBox= document.getElementById('accept')
const proceedButton= document.getElementById('proceedButton')
checkBox.addEventListener('change', function() {
    if(this.checked) {
        proceedButton.disabled === false
    } else {
        proceedButton.disabled === true
    }
})