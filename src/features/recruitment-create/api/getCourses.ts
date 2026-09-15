export async function getCourses() {
	const response = await fetch("/api/run/courses");
	return response.json();
}
