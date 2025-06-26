const jwt = require('jsonwebtoken');

// This should match your backend JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Test user ID (you can replace this with an actual user ID from your database)
const testUserId = '507f1f77bcf86cd799439011'; // Example MongoDB ObjectId

console.log('=== JWT Token Debug Script ===\n');

// Generate a test token
console.log('1. Generating test token...');
const token = jwt.sign({ id: testUserId }, JWT_SECRET, { expiresIn: '24h' });
console.log('Generated token:', token);
console.log('Token length:', token.length);
console.log('');

// Verify the token
console.log('2. Verifying token...');
try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token is valid!');
    console.log('Decoded payload:', decoded);
    console.log('User ID from token:', decoded.id);
    console.log('Token expires at:', new Date(decoded.exp * 1000));
    console.log('');
} catch (error) {
    console.error('Token verification failed:', error.message);
    console.log('');
}

// Test token format for Postman
console.log('3. Postman Authorization Header Format:');
console.log('Authorization: Bearer ' + token);
console.log('');

// Test with a malformed token
console.log('4. Testing with malformed token...');
const malformedToken = token.substring(0, token.length - 5) + 'INVALID';
try {
    const decoded = jwt.verify(malformedToken, JWT_SECRET);
    console.log('Malformed token verification succeeded (this should not happen)');
} catch (error) {
    console.log('Malformed token correctly rejected:', error.message);
}
console.log('');

// Test token expiration
console.log('5. Testing token expiration...');
const expiredToken = jwt.sign({ id: testUserId }, JWT_SECRET, { expiresIn: '1s' });
console.log('Created token that expires in 1 second...');
setTimeout(() => {
    try {
        const decoded = jwt.verify(expiredToken, JWT_SECRET);
        console.log('Expired token verification succeeded (this should not happen)');
    } catch (error) {
        console.log('Expired token correctly rejected:', error.message);
    }
}, 2000);

console.log('\n=== Debug Complete ===');
console.log('\nTo use this in Postman:');
console.log('1. Copy the generated token above');
console.log('2. In Postman, go to the Authorization tab');
console.log('3. Select "Bearer Token" from the Type dropdown');
console.log('4. Paste the token in the Token field');
console.log('5. Or use the Authorization header: "Bearer " + token'); 