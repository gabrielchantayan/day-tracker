import { Router } from 'express';
const router = Router();

import auth from '../controllers/auth/index';

// Generate OTP
// Generates an OTP for a specified user
router.post('/generate-otp', (req, res) => {
    return auth.generate_otp(req, res);
});

// Resend OTP
// Resends an OTP for a specified user
router.post('/resend-otp', (req, res) => {
    return auth.resend_otp(req, res);
});

// Verify OTP
// Verifies an OTP for a specified user
router.post('/verify-otp', (req, res) => {
    return auth.verify_otp(req, res);
});

// Validate token
// Validates a token for a specified user
router.post('/validate-token', (req, res) => {
    return auth.validate_token(req, res);
});

// Grant user new token
// Grants a user a new token
router.post('/grant-user-new-token', (req, res) => {
    return auth.grant_user_new_token(req, res);
});

// Grant user token
// Grants a user their token if it exists. If not, it creates a new token
router.post('/grant-user-token', (req, res) => {
    return auth.grant_user_token(req, res);
});

// Revoke user token
// Revokes a user's token. Used for global logout
router.post('/revoke-user-token', (req, res) => {
    return auth.revoke_user_token(req, res);
});
export default router;