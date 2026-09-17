export function formatDate(dateString: string) {
	if (!dateString) return "";
	return new Intl.DateTimeFormat("ko-KR", {
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format(new Date(dateString));
}

export function parseDateValue(dateString: string) {
	return dateString ? new Date(`${dateString}T00:00:00`) : undefined;
}

export function toDateValue(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function parseTimeValue(timeString: string) {
	if (!timeString) return undefined;
	const [hours, minutes] = timeString.split(":").map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
}

export function toTimeValue(date: Date) {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${hours}:${minutes}`;
}
