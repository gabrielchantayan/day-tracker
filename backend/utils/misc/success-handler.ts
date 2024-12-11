/**
 * A generic success handler for API endpoints.
 *
 * @param {boolean} success - Whether the request was successful
 * @param {any} [data=null] - The data returned from the API, if any
 * @param {string} [message=null] - A message about the request
 *
 * @returns {object} An object with the success status, data and message
 */
const success_handler = (success: boolean, data: any = null, message: string = null) => {
    
    return {
        "success": success,
        "data": data,
        "message": message
    }
}

export default success_handler