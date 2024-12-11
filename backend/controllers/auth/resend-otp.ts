import async_wrapper from '../../middleware/async-wrapper';
import { resend_otp as main_function } from '../../utils/auth/otp';

// Resend OTP
// Resends an OTP for a specified user
const resend_otp = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default resend_otp;
