// import { pgp_passphrase, pgp_private_key } from '../../secrets';
// import * as openpgp from 'openpgp';
// import { log } from './logger';



// /**
//  * Decrypt a message with the given private key.
//  * @param {string} message The message to decrypt
//  * @returns {Promise<string>} The decrypted message
//  */
// const decrypt_message = async (input_message: string) => {

// 	log(`Decrypting message: ${input_message}`, 5);

// 	const privateKey = await openpgp.decryptKey({
// 		privateKey: await openpgp.readPrivateKey({ armoredKey: pgp_private_key }),
// 		passphrase: pgp_passphrase
// 	});

// 	log('Private key decrypted. Decrypting message', 5);

// 	const message = await openpgp.readMessage({
// 		armoredMessage: input_message, // parse armored message
// 	});

// 	const { data: decrypted, signatures } = await openpgp.decrypt({
// 		message,
// 		decryptionKeys: privateKey,
// 	});	

// 	log('Message decrypted', 5);
// 	log(`Decrypted message: ${decrypted}`, 5);

// 	return decrypted;
// };
// export { decrypt_message };
