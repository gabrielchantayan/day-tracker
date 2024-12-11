import { create_collection, collections } from "../db/db";

/**
 * Initializes the MongoDB database by creating the collections
 * listed in the `collections` array.
 *
 * @returns {Promise<boolean>} true if the initialization is successful
 */
const initialize_database = async (): Promise<boolean> => {
    for (const collection of collections) {
        await create_collection(collection);
    }
    return true;
}


const initialize = async (): Promise<boolean> => {

    await initialize_database();


    return true;
}

export default initialize;