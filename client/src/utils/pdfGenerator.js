import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateResultPDF = (result) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text("Academic Achievement Record", 105, 20, { align: "center" });

  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.line(20, 25, 190, 25);

  // Student Info
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text(`Student Name:`, 20, 40);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFont("helvetica", "bold");
  doc.text(result.name, 55, 40);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Student ID:`, 20, 50);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(result.student_id, 55, 50);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Course:`, 20, 60);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(result.course, 55, 60);

  // Scores Table
  const tableData = [
    ["Component", "Score / Max"],
    ["Mid Exam", `${result.mid_exam ?? '--'} / 30`],
    ["Quiz", `${result.quiz ?? '--'} / 10`],
    ["Assignment", `${result.assignment ?? '--'} / 10`],
    ["Final Exam", `${result.final_exam ?? '--'} / 50`],
    ["Total Score", `${result.marks} / 100`],
    ["Final Grade", result.grade]
  ];

  doc.autoTable({
    startY: 75,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 20, right: 20 }
  });

  // Comments
  if (result.comments) {
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("Administrative Notes:", 20, finalY);
    doc.setTextColor(51, 65, 85);
    doc.text(result.comments, 20, finalY + 7, { maxWidth: 170 });
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  const date = new Date().toLocaleDateString();
  doc.text(`Generated on ${date} | EmergingTech Academic Portal`, 105, 285, { align: "center" });

  doc.save(`${result.name.replace(/\s+/g, '_')}_Result.pdf`);
};
