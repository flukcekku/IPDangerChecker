// const fetch = require('node-fetch');
// function.js
async function virusTotalFetchData(ipAddress) {
    try {
      const fetch = (await import('node-fetch')).default; // เปลี่ยนเป็น dynamic import

        const url = `https://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-apikey': 'd0dc001ece4000b8ef340d281d600ca253abb6cf1a9808848caee762c2d138fe'
            }
        };

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();

            // เอาไว้ดูว่าข้อมูลมามั้ยเฉยๆจู้
            // console.log(JSON.stringify(data, null, 2));
            return data;
        } else {
            throw new Error('Network response was not ok.');
        }

    } catch (error) {
        console.error(error);
        return null; // หรือสามารถเลือกที่จะ return error ได้
    }
}

// เรียกใช้งานฟังก์ชัน fetchData() ที่เป็น async
module.exports = { virusTotalFetchData };
