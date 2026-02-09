import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'COMPLETE_USER_TEST_GUIDE.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 60, right: 60 }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Colors
const primaryBlue = '#00539F';
const darkGray = '#333333';
const mediumGray = '#666666';
const lightGray = '#E5E5E5';

// Title Page
doc.fontSize(28)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('SAFE-8 Assessment Platform', 60, 100);

doc.fontSize(22)
   .fillColor(darkGray)
   .text('Complete User Experience Test', 60, 140);

doc.fontSize(12)
   .font('Helvetica')
   .fillColor(mediumGray)
   .text('Comprehensive Testing Guide', 60, 180);

// Test User Details Box
doc.rect(60, 220, doc.page.width - 120, 100)
   .fillAndStroke('#F5F5F5', lightGray);

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('Test User Details', 80, 235);

doc.fontSize(11)
   .font('Helvetica')
   .fillColor(darkGray)
   .text('Name: Test User', 80, 255)
   .text('Email: jaredmoodley9@gmail.com', 80, 270)
   .text('Company: Forvis Mazars Test', 80, 285)
   .text('Job Title: QA Tester', 80, 300);

// Estimated Time
doc.fontSize(10)
   .fillColor(mediumGray)
   .text('Estimated Total Test Time: 60-75 minutes', 60, 350);

doc.addPage();

let yPos = 50;

// Helper function to add section header
function addSectionHeader(title, number) {
  if (yPos > 700) {
    doc.addPage();
    yPos = 50;
  }
  
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .fillColor(primaryBlue)
     .text(`${number}. ${title}`, 60, yPos);
  
  yPos += 25;
}

// Helper function to add subsection
function addSubsection(title) {
  if (yPos > 720) {
    doc.addPage();
    yPos = 50;
  }
  
  doc.fontSize(13)
     .font('Helvetica-Bold')
     .fillColor(darkGray)
     .text(title, 60, yPos);
  
  yPos += 20;
}

// Helper function to add step
function addStep(step) {
  if (yPos > 730) {
    doc.addPage();
    yPos = 50;
  }
  
  doc.fontSize(10)
     .font('Helvetica')
     .fillColor(darkGray)
     .text(step, 75, yPos, { width: doc.page.width - 135 });
  
  yPos += doc.heightOfString(step, { width: doc.page.width - 135 }) + 8;
}

// Helper function to add checkbox item
function addCheckbox(item) {
  if (yPos > 730) {
    doc.addPage();
    yPos = 50;
  }
  
  // Draw checkbox
  doc.rect(75, yPos, 8, 8)
     .stroke(mediumGray);
  
  doc.fontSize(10)
     .font('Helvetica')
     .fillColor(darkGray)
     .text(item, 90, yPos - 1, { width: doc.page.width - 150 });
  
  yPos += doc.heightOfString(item, { width: doc.page.width - 150 }) + 10;
}

// Phase 1
addSectionHeader('Phase 1: User Registration & Welcome (5 minutes)', 'Phase 1');

addSubsection('Step 1.1 - Access the Platform');
addStep('1. Open browser and navigate to: http://localhost:5173');
addStep('2. Verify homepage loads with Forvis Mazars branding');
addStep('3. Verify "Get Started" or "Start Assessment" button visible');
yPos += 10;

addSubsection('Step 1.2 - Create Lead Account');
addStep('1. Click "Get Started" or "Begin Assessment"');
addStep('2. Fill in the Lead Form:');
addStep('   - Full Name: Test User');
addStep('   - Email: jaredmoodley9@gmail.com');
addStep('   - Company Name: Forvis Mazars Test');
addStep('   - Job Title: QA Tester');
addStep('   - Industry: Select any (e.g., "Technology")');
addStep('   - Company Size: Select any (e.g., "50-200")');
addStep('3. Click "Submit" or "Continue"');
addStep('4. Verify welcome email received at jaredmoodley9@gmail.com');
addStep('5. Verify Forvis Mazars logo displays in email header and footer');
yPos += 15;

// Phase 2
addSectionHeader('Phase 2: Complete Assessment (15 minutes)', 'Phase 2');

