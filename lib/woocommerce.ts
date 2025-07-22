type FetchOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: object;
	params?: Record<string, any>;
};

export const wooApiFetch = async (
	endpoint: string,
	options: FetchOptions = {},
	namespace: string = "/wc/v3",
) => {
	// const WC_API_URL = 'https://storesdemo.morr.biz/wp-json' + namespace;
	// const WC_CONSUMER_KEY = 'ck_b6dba5073ef0694a34914e223620204315501c6b';
	// const WC_CONSUMER_SECRET = 'cs_f685d55bd439c404fa5a4a03c30a2b5ccb7af74a';
	const WC_API_URL = "https://growretail.my/wp-json" + namespace;
	const WC_CONSUMER_KEY = "ck_fd4839218277c63698a2982dcd38975df1433a34";
	const WC_CONSUMER_SECRET = "cs_a276063b18d09ffa3df96e1aac8dd34b1904bcdc";
	if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
		throw new Error("WooCommerce API credentials are not set.");
	}

	if (!endpoint) {
		throw new Error("Endpoint is required for WooCommerce API requests.");
	}

	// Basic Authentication header
	const credentials = `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`;
	const encoded = btoa(credentials);
	const authHeader = `Basic ${encoded}`;

	const { method = "GET", body, params } = options;

	let url = `${WC_API_URL}/${endpoint}`;

	if (params) {
		const queryParams = new URLSearchParams(params).toString();
		url += `?${queryParams}`;
	}
	console.log(`Making WooCommerce API request to: ${url}`);
	try {
		const response = await fetch(url, {
			method,
			headers: {
				Authorization: authHeader,
				"Content-Type": "application/json",
				auth: "fdFSDFERfsdgd",
			},
			body: body ? JSON.stringify(body) : null,
		});
		console.log(`WooCommerce API Request: ${method} ${url}`, body);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error(`WooCommerce API Error (${endpoint}):`, error);
		throw error;
	}
};
