let form = document.querySelector('#contactForm');

function showError(msg) {
    let error = document.querySelector('#contactForm .error');
    error.innerHTML = msg;
}

if (form) {
    let submit = document.querySelector('#contactForm a.button');
    submit.addEventListener('click', function (e) {

        showError('');
        let privacy = document.querySelector('#contactForm input[name=privacy]').checked;
        if (!privacy) {
            showError('Debes acceptar la política de privacidad');
            return
        }
        let name = document.querySelector('#contactForm input[name=name]').value;
        if (!name) {
            showError('Debes introducir tu nombre');
            return
        }
        let email = document.querySelector('#contactForm input[name=email]').value;
        if (!email) {
            showError('Debes introducir tu email');
            return
        }
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(validRegex)) {
            showError('Debes introducir un email válido');
            return
        }
        let message = document.querySelector('#contactForm textarea[name=message]').value;
        if (!message) {
            showError('Debes introducir algún mensaje');
            return
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.status == 200) {
                document.querySelector('#contactForm .success').innerHTML = 'Mensaje enviado correctamente';
            } else {
                showError('Error al enviar el mensaje');
            }
        }
        xhttp.open("POST", "https://hook.eu1.make.com/gfydbrtbiynpj1i4iwxcxxjpk3itgcxi");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            name: name, 
            email: email,
            message: message,
        }));

    });
}


function getCookie(name) {
    let result = false
    document.cookie.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        if (parts[0].trim() == name) {
            result = parts[1];
        }
    });
    return result;
}

const consentEvent = new Event('consent');

if (getCookie('limpiaplusConsent'))  {
    console.log('consent given');
    document.dispatchEvent(consentEvent);
} else {
    document.getElementById('consentModal').style.height = '200px';
    document.getElementById('consentModal').style.bottom = '0px';
    document.addEventListener('consent', function () {
        document.getElementById('consentModal').style.height = '0px';
        document.getElementById('consentModal').style.bottom = '-200px';
    });
}