addSubsection('Step 2.1 - Select Assessment Type');
addStep('1. After registration, select assessment type');
addStep('   - Recommended: Choose "CORE" for full 8-pillar assessment');
addStep('2. Click "Start Assessment"');
yPos += 10;

addSubsection('Step 2.2 - Answer Questions');
addStep('1. You will see questions grouped by 8 pillars:');
addStep('   - Strategy & Leadership');
addStep('   - Data Readiness');
addStep('   - Technology & Infrastructure');
addStep('   - Skills & Talent');
addStep('   - Governance & Ethics');
addStep('   - Security & Compliance');
addStep('   - Culture & Change');
addStep('   - Value & ROI');
yPos += 8;

addStep('2. For each question, select a rating (1-5 scale):');
addStep('   - 1 = Not at all / Very poor');
addStep('   - 3 = Somewhat / Average');
addStep('   - 5 = Completely / Excellent');
yPos += 8;

addStep('3. Test Scenario - Create Varied Results:');
addStep('   - Rate Strategy questions: 4-5 (Strong)');
addStep('   - Rate Data questions: 2-3 (Moderate)');
addStep('   - Rate Technology questions: 4-5 (Strong)');
addStep('   - Rate Skills questions: 2 (Weak)');
addStep('   - Rate Governance questions: 3-4 (Moderate)');
addStep('   - Rate Security questions: 5 (Strong)');
addStep('   - Rate Culture questions: 2-3 (Moderate)');
addStep('   - Rate Performance questions: 4-5 (Strong)');
yPos += 8;

addStep('4. Click "Submit Assessment" when complete');
addStep('5. Verify assessment saves successfully');
addStep('6. Verify redirect to results page');
yPos += 15;

doc.addPage();
yPos = 50;

// Phase 3
addSectionHeader('Phase 3: View Results Dashboard (10 minutes)', 'Phase 3');

addSubsection('Step 3.1 - Results Overview');
addStep('On results page, verify the following elements are displayed:');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('Overall Score Card:', 75, yPos);
yPos += 18;

addStep('- Overall percentage score (e.g., "78%")');
addStep('- Category label (e.g., "AI Adopter")');
addStep('- Color-coded indicator');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('8 Pillar Performance Breakdown:', 75, yPos);
yPos += 18;

addStep('- All 8 pillar names match database names:');
addStep('  Strategy & Leadership, Data Readiness, Technology & Infrastructure,');
addStep('  Skills & Talent, Governance & Ethics, Security & Compliance,');
addStep('  Culture & Change, Value & ROI');
addStep('- Each pillar shows percentage score');
addStep('- Scores match what you answered (not simulated)');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('Critical Gap Analysis:', 75, yPos);
yPos += 18;

addStep('- Lists pillars scoring below 80%');
addStep('- Shows gap in points (e.g., "Gap: 45 points")');
addStep('- Priority badges (Critical/High/Moderate)');
addStep('- Sorted by largest gap first');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('Performance Summary:', 75, yPos);
yPos += 18;

addStep('- Count of pillars with Excellent performance (>=80%)');
addStep('- Count of pillars with Good performance (60-79%)');
addStep('- Count of Focus Areas (<60%)');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('Service Recommendations:', 75, yPos);
yPos += 18;

addStep('- Recommended services based on scores');
addStep('- Service cards with descriptions');
yPos += 15;

addSubsection('Step 3.2 - Test Export Functions');

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('1. View PDF Button:', 75, yPos);
yPos += 18;

addStep('- Click "View PDF" or "Export PDF"');
addStep('- Verify PDF downloads');
addStep('- Open PDF and verify:');
addStep('  Page 1: Forvis Mazars logo at top');
addStep('  Page 1: Overall score displayed');
addStep('  Page 2: All 8 pillar bar charts with correct scores');
addStep('  Page 3: Gap analysis with priority badges');
addStep('  Page 3: Performance summary statistics');
addStep('  Page 4: Service recommendations');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('2. Email Results Button:', 75, yPos);
yPos += 18;

