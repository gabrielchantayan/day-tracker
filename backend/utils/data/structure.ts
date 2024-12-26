import { find_one, update } from "../db/db";
import success_handler from "../misc/success-handler";

export const get_structure = async ({ user, token }) => {

    const structure = await find_one('structure', { user: user });

    if (!structure) return success_handler(false, null, 'error.structure.not-found');


    return success_handler(true, { ...structure.data }, 'structure.found');
};

export const update_structure = async ({ user, token, structure }) => {


    const update_res = await update('structure', { user: user }, structure);

    if (!update_res) return success_handler(false, null, 'error.structure.not-updated');

    return success_handler(true, null, 'structure.updated');
};