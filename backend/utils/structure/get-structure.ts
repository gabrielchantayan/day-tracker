import { find_one } from "../db/db";
import { log, log_db } from "../misc/logger";
import success_handler from "../misc/success-handler";
import { validate_token } from "../auth/token";
import default_structure from "../structure/default-structure";

const get_structure = async ({ user, token }) => {

    // const validate_token_res = await validate_token({ user: user, token: token });
    // if (!validate_token_res.success) return validate_token_res;

    const structure = await find_one('structures', { user: user });

    if (!structure) {
        log_db(`Structure not found for user ${user}`);
        return success_handler(true, {structure: default_structure});
    }

    return success_handler(true, structure);
};

export  {get_structure}