addStep('- Click "Email Results" or "Send to Email"');
addStep('- Verify success message');
addStep('- Check email inbox at jaredmoodley9@gmail.com');
addStep('- Verify email received with:');
addStep('  Forvis Mazars logo in header');
addStep('  Overall score');
addStep('  PDF attachment');
addStep('  Professional formatting');
yPos += 15;

doc.addPage();
yPos = 50;

// Phase 4
addSectionHeader('Phase 4: User Dashboard (10 minutes)', 'Phase 4');

addSubsection('Step 4.1 - Access User Dashboard');
addStep('1. Navigate to User Dashboard (accessible after completing assessment)');
addStep('2. Verify user details displayed:');
addStep('   - Name: Test User');
addStep('   - Email: jaredmoodley9@gmail.com');
addStep('   - Company: Forvis Mazars Test');
yPos += 10;

addSubsection('Step 4.2 - View Assessment History');
addStep('1. Locate assessment history section');
addStep('2. Verify your completed assessment is listed with:');
addStep('   - Assessment type (CORE)');
addStep('   - Overall score');
addStep('   - Completion date');
addStep('   - Status (Completed)');
yPos += 10;

addSubsection('Step 4.3 - Test Dashboard Actions');

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('1. View Assessment Details:', 75, yPos);
yPos += 18;

addStep('- Click on your assessment in the history');
addStep('- Verify details modal/page opens');
addStep('- Verify all 8 pillar scores displayed');
addStep('- Verify scores match results page');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('2. Export PDF from Dashboard:', 75, yPos);
yPos += 18;

addStep('- Click "Export PDF" button on your assessment');
addStep('- Verify PDF downloads');
addStep('- Open and verify content matches previous PDF');
yPos += 15;

// Phase 5
addSectionHeader('Phase 5: Admin Dashboard Testing (15 minutes)', 'Phase 5');

addSubsection('Step 5.1 - Admin Login');
addStep('1. Navigate to admin login: http://localhost:5173/admin');
addStep('2. Login with admin credentials');
addStep('3. Verify admin dashboard loads');
yPos += 10;

addSubsection('Step 5.2 - Find Your Test User');
addStep('1. Navigate to Users section');
addStep('2. Search for: jaredmoodley9@gmail.com or Test User');
addStep('3. Verify your user account appears in results');
addStep('4. Verify user details are correct');
yPos += 10;

addSubsection('Step 5.3 - View User\'s Assessment');
addStep('1. Click on your user account');
addStep('2. Locate assessments list for this user');
addStep('3. Verify your CORE assessment is listed');
addStep('4. Verify overall score displayed');
yPos += 10;

addSubsection('Step 5.4 - Admin PDF Export');
addStep('1. Click "Export PDF" for your assessment from admin view');
addStep('2. Verify PDF downloads');
addStep('3. Open and verify:');
addStep('   - Forvis Mazars logo at top');
addStep('   - All 8 pillar scores match');
addStep('   - Same content as user-downloaded PDF');
yPos += 15;

doc.addPage();
yPos = 50;

// Phase 6
addSectionHeader('Phase 6: Data Consistency Verification (10 minutes)', 'Phase 6');

addSubsection('Step 6.1 - Cross-Reference All Scores');
addStep('Compare pillar scores across all 4 locations:');
yPos += 10;

// Create table
const tableTop = yPos;
const col1 = 75;
const col2 = 220;
const col3 = 310;
const col4 = 400;
const col5 = 490;

doc.fontSize(9)
   .font('Helvetica-Bold')
   .text('Pillar Name', col1, tableTop)
   .text('Results', col2, tableTop)
   .text('User PDF', col3, tableTop)
   .text('Admin PDF', col4, tableTop)
   .text('Email PDF', col5, tableTop);

yPos = tableTop + 20;

const pillars = [
  'Strategy & Leadership',
  'Data Readiness',
  'Technology & Infrastructure',
  'Skills & Talent',
  'Governance & Ethics',
  'Security & Compliance',
  'Culture & Change',
  'Value & ROI'
];

doc.fontSize(8).font('Helvetica');

