export async function getCourses() {
	const response = await fetch("/api/courses");
	return response.json();
}
