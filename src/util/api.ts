import qs from 'qs';

export const generateUrl = (path: string, params?: object) => {
	const paramsString = qs.stringify(params, { arrayFormat: 'brackets' });
	const apiEndpoint = 'https://taroko-contacts-server.herokuapp.com';

	const URL =
		paramsString !== '' ? `${apiEndpoint}/${path}?${paramsString}` : `${apiEndpoint}/${path}`;

	return URL;
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const wrapFetch = async (
	path: string,
	method: RequestMethod = 'POST',
	options = { headers: {} },
	params = {},
) => {
	const URL = generateUrl(path, method !== 'POST' ? params : '');
	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...options.headers,
	});

	const body = method !== 'POST' ? null : JSON.stringify(params);

	const result = await fetch(URL, { ...options, headers, method, body });

	return result.json();
};
