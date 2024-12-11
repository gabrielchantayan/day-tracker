import async_wrapper from '../../middleware/async-wrapper';
import { generate_otp as main_function } from '../../utils/auth/otp';

// Generate OTP
// Generates an OTP for a specified user
const generate_otp = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default generate_otp;
