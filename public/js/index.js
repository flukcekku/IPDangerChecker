document.getElementById('submitButton').addEventListener('click', function(event) {
    const ipAddress = document.getElementById('inputName').value;
    const api = '/virustotal?inputName=' + ipAddress;

    fetch(api)
    .then(response=>response.json())
    .then(data=> {
        const showData = document.getElementById('showData')
        const datastring = JSON.stringify(data)
        showData.innerText = 'data from server: ' + datastring

    })
    .catch(error => console.error("Error = ",error))
})