pillars.forEach((pillar, i) => {
  doc.text(pillar, col1, yPos, { width: 140 })
     .text('__%', col2, yPos)
     .text('__%', col3, yPos)
     .text('__%', col4, yPos)
     .text('__%', col5, yPos);
  yPos += 15;
});

yPos += 10;

doc.fontSize(10)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('PASS CRITERIA: All scores must match exactly across all 4 sources', 60, yPos, { width: doc.page.width - 120 });

yPos += 25;

addSubsection('Step 6.2 - Verify Gap Analysis Consistency');
addStep('1. Check gap analysis on results page - note which pillars are listed');
addStep('2. Open PDF - verify same pillars listed in gap analysis section');
addStep('3. Verify gaps calculated correctly (80% - pillar_score)');
addStep('4. Verify priority badges match:');
addStep('   - Critical if gap >= 40');
addStep('   - High if gap >= 20');
addStep('   - Moderate if gap < 20');
yPos += 15;

// Phase 7
addSectionHeader('Phase 7: Email Testing (10 minutes)', 'Phase 7');

addSubsection('Step 7.1 - Check All Emails Received');
addStep('Verify you received these emails at jaredmoodley9@gmail.com:');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('1. Welcome Email:', 75, yPos);
yPos += 18;

addStep('- Subject: "Welcome to SAFE-8 Assessment Platform"');
addStep('- Forvis Mazars logo visible');
addStep('- Professional formatting');
addStep('- No broken images');
yPos += 8;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('2. Assessment Results Email:', 75, yPos);
yPos += 18;

addStep('- Subject includes your score (e.g., "Your SAFE-8 CORE Assessment Results - 78%")');
addStep('- Forvis Mazars logo visible');
addStep('- PDF attachment present');
addStep('- Email body includes summary');
yPos += 10;

addSubsection('Step 7.2 - Test Email PDF Attachment');
addStep('1. Open the assessment results email');
addStep('2. Download the PDF attachment');
addStep('3. Verify PDF opens correctly');
addStep('4. Verify all 4 pages present with complete data');
yPos += 15;

doc.addPage();
yPos = 50;

// Phase 8
addSectionHeader('Phase 8: Edge Cases & Error Handling (5 minutes)', 'Phase 8');

addSubsection('Test 8.1 - Incomplete Assessment');
addStep('1. Start a new assessment but don\'t complete it');
addStep('2. Try to submit with missing answers');
addStep('3. Verify validation prevents submission');
addStep('4. Verify error messages are clear');
yPos += 10;

addSubsection('Test 8.2 - PDF Generation Without Data');
addStep('1. If possible, access an old assessment with empty dimension_scores');
addStep('2. Try to download PDF');
addStep('3. Verify PDF generates (even if empty sections)');
addStep('4. Verify no errors/crashes');
yPos += 10;

addSubsection('Test 8.3 - Multiple Assessments');
addStep('1. Complete a second assessment with different scores');
addStep('2. Verify both appear in user dashboard');
addStep('3. Verify each has correct data');
addStep('4. Verify PDFs are different');
yPos += 20;

// Final Checklist
doc.fontSize(18)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('FINAL CHECKLIST', 60, yPos);

yPos += 30;

doc.fontSize(14)
   .fillColor(darkGray)
   .text('Core Functionality', 60, yPos);
yPos += 20;

addCheckbox('User registration works');
addCheckbox('Assessment submission saves data');
addCheckbox('Results display all 8 pillars with correct scores');
addCheckbox('Overall score calculates correctly');
addCheckbox('Gap analysis shows correct pillars and priorities');
addCheckbox('Performance summary counts are accurate');
yPos += 10;

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('PDF Generation (4 sources)', 60, yPos);
yPos += 20;

addCheckbox('Results page - "View PDF" works');
addCheckbox('User dashboard - "Export PDF" works');
addCheckbox('Admin dashboard - "Export PDF" works');
addCheckbox('Email - PDF attachment works');
addCheckbox('All 4 PDFs have identical data');
yPos += 10;

doc.addPage();
yPos = 50;

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('PDF Content', 60, yPos);
yPos += 20;

