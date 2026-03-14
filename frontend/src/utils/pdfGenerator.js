import { jsPDF } from 'jspdf';
import { formatDate, formatDateShort } from './dateUtils';

export const generateTaskReportPDF = (tasks, startDate, endDate) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Todo Task Report', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Date range
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Report Period: ${formatDate(startDate)} - ${formatDate(endDate)}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 15;

  if (tasks.length === 0) {
    doc.setFontSize(12);
    doc.text('No tasks found in the selected date range.', 20, y);
    doc.save('todo-report.pdf');
    return;
  }

  const colWidths = [50, 45, 28, 25, 32];

  tasks.forEach((task, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Task ${index + 1}`, 20, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    const titleLines = doc.splitTextToSize(task.title || '-', colWidths[0]);
    const descLines = doc.splitTextToSize(task.description || '-', colWidths[1]);

    const maxLines = Math.max(titleLines.length, descLines.length, 1);
    const lineHeight = 5;

    doc.text(titleLines[0] || '-', 20, y);
    doc.text(descLines[0] || '-', 72, y);
    doc.text(formatDateShort(task.createdDate), 118, y);
    doc.text(task.status || '-', 148, y);
    doc.text(formatDateShort(task.completedDate), 175, y);
    y += lineHeight;

    for (let i = 1; i < maxLines; i++) {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(titleLines[i] || '', 20, y);
      doc.text(descLines[i] || '', 72, y);
      y += lineHeight;
    }

    y += 8;
  });

  doc.save('todo-report.pdf');
};
