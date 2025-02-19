import { find_one } from "../db/db";
import { log, log_db } from "../misc/logger";
import success_handler from "../misc/success-handler";
import { validate_token } from "../auth/token";
import default_structure from "../structure/default-structure";

const get_structure = async ({  token }) => {

    const user = 'me@gabrielchantayan.com';

    // const validate_token_res = await validate_token({ user: user, token: token });
    // if (!validate_token_res.success) return validate_token_res;

    const structure = await find_one('structures', { user: user });


        const prefills = await find_one('prefill', { user: user });

    if (!!prefills) {
        for (const [category, fields] of Object.entries(structure.structure)) {
            for (const [field, value] of Object.entries(fields['fields'] as { any })) {

                
                if (value.type === 'multi-select') {


                    try {
                        structure.structure[category]['fields'][field].options = prefills.data[value['name']];
                    }
                    catch (e) {
                        log(`Error updating structure:\n${JSON.stringify(e, null, 2)}`, 3, 'STRUCTURES');
                    }

				}
			}
		}
    }

    if (!structure) {
        log_db(`Structure not found for user ${user}`);
        return success_handler(true, {structure: default_structure});
    }

    return success_handler(true, structure);
};

export  {get_structure}

