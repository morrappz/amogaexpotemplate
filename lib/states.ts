export async function getStatesByCountry(country: string) {
	const res = await fetch(
		"https://countriesnow.space/api/v0.1/countries/states",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ country }),
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch states");
	}

	const data = await res.json();
	return data.data.states; // array of { name: string }
}
