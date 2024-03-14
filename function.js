const axios = require('axios');

async function virusTotalFetchData(ipAddress) {
    try {
      const url = `https://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`;
      const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          'x-apikey': 'd0dc001ece4000b8ef340d281d600ca253abb6cf1a9808848caee762c2d138fe'
        }
      };
  
      const response = await axios.request(options);

      //เอาไว้ดูว่าข้อมูลมามั้ยเฉยๆจู้
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.error(error);
      return null; // หรือสามารถเลือกที่จะ return error ได้
    }
  }

// เรียกใช้งานฟังก์ชัน fetchData() ที่เป็น async
module.exports = { virusTotalFetchData }