addCheckbox('Forvis Mazars logo displays on page 1');
addCheckbox('Page 1: Overall score and category');
addCheckbox('Page 2: 8 pillar bar charts with correct scores');
addCheckbox('Page 3: Gap analysis with priorities');
addCheckbox('Page 3: Performance summary statistics');
addCheckbox('Page 4: Service recommendations');
yPos += 10;

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('Email Functionality', 60, yPos);
yPos += 20;

addCheckbox('Welcome email sends and displays logo');
addCheckbox('Assessment results email sends');
addCheckbox('Email logo displays (not broken)');
addCheckbox('PDF attaches to email');
addCheckbox('Professional formatting maintained');
yPos += 10;

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('Data Consistency', 60, yPos);
yPos += 20;

addCheckbox('Frontend results match database');
addCheckbox('PDF scores match frontend');
addCheckbox('Admin view matches user view');
addCheckbox('Email PDF matches downloaded PDF');
addCheckbox('No simulated/fake scores');
yPos += 10;

doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('Branding', 60, yPos);
yPos += 20;

addCheckbox('Forvis Mazars logo in all PDFs');
addCheckbox('Forvis Mazars logo in all emails');
addCheckbox('Color scheme matches brand guidelines');
addCheckbox('Professional appearance throughout');
yPos += 20;

// Bug Reporting
doc.fontSize(16)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('BUG REPORTING', 60, yPos);

yPos += 25;

doc.fontSize(10)
   .font('Helvetica')
   .fillColor(darkGray)
   .text('If you find any issues, report with:', 60, yPos);

yPos += 20;

addStep('1. What you were doing: (e.g., "Clicking Export PDF from results page")');
addStep('2. What you expected: (e.g., "PDF should download with all 8 pillars")');
addStep('3. What actually happened: (e.g., "PDF only shows 3 pillars")');
addStep('4. Screenshots: Attach if possible');
addStep('5. Console errors: Open browser DevTools (F12) and check for red errors');
yPos += 20;

// Success Criteria
doc.fontSize(16)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('SUCCESS CRITERIA', 60, yPos);

yPos += 25;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('The app passes if:', 60, yPos);

yPos += 20;

addCheckbox('All 8 pillar scores display correctly everywhere');
addCheckbox('All 4 PDF generation points produce identical output');
addCheckbox('Logos display in PDFs and emails');
addCheckbox('Gap analysis calculates correctly');
addCheckbox('No "simulated" or random scores');
addCheckbox('Data consistency across all views');
addCheckbox('Professional branding maintained');

doc.addPage();
yPos = 50;

// Quick Start
doc.fontSize(18)
   .font('Helvetica-Bold')
   .fillColor(primaryBlue)
   .text('QUICK START', 60, yPos);

yPos += 30;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('1. Start the application:', 60, yPos);

yPos += 20;

doc.fontSize(10)
   .font('Courier')
   .fillColor('#333333')
   .text('# Terminal 1 - Backend', 75, yPos)
   .text('cd c:\\Projects\\Audit\\SAFE-8_Project\\server', 75, yPos + 15)
   .text('npm run dev', 75, yPos + 30);

yPos += 55;

doc.text('# Terminal 2 - Frontend', 75, yPos)
   .text('cd c:\\Projects\\Audit\\SAFE-8_Project', 75, yPos + 15)
   .text('npm run dev', 75, yPos + 30);

yPos += 60;

doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor(darkGray)
   .text('2. Open browser: http://localhost:5173', 60, yPos);

yPos += 25;

doc.text('3. Follow Phase 1 and work through each phase systematically', 60, yPos);

yPos += 25;

doc.text('4. Check off items as you test', 60, yPos);

yPos += 25;

doc.text('5. Report any issues found', 60, yPos);

yPos += 40;

doc.fontSize(14)
   .fillColor(primaryBlue)
   .text('Good luck testing!', 60, yPos);

doc.end();

stream.on('finish', () => {
  console.log('PDF created successfully:', outputPath);
});

stream.on('error', (err) => {
  console.error('Error creating PDF:', err);
});
