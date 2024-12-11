import async_wrapper from '../../middleware/async-wrapper';
import { verify_otp as main_function } from '../../utils/auth/otp';

// Verify OTP
// Verifies an OTP for a specified user
const verify_otp = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default verify_otp;
