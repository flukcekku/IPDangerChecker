document.getElementById('submitButton').addEventListener('click', function(event) {
    const ipAddress = document.getElementById('inputName').value;
    const virustotalAPI = '/virustotal?inputName=' + ipAddress;
    const abuseipdbAPI = '/abuseipdb?inputName=' + ipAddress;

    fetch(virustotalAPI)
    .then(response=>response.json())
    .then(data=> {
        const virustotal_showData = document.getElementById('virustotal_showData')
        const datastring = JSON.stringify(data)
        // virustotal_showData.innerText = 'data from server: ' + datastring

        function summarizeAnalysis(data) {
          const analysisResults = data.data.attributes.last_analysis_results;
          const maliciousEngines = [];
          const suspiciousEngines = [];
        
          // สร้างตาราง HTML
          const table = document.createElement('table');
          table.classList.add('custom-table');
          table.innerHTML = `
            <thead>
                <tr>
                    <th>Engine</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                <!-- ข้อมูลจะถูกแทรกที่นี่ -->
            </tbody>
          `;
        
          // เลือก tbody เพื่อนำข้อมูลที่ได้ไปแทรก
          const tbody = table.querySelector('tbody');
        
          // วนลูปผ่านผลลัพธ์ทั้งหมด
          for (const engine in analysisResults) {
            const result = analysisResults[engine].result;
            // ตรวจสอบผลลัพธ์ที่ไม่ใช่ "unrated" และ "clean"
            if (result !== "unrated" && result !== "clean") {
              // สร้างแถวของตาราง
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${engine}</td>
                  <td>${result}</td>
              `;
              // เพิ่มแถวลงใน tbody
              tbody.appendChild(row);
        
              // เช็คว่ามีความเสี่ยงหรือไม่
              if (result === "malicious") {
                maliciousEngines.push(engine);
              } else if (result === "suspicious") {
                suspiciousEngines.push(engine);
              }
            }
          }

          // เรียกใช้ container ที่มี id เป็น 'virustotal_showData'
          // const resultContainer = document.getElementById('virustotal_showData');
          // เพิ่มตารางลงใน container
          virustotal_showData.innerHTML = ''; // Clear previous table
          if (maliciousEngines.length > 0 || suspiciousEngines.length > 0) {
            virustotal_showData.appendChild(table);
          } else {
            virustotal_showData.innerText = 'IP Address ' + data.data.id + ' is safe.';
          }
        }

        const style = document.createElement('style');
        style.innerHTML = `
          .custom-table,
          .custom-table th,
          .custom-table td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
          }
        `;

        // เพิ่ม style เข้าไปในหัวของเอกสาร
        document.head.appendChild(style);
        

        summarizeAnalysis(data);
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