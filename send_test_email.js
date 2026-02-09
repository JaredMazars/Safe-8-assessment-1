import { sendWelcomeEmail } from './server/services/emailService.js';

async function testWelcomeEmail() {
  try {
    console.log('📧 Sending test welcome email...\n');
    
    const userData = {
      contact_name: 'Jared Moodley',
      email: 'jaredmoodley9@gmail.com',
      company_name: 'Forvis Mazars',
      job_title: 'Test User'
    };
    
    const result = await sendWelcomeEmail(userData);
    
    if (result && result.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('Message ID:', result.messageId);
    } else {
      console.log('⚠️ Email may not have been sent (service might not be configured)');
    }
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testWelcomeEmail();
