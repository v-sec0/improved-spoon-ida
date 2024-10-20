jQuery(() => {
    console.log("Ready to rumble!");
    (() => {
        'use strict'

        // Variables
        let submitButton = $("#submitButton");

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = $('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    submitButton.html("check")
                    submitButton.removeClass("submit")
                    submitButton.addClass("edit");
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()
});
