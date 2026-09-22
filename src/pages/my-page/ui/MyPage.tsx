import { MyProfileContent } from "../../../features/my-profile";

export default function MyPage() {
	return (
		<div className="flex min-h-full flex-col">
			<div className="flex-1 px-6 pb-6 pt-5">
				<div className="flex justify-end">
				</div>
				<MyProfileContent />
			</div>
		</div>
	);
}
