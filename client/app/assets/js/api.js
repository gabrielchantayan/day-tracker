const api_url = 'http://localhost:3080/api/';
export const post = async (url, data) => {
    
    const response = await fetch(api_url + url, {
		method: 'POST',
        // TODO: Disable this outside of development
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
    
    return await response.json();
}

