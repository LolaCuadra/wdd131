document.querySelector("#paymentMethod").addEventListener("change", togglePaymentDetails);
document.querySelector("#checkoutForm").addEventListener("submit", validateForm);

function togglePaymentDetails() {
    const theForm = document.querySelector("#checkoutForm");
    const creditCardContainer = document.getElementById("creditCardNumberContainer");
    const paypalContainer = document.getElementById("paypalUsernameContainer");
    const creditCardInput = theForm.creditCardNumber;
    const paypalInput = theForm.paypalUsername;

    // Hide both fields initially
    creditCardContainer.classList.add("hide");
    paypalContainer.classList.add("hide");
    creditCardInput.required = false;
    creditCardInput.disabled = true;
    paypalInput.required = false;
    paypalInput.disabled = true;

    // Show the selected payment method's field
    if (theForm.paymentMethod.value === "creditCard") {
        creditCardContainer.classList.remove("hide");
        creditCardInput.required = true;
        creditCardInput.disabled = false;
    } else if (theForm.paymentMethod.value === "paypal") {
        paypalContainer.classList.remove("hide");
        paypalInput.required = true;
        paypalInput.disabled = false;
    }
}

function validateForm(event) {
    const theForm = event.target;
    const errors = [];
    let isValid = true;

    // Validate Credit Card if selected
    if (theForm.paymentMethod.value === "creditCard" && theForm.creditCardNumber.value !== "1234123412341234") {
        isValid = false;
        errors.push("Invalid Credit Card Number");
    }

    // If errors exist, prevent form submission and show errors
    if (!isValid) {
        event.preventDefault();
        showErrors(errors);
        return false;
    }
}

function showErrors(errors) {
    const errorSection = document.querySelector(".errors");
    errorSection.innerHTML = ""; // Clear previous errors
    errors.forEach(error => {
        const errorElement = document.createElement("p");
        errorElement.textContent = error;
        errorSection.appendChild(errorElement);
    });
}
