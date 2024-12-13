import puppeteer from 'puppeteer';
import { log, log_browser_action as lba } from '../misc/logger';
import { decrypt_message } from '../misc/pgp';

const ss = async (page, note = '') => {
	await page.screenshot({ path: `zz_ss/${new Date().getTime()}-${note.replaceAll(' ', '_')}-page.png`, fullPage: true });
};

const test_account_login = async ({ provider, username, password }) => {
	const decrypted_password = await decrypt_message(password);

	log('Authenticating external account', 5, 'EXT-AUTH');
	log(`Provider: ${provider}\nUsername: ${username}\nPassword: ${decrypted_password}`, 5, 'EXT-AUTH');

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	if (provider === 'linkedin') {
		lba('Navigating to LinkedIn');
		await page.goto('https://www.linkedin.com/login');

		await page.setViewport({ width: 1080, height: 1024 });

		lba(`Filling in username: ${username}`);
		await page.locator('#username').fill(username);

		lba(`Filling in password: ${decrypted_password}`);
		await page.locator('#password').fill(`${decrypted_password}`);

		lba('Clicking login button');

		ss(page, 'Before clicking login button');

		await Promise.all([
			lba('Waiting for page to load'),
			page.locator('.login__form_action_container > button').click(),
			ss(page, 'After clicking login button'),

            lba('Waiting for navigation'),
			page.waitForNavigation({ waitUntil: 'networkidle0' }),
            lba('Wavigated'),
            ss(page, 'After waiting for navigation'),
		]);

		if (
			(await page.$('#error-for-password'))
				.getProperty('class')
				.then((className) => `${className}`.split(' ').includes('hidden'))
		) {
			lba('Errors found on login page. Login failed due to incorrect password');

			// return ;
		} else {
			lba('Well atleast the password aint fucked. Login successfull');
			// return true;
		}

		ss(page, 'After waiting for page to load');

		if (await page.$('.form__label--error')) {
			lba('No errors found on login page');

			return false;
		} else {
			lba('Errors found on login page');
			return true;
		}
	}
};

export { test_account_login };
