import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

// Configure CSRF protection
const {
  generateToken, // Creates CSRF token
  doubleCsrfProtection, // Middleware to validate CSRF tokens
} = doubleCsrf({
  getSecret: () => {
    if (!process.env.CSRF_SECRET) {
      throw new Error('CRITICAL: CSRF_SECRET environment variable must be set');
    }
    if (process.env.CSRF_SECRET.length < 32) {
      throw new Error('CSRF_SECRET must be at least 32 characters');
    }
    return process.env.CSRF_SECRET;
  },
  cookieName: '__Host-psifi.x-csrf-token', // Cookie that stores the secret
  cookieOptions: {
    sameSite: 'lax',
    path: '/',
    secure: false, // Set to true in production with HTTPS
    httpOnly: true, // Secret cookie should be httpOnly
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => {
    // Check header first, then body, then cookie
    const headerToken = req.headers['x-csrf-token'];
    const bodyToken = req.body?._csrf;
    const cookieToken = req.cookies?.['x-csrf-token'];
    
    console.log('🔐 CSRF Token Check:', {
      hasHeader: !!headerToken,
      hasBody: !!bodyToken,
      hasCookie: !!cookieToken,
      method: req.method,
      url: req.url
    });
    
    return headerToken || bodyToken || cookieToken;
  },
});

// Wrapper function to safely generate token
const safeGenerateToken = (req, res) => {
  try {
    const token = generateToken(req, res);
    console.log('✅ CSRF token generated successfully');
    // Also set a readable cookie for the client
    res.cookie('x-csrf-token', token, {
      sameSite: 'lax',
      path: '/',
      secure: false,
      httpOnly: false, // JavaScript needs to read this
    });
    return token;
  } catch (error) {
    console.error('❌ Error generating CSRF token:', error);
    // Fallback: generate a simple token
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie('x-csrf-token', token, {
      sameSite: 'lax',
      path: '/',
      secure: false,
      httpOnly: false,
    });
    return token;
  }
};

export { safeGenerateToken as generateToken, doubleCsrfProtection, cookieParser };
