const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-apikey': 'd0dc001ece4000b8ef340d281d600ca253abb6cf1a9808848caee762c2d138fe'
    }
  };
  
  fetch('https://www.virustotal.com/api/v3/ip_addresses/8.8.8.8', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));