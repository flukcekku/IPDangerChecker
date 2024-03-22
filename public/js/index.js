document.getElementById('submitButton').addEventListener('click', function(event) {
    const ipAddress = document.getElementById('inputName').value;
    const virustotalAPI = '/virustotal?inputName=' + ipAddress;
    const abuseipdbAPI = '/abuseipdb?inputName=' + ipAddress;

    fetch(virustotalAPI)
    .then(response=>response.json())
    .then(data=> {
        const cisco_showData = document.getElementById('cisco_showData')
        const datastring = JSON.stringify(data)
        cisco_showData.innerText = 'data from server: ' + datastring

    })
    .catch(error => console.error("Error = ",error))

    // ฟังก์ชันสำหรับตรวจสอบว่า IP นั้นอันตรายหรือไม่
    // function isIpDangerous(data) {
    //     const abuseCategories = [
    //     // หมวดหมู่ที่บ่งชี้ว่า IP นั้นอาจอันตราย
    //     4, // การโจมตี DoS
    //     8, // การโจมตี VoIP
    //     11, // การโจมตีอีเมล
    //     14, // การสแกนพอร์ต
    //     15, // การโจมตี SSH
    //     18, // กิจกรรมที่น่าสงสัย
    //     20, // บอท
    //     21, // การโจมตีแบบ Brute-force
    //     22, // การโจมตี FTP
    //     ];
    
    //     // ตรวจสอบว่ามีรายงานการโจมตีในหมวดหมู่อันตรายหรือไม่
    //     const hasAbuseReports = data.reports.some(report => abuseCategories.includes(report.categories[0]));
    
    //     // ตรวจสอบคะแนนความน่าเชื่อถือของการโจมตี
    //     const isAbuseConfidenceHigh = data.abuseConfidenceScore >= 50;
    
    //     // ตรวจสอบว่า IP เป็น Data Center/Web Hosting/Transit หรือไม่
    //     const isDataCenterIp = data.usageType === "Data Center/Web Hosting/Transit";
    
    //     // สรุปผล
    //     return hasAbuseReports || isAbuseConfidenceHigh || isDataCenterIp;
    // }

    fetch(abuseipdbAPI)
    .then(response=>response.json())
    .then(data=> {
        const abuseipdb_showData = document.getElementById('abuseipdb_showData')
        const datastring = JSON.stringify(data)

        const {
            // isDangerous,
            countryCode,
            usageType,
            isp,
            domain,
            hostnames,
            isTor,
            countryName,
            totalReports,
            numDistinctUsers,
            lastReportedAt,
            reports,
          } = data.data;
        
          abuseipdb_showData.innerHTML = `
            <p>ผลลัพธ์สำหรับ IP ${ipAddress}:</p>
            <ul>
                <li>จำนวนรายงานทั้งหมด: ${totalReports}</li>
              <li>รหัสประเทศ: ${countryCode}</li>
              <li>ประเภทการใช้งาน: ${usageType}</li>
              <li>ผู้ให้บริการอินเทอร์เน็ต: ${isp}</li>
              <li>โดเมน: ${domain}</li>
              <li>ชื่อโฮสต์: ${hostnames.join(", ")}</li>
              <li>เป็น Tor หรือไม่: ${isTor}</li>
              <li>ชื่อประเทศ: ${countryName}</li>
              <li>จำนวนผู้ใช้ที่ไม่ซ้ำกัน: ${numDistinctUsers}</li>
              <li>เวลาที่รายงานล่าสุด: ${lastReportedAt}</li>
            </ul>
          `;
        
        // abuseipdb_showData.innerHTML = 'data from server: ' + datastring + data.data.isPublic

    })
    .catch(error => console.error("Error = ",error))
})