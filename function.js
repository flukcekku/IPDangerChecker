
// function.js

// const fetch = require('node-fetch');


async function virusTotalFetchData(ipAddress) {
    try {
        const fetch = (await import('node-fetch')).default;
        const url = `https://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-apikey': 'd0dc001ece4000b8ef340d281d600ca253abb6cf1a9808848caee762c2d138fe',
        },
        };

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
        throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// async function abuseFetchData(ipAddress) {
// // const fetch = (await import('node-fetch')).default;
//     const AbuseIPDB = require('abuseipdb');

//     const apiKey = '14ba01a140f4c7ef32cb71e5c3c0daaaa382362c5381aa5970666b231b3899d324d5c7295464f1cc';

//     const client = new AbuseIPDB(apiKey);

//     try {
//         const response = await client.check(ipAddress);
//         if (response.success) {
//             const abuseData = await response.getData();
//             return abuseData;
//         } else {
//             console.log('response is not return');
//             return null;
//         }
//     } catch (error) {
//         console.error("ERROR" + error.message);
//         return null;
//     }
// }



// const fetch = require('node-fetch');

async function abuseFetchData(ipAddress) {
    const fetch = (await import('node-fetch')).default;
    const apiKey = '14ba01a140f4c7ef32cb71e5c3c0daaaa382362c5381aa5970666b231b3899d324d5c7295464f1cc';
    const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ipAddress)}&maxAgeInDays=90&verbose`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Key': apiKey,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// เรียกใช้งาน
// (async () => {
//     try {
//         const result = await checkAbuseIP('118.25.6.39');
//         console.log(result);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// })();


module.exports = { virusTotalFetchData, abuseFetchData };