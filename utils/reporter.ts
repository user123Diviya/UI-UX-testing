import fs from 'fs';
import path from 'path';

const reportDir = path.join(process.cwd(), 'reports');


if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const jsonPath = path.join(reportDir, 'ui-report.json');
const htmlPath = path.join(reportDir, 'report.html');

let bugs: any[] = [];

export function logBug(issue: string, details: any) {
  const bug = {
    issue,
    details,
    time: new Date().toLocaleString()
  };

  console.log("BUG:", bug);
  bugs.push(bug);
}

export function saveReport() {
  try {
    
    fs.writeFileSync(jsonPath, JSON.stringify(bugs, null, 2));

    
    let html = `
    <html>
    <head>
      <title>UI Report</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: red; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 10px; }
        th { background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h1>UI Bug Report</h1>
      <p>Total Bugs: ${bugs.length}</p>
      <table>
        <tr>
          <th>Issue</th>
          <th>Details</th>
          <th>Time</th>
        </tr>
    `;

    bugs.forEach(b => {
      html += `
        <tr>
          <td>${b.issue}</td>
          <td>${JSON.stringify(b.details)}</td>
          <td>${b.time}</td>
        </tr>
      `;
    });

    html += `
      </table>
    </body>
    </html>
    `;

        fs.writeFileSync(htmlPath, html);

    console.log(" HTML report generated at:", htmlPath);

  } catch (error) {
    console.error(" Error generating report:", error);
  }
}
