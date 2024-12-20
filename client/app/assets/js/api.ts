const api_url = 'http://localhost:3080/api/';
export const post = async (url: string[], data: any) => {

	console.log(data);
    
    const response = await fetch(api_url + url.join('/'), {
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

