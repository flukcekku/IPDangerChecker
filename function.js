const axios = require('axios');

async function virusTotalFetchData() {
  try {
    // กำหนด headers ที่ต้องการส่งไปกับ request
    const headers = {
      'Authorization': 'd0dc001ece4000b8ef340d281d600ca253abb6cf1a9808848caee762c2d138fe',
      'Content-Type': 'application/json'
    };

    // กำหนด config object ในการส่ง request พร้อมกับ headers
    const config = {
      headers: headers
    };

    // ใช้ await เพื่อรอให้การเรียก Axios เสร็จสิ้นและรับ response
    const response = await axios.get('https://www.virustotal.com/api/v3/ip_addresses/', config);
    
    // ใช้ข้อมูลที่ได้รับกลับมาจาก response
    console.log('Response:', response.data);
  } catch (error) {
    // ในกรณีที่เกิด error ในการส่ง request หรือรับ response
    console.error('Error:', error);
  }
}

// เรียกใช้งานฟังก์ชัน fetchData() ที่เป็น async
module.exports = { virusTotalFetchData }
