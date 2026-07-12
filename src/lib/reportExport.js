import { jsPDF } from "jspdf";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContent({ selected, reportLabel, dept, dateRange, esgTrend, carbonByDept, departments }) {
  const title = `EcoSphere ${reportLabel}`;
  const subtitle = `${dept} • ${dateRange}`;
  const generated = new Date().toLocaleString();
  const kpis = [
    { label: "ESG Score", value: "78" },
    { label: "Emissions", value: "1,590 t" },
    { label: "Compliance", value: "94%" },
  ];
  const findings = [
    "Overall ESG score improved by 4 points this period.",
    "Carbon emissions reduced by 14% year-over-year.",
    "Employee engagement in CSR reached 86%.",
    "2 critical compliance items require attention.",
  ];

  let columns, rows;
  if (selected === "environmental") {
    columns = ["Department", "Carbon Emissions (t)"];
    rows = carbonByDept.map((d) => [d.name, d.value]);
  } else if (selected === "social") {
    columns = ["Department", "Head", "Employees", "ESG Score"];
    rows = departments.map((d) => [d.name, d.head, d.employees, d.esg]);
  } else if (selected === "governance") {
    columns = ["Department", "Head", "ESG Score"];
    rows = departments.map((d) => [d.name, d.head, d.esg]);
  } else {
    columns = ["Month", "Environmental", "Social", "Governance", "Overall"];
    rows = esgTrend.map((d) => [d.month, d.environmental, d.social, d.governance, d.overall]);
  }

  return { title, subtitle, generated, kpis, findings, columns, rows };
}

function downloadBlob(filename, content, mime) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function fileBase(reportLabel, dateRange) {
  return `${reportLabel}_${dateRange}`.replace(/[^a-zA-Z0-9]+/g, "_");
}

function toCSV({ title, subtitle, generated, kpis, findings, columns, rows }) {
  const lines = [];
  lines.push(`"${title}"`);
  lines.push(`"${subtitle}"`);
  lines.push(`Generated: ${generated}`);
  lines.push("");
  lines.push("Key Performance Indicators");
  kpis.forEach((k) => lines.push(`${k.label},${k.value}`));
  lines.push("");
  lines.push("Key Findings");
  findings.forEach((f) => lines.push(`"${f}"`));
  lines.push("");
  lines.push(columns.join(","));
  rows.forEach((r) => lines.push(r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")));
  return lines.join("\n");
}

function toExcelHTML({ title, subtitle, generated, kpis, findings, columns, rows }) {
  const th = columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
  const trs = rows
    .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`)
    .join("");
  const kpiRows = kpis
    .map((k) => `<tr><td><b>${escapeHtml(k.label)}</b></td><td>${escapeHtml(k.value)}</td></tr>`)
    .join("");
  const findingRows = findings
    .map((f) => `<tr><td>• ${escapeHtml(f)}</td></tr>`)
    .join("");
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"></head><body>
<h2>${escapeHtml(title)}</h2>
<p>${escapeHtml(subtitle)} — Generated: ${escapeHtml(generated)}</p>
<h4>Key Performance Indicators</h4>
<table border="1">${kpiRows}</table>
<h4>Key Findings</h4>
<table border="1">${findingRows}</table>
<h4>Data</h4>
<table border="1"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>
</body></html>`;
}

function toPDF(content) {
  const doc = new jsPDF();
  let y = 20;
  doc.setFontSize(18);
  doc.text(content.title, 14, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(110);
  doc.text(content.subtitle, 14, y);
  y += 6;
  doc.setFontSize(9);
  doc.text(`Generated: ${content.generated}`, 14, y);
  y += 12;

  doc.setTextColor(0);
  doc.setFontSize(13);
  doc.text("Key Performance Indicators", 14, y);
  y += 8;
  doc.setFontSize(10);
  content.kpis.forEach((k) => {
    doc.text(`${k.label}: ${k.value}`, 20, y);
    y += 6;
  });
  y += 6;

  doc.setFontSize(13);
  doc.text("Key Findings", 14, y);
  y += 8;
  doc.setFontSize(10);
  content.findings.forEach((f) => {
    const lines = doc.splitTextToSize(`• ${f}`, 180);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, 20, y);
    y += lines.length * 6;
  });
  y += 6;

  if (y > 250) { doc.addPage(); y = 20; }
  doc.setFontSize(13);
  doc.text("Data", 14, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(content.columns.join("   |   "), 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  content.rows.forEach((row) => {
    if (y > 280) { doc.addPage(); y = 20; }
    doc.text(row.map((c) => String(c)).join("   |   "), 14, y);
    y += 6;
  });

  return doc;
}

export function exportReport(format, opts) {
  const content = buildContent(opts);
  const base = fileBase(opts.reportLabel, opts.dateRange);

  if (format === "CSV") {
    downloadBlob(`${base}.csv`, toCSV(content), "text/csv;charset=utf-8");
  } else if (format === "Excel") {
    downloadBlob(`${base}.xls`, toExcelHTML(content), "application/vnd.ms-excel");
  } else if (format === "PDF") {
    toPDF(content).save(`${base}.pdf`);
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
}