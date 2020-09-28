const form = document.querySelector(".form.create.address");
const inputs = form.querySelectorAll("[name]");
const URL = "http://localhost:8888/";

function createAddress(evt) {
    evt.preventDefault();

    const address = {};
    inputs.forEach((inpt) => (address[inpt.name] = inpt.value));

    axios
        .post(URL + "/address/create", address)
        .then((serverResponse) => {
            console.log(serverResponse);
        })
        .catch((serverError) => {
            console.error(serverError);
        });
}

form.onsubmit = createAddress;