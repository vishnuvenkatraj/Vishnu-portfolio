import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // A4 dimensions: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  let page = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Executive Color Palette
  const cBlack = rgb(0.08, 0.1, 0.15); // #141a26 Charcoal black
  const cDark = rgb(0.15, 0.2, 0.28);  // #263347 Deep slate
  const cBody = rgb(0.25, 0.3, 0.38);  // #404d61 Readable body text
  const cAccent = rgb(0.44, 0.17, 0.25); // #702B40 Deep Burgundy accent
  const cRule = rgb(0.75, 0.8, 0.82);  // Muted Sage rule line

  // Load passport photo if available
  let profileImage = null;
  const photoPath = path.resolve('public/images/profile/profile-photo.jpg');
  if (fs.existsSync(photoPath)) {
    try {
      const imageBytes = fs.readFileSync(photoPath);
      profileImage = await doc.embedJpg(imageBytes);
    } catch (e) {
      console.warn('Could not embed profile photo:', e.message);
    }
  }

  function checkPageBreak(requiredHeight) {
    if (y - requiredHeight < margin + 20) {
      page = doc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;

      // Header on Page 2
      page.drawText('VISHNU V — CURRICULUM VITAE', {
        x: margin,
        y: y,
        size: 8.5,
        font: fontBold,
        color: cAccent,
      });
      page.drawText('+91 74185 63738 | vishnuvenkatraj@gmail.com', {
        x: pageWidth - margin - fontRegular.widthOfTextAtSize('+91 74185 63738 | vishnuvenkatraj@gmail.com', 8.5),
        y: y,
        size: 8.5,
        font: fontRegular,
        color: cBody,
      });
      y -= 6;
      page.drawLine({
        start: { x: margin, y: y },
        end: { x: pageWidth - margin, y: y },
        thickness: 0.75,
        color: cRule,
      });
      y -= 16;
      return true;
    }
    return false;
  }

  function drawSectionHeader(title) {
    checkPageBreak(32);
    y -= 6;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: cAccent,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 1,
      color: cAccent,
    });
    y -= 11;
  }

  function wrapText(text, maxWidth, font, size) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawParagraph(text, font, size, color, maxWidth = contentWidth, indent = 0) {
    const lines = wrapText(text, maxWidth - indent, font, size);
    for (const line of lines) {
      checkPageBreak(size + 4);
      page.drawText(line, {
        x: margin + indent,
        y: y,
        size,
        font,
        color,
      });
      y -= size + 3;
    }
  }

  function drawBullet(text, font, size, color, indent = 12) {
    const lines = wrapText(text, contentWidth - indent - 8, font, size);
    checkPageBreak(size + 4);
    page.drawText('•', {
      x: margin + indent - 8,
      y: y,
      size: size + 2,
      font: fontBold,
      color: cAccent,
    });
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) checkPageBreak(size + 4);
      page.drawText(lines[i], {
        x: margin + indent,
        y: y,
        size,
        font,
        color,
      });
      y -= size + 2.5;
    }
  }

  // ==========================================
  // PAGE 1: HEADER & CANDIDATE DETAILS
  // ==========================================
  const headerTopY = y;
  const photoW = 54;
  const photoH = 68;

  // Draw Passport Photo on Top Right if present
  if (profileImage) {
    const photoX = pageWidth - margin - photoW;
    const photoY = headerTopY - photoH + 8;
    // Draw photo border
    page.drawRectangle({
      x: photoX - 1.5,
      y: photoY - 1.5,
      width: photoW + 3,
      height: photoH + 3,
      borderColor: cAccent,
      borderWidth: 1,
      color: rgb(0.96, 0.96, 0.97),
    });
    page.drawImage(profileImage, {
      x: photoX,
      y: photoY,
      width: photoW,
      height: photoH,
    });
  }

  // Name
  page.drawText('VISHNU V', {
    x: margin,
    y: y,
    size: 22,
    font: fontBold,
    color: cBlack,
  });
  y -= 18;

  // Contact line 1
  page.drawText('+91 74185 63738   |   vishnuvenkatraj@gmail.com   |   Virudhunagar, Tamil Nadu', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: cDark,
  });
  y -= 13;

  // Contact line 2 (LinkedIn & GitHub)
  page.drawText('linkedin.com/in/vishnu-v-5aaa93350   |   github.com/vishnuvenkatraj', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: cAccent,
  });
  y -= 10;

  // Separator
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: pageWidth - margin, y: y },
    thickness: 1.5,
    color: cBlack,
  });
  y -= 8;

  // ==========================================
  // CAREER SUMMARY
  // ==========================================
  drawSectionHeader('Career Summary');
  drawParagraph(
    'B.Tech Computer Science and Business Systems student with experience in developing software projects across healthcare, e-governance, and agriculture. Skilled in Java, C, Data Structures & Algorithms, and Object-Oriented Programming, with exposure to AI-integrated applications and web technologies. Completed an embedded systems internship and actively participated in hackathons and innovation events.',
    fontRegular,
    9.5,
    cBody
  );
  y -= 3;

  // ==========================================
  // EDUCATION
  // ==========================================
  drawSectionHeader('Education');

  // B.Tech
  checkPageBreak(36);
  page.drawText('B.Tech — Computer Science and Business Systems', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Karur, Tamil Nadu', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Karur, Tamil Nadu', 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 12;
  page.drawText('M. Kumarasamy College of Engineering', {
    x: margin,
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  page.drawText('2024 – 2028', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('2024 – 2028', 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 11;
  page.drawText('CGPA: 8.10 / 10 (up to 4th Semester)', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: cAccent,
  });
  y -= 14;

  // HSC
  checkPageBreak(30);
  page.drawText('Higher Secondary Certificate (HSC)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Aruppukottai, Tamil Nadu', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Aruppukottai, Tamil Nadu', 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 11;
  page.drawText('SBK Higher Secondary School   |   2024', {
    x: margin,
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  page.drawText('Percentage: 81.83%', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('Percentage: 81.83%', 9),
    y: y,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  y -= 13;

  // SSLC
  checkPageBreak(30);
  page.drawText('Secondary School Leaving Certificate (SSLC)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Aruppukottai, Tamil Nadu', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Aruppukottai, Tamil Nadu', 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 11;
  page.drawText('SBK Higher Secondary School   |   2022', {
    x: margin,
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  page.drawText('Percentage: 78.2%', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('Percentage: 78.2%', 9),
    y: y,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  y -= 6;

  // ==========================================
  // SKILLS & AREAS OF INTEREST
  // ==========================================
  drawSectionHeader('Skills & Areas of Competency');

  function drawSkillRow(label, items) {
    checkPageBreak(16);
    page.drawText(label + ':', {
      x: margin,
      y: y,
      size: 9,
      font: fontBold,
      color: cDark,
    });
    const labelWidth = fontBold.widthOfTextAtSize(label + ':  ', 9);
    page.drawText(items, {
      x: margin + labelWidth,
      y: y,
      size: 9,
      font: fontRegular,
      color: cBody,
    });
    y -= 12.5;
  }

  drawSkillRow('Technical Skills', 'Java, Data Structures & Algorithms, Object-Oriented Programming, C');
  drawSkillRow('Tools & Technologies', 'HTML & CSS, Git & GitHub, MySQL');
  drawSkillRow('Areas of Interest', 'Database Management Systems, Business Analytics, Web Development, Software Engineering');
  drawSkillRow('Soft Skills', 'Adaptability, Teamwork & Collaboration, Time Management, Critical Thinking');
  y -= 4;

  // ==========================================
  // PROJECTS
  // ==========================================
  drawSectionHeader('Projects');

  // Project 1: MediConnect
  checkPageBreak(65);
  page.drawText('AI-Powered Healthcare Management System (MediConnect)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Frontend Engineer & AI Integration Lead', {
    x: pageWidth - margin - fontOblique.widthOfTextAtSize('Frontend Engineer & AI Integration Lead', 8.5),
    y: y,
    size: 8.5,
    font: fontOblique,
    color: cAccent,
  });
  y -= 11;
  page.drawText('Tech: React, Node.js, Generative AI (Gemini API), role-based authentication', {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: cBody,
  });
  y -= 10;
  drawBullet('Designed and built the frontend for a healthcare platform that digitizes clinical workflows with secure role-based access for doctors, staff, and patients.', fontRegular, 8.8, cBody);
  drawBullet('Integrated Generative AI features for symptom analysis, medical assistance, and administrative insights, reducing manual triage effort.', fontRegular, 8.8, cBody);
  drawBullet('Collaborated across frontend and AI-integration workstreams to ship a working end-to-end demo.', fontRegular, 8.8, cBody);
  y -= 6;

  // Project 2: CivicConnect
  checkPageBreak(65);
  page.drawText('CivicConnect — AI-Powered E-Governance Platform', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  page.drawText('AI Integration Engineer', {
    x: pageWidth - margin - fontOblique.widthOfTextAtSize('AI Integration Engineer', 8.5),
    y: y,
    size: 8.5,
    font: fontOblique,
    color: cAccent,
  });
  y -= 11;
  page.drawText('Tech: React, Google Gemini API, analytics/ML for issue classification', {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: cBody,
  });
  y -= 10;
  drawBullet('Built an AI-powered e-governance platform to manage public grievances across multiple districts.', fontRegular, 8.8, cBody);
  drawBullet('Implemented analytics for duplicate-issue detection and SLA-risk prediction, helping prioritize urgent complaints.', fontRegular, 8.8, cBody);
  drawBullet('Designed the UI/UX flow to make grievance submission and tracking simple for end users.', fontRegular, 8.8, cBody);
  y -= 6;

  // ==========================================
  // PATENT PUBLICATION
  // ==========================================
  drawSectionHeader('Patent Publication');

  // FlowVault
  checkPageBreak(36);
  page.drawText('FlowVault — Self-Reconfiguring Storm Drain', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  y -= 11;
  drawParagraph(
    'Designed a passive hydraulic-mechanical storm-drain system that automatically redirects drainage from a severely clogged section to the next available section without electronics or external power.',
    fontRegular,
    8.8,
    cBody,
    contentWidth,
    8
  );
  y -= 5;

  // RESQTRAK
  checkPageBreak(42);
  page.drawText('RESQTRAK — Gas-Triggered Auto-Extraction (Published Patent #202641130488)', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  y -= 11;
  drawParagraph(
    'Published Patent under Indian Patent Office (App No: 202641130488). Designed a passive H2S-triggered rescue system converting toxic gas exposure into mechanical actuation for automatic confined-space worker retrieval without electrical ignition risk.',
    fontRegular,
    8.8,
    cBody,
    contentWidth,
    8
  );
  y -= 6;

  // ==========================================
  // INTERNSHIP
  // ==========================================
  drawSectionHeader('Internship');
  checkPageBreak(50);
  page.drawText('Embedded Systems Intern — Crapersoft, Coimbatore', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  page.drawText('May – Jun 2026', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('May – Jun 2026', 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 11;
  drawBullet('Worked hands-on with MPLAB IDE, PICkit3 Debugger, and Proteus for embedded systems development.', fontRegular, 8.8, cBody);
  drawBullet('Gained practical experience in microcontroller programming, debugging, and circuit simulation.', fontRegular, 8.8, cBody);
  drawBullet('Assisted in testing and validating embedded circuit designs before deployment.', fontRegular, 8.8, cBody);
  y -= 6;

  // ==========================================
  // CERTIFICATIONS
  // ==========================================
  drawSectionHeader('Certifications');
  drawBullet('NPTEL — Human Computer Interaction (12 Weeks) — 95%', fontRegular, 9, cBody);
  drawBullet('NPTEL — Software Testing (12 Weeks)', fontRegular, 9, cBody);
  y -= 6;

  // ==========================================
  // ACHIEVEMENTS & RECOGNITION
  // ==========================================
  drawSectionHeader('Achievements & Recognition');
  drawBullet('3rd Prize Winner — Gencraft Appathon 2025', fontRegular, 9, cBody);
  drawBullet('1st Prize Winner – Innoverse 2026', fontRegular, 9, cBody);
  drawBullet('Dr. Kalam Young Achiever Awards 2026 — World Youth Federation', fontRegular, 9, cBody);
  drawBullet('Hackathon Participant (24 Hours) — Innovation Unbound (2026), MobilityX 2.0 (2025), Hackmatrix (2026)', fontRegular, 9, cBody);
  y -= 6;

  // ==========================================
  // LANGUAGES & HOBBIES
  // ==========================================
  drawSectionHeader('Languages & Hobbies');
  checkPageBreak(28);
  page.drawText('Languages:', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Tamil (Read, Write, Speak)   |   English (Read, Write, Speak)', {
    x: margin + 70,
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });
  y -= 13;

  page.drawText('Hobbies:', {
    x: margin,
    y: y,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText('Listening to Music   |   Learning New Technologies', {
    x: margin + 70,
    y: y,
    size: 9,
    font: fontRegular,
    color: cBody,
  });

  // Ensure public directory exists
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfBytes = await doc.save();
  const outputPath = path.join(publicDir, 'resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume PDF generated successfully at ${outputPath} (${pdfBytes.length} bytes, ${doc.getPageCount()} pages)`);
}

generateResume().catch((err) => {
  console.error('Error generating resume PDF:', err);
  process.exit(1);
});
