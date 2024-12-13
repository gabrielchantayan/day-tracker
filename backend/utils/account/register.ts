import { grant_user_new_token } from '../auth/token';
import { check_if_exists, insert } from '../db/db';
import { log } from '../misc/logger';
import success_handler from '../misc/success-handler';

/*

[0]   first_name: 'Gabriel',
[0]   last_name: 'Chantayan',
[0]   email: 'me@gabrielchantayan.com',
[0]   phone: '+15442232233',
[0]   jobs: [
[0]     {
[0]       title: 'Foo',
[0]       company: 'Bar',
[0]       location: 'Foobar',
[0]       start_date: '2-2023',
[0]       current: true,
[0]       responsibilities: 'R1\nr2\nr3',
[0]       skills: [Array]
[0]     },
[0]     {
[0]       title: 'Beetle Chef',
[0]       company: 'Boston Beel Bem',
[0]       location: 'Beetleland. BG',
[0]       start_date: '02-2021',
[0]       end_date: '9-2023',
[0]       responsibilities: 'Be\nttl\nes'
[0]     }
[0]   ],
[0]   education: [
[0]     {
[0]       institution: 'Edu1',
[0]       field_of_study: 'Ed',
[0]       degree: '1132',
[0]       gpa: '2.34',
[0]       start_date: '10-2032',
[0]       end_date: '2-1932',
[0]       relevant_courses: 'eewew\neweww\newerw\ner',
[0]       clubs_honors_and_awards: 'erm\nerm\nerm\nerm'
[0]     }
[0]   ],
[0]   projects: [
[0]     {
[0]       title: 'Proj1',
[0]       description: 'Proje22e21e1. 12',
[0]       end_date: '08-2020',
[0]       skills: [Array],
[0]       start_date: '12-1920'
[0]     }
[0]   ],
[0]   interests: [
[0]     { value: 'int1', label: 'int1' },
[0]     { value: 'int2', label: 'int2' }
[0]   ],
[0]   skills: [
[0]     { value: 'sk1', label: 'sk1' },
[0]     { value: 'sk3', label: 'sk3' },
[0]     { value: 'sk32', label: 'sk32' }
[0]   ],
[0]   languages: [
[0]     { code: 'Egyptian Arabic', fluency: 'intermediate' },
[0]     { code: 'Aghem', fluency: 'beginner' }
[0]   ]
[0] }

*/

/**
 * Given an array of select options, return an array of just the values.
 * @param {Array<{value: string, label: string}>} data - The array of select options.
 * @returns {string[]} - The array of just the values.
 */
const uncompress_select = (data: any) => {
    // if data is empty, return empty array
    if (!data) return [];
    return data.map((item: any) => item.value);
}

const register = async ({ email, form_info }: { email: string, form_info: any }) => {

	log(`Register: Registering user ${email}`);
	log(form_info, 5);

    const result = await check_if_exists('users', { email: email });

    if (result) {

		log(`Register: User ${email} already exists`);
        return success_handler(false, null, "error.register.user-already-exists")

    } else {

		log(`Register: User ${email} does not exist. Creating user`);

        // dear god
        const user = {
			first_name: form_info.first_name,
			last_name: form_info.last_name,
			account_email: email,
			email: form_info.email,
			phone: form_info.phone,
			plan: 'free',
			created_at: new Date(),
			updated_at: new Date(),
			last_login_at: new Date(),
			status: 'active',
			resume: {
				jobs: form_info.jobs.map((job: any) => ({
					...job,
					skills: uncompress_select(job.skills),
				})),
				education: form_info.education,
				projects: form_info.projects.map((project: any) => ({
					...project,
					skills: uncompress_select(project.skills),
				})),
				interests: uncompress_select(form_info.interests),
				skills: uncompress_select(form_info.skills),
				languages: [...form_info.languages],
			},
			statistics: {
				jobs_application_started_count: 0,
				jobs_application_completed_count: 0,
				jobs_viewed_count: 0,
				openai_api_calls: 0,
				openai_api_cost: 0.0,
			},
			job_board_logins: {},
			job_applications: {},
		};

		log(user, 5);

		log(`Register: Saving user ${email} to database`);

        // save user to database
        await insert('users', user);

        // Create a token for the user

		log(`Register: Creating token for user ${email}`);

        const token =  await grant_user_new_token(email);

        return success_handler(true, { token: token.data.token, name: `${form_info.first_name} ${form_info.last_name}`, email:email }, "success.register.user-created") 

    }

};


export { register }