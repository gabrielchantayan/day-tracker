import async_wrapper from '../../middleware/async-wrapper';
import { validate_token as main_function } from '../../utils/auth/token';

// Validate token
// Validates a token for a specified user
const validate_token = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default validate_token;
