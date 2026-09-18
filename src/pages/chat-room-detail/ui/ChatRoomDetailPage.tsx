import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	ChatMessageBubble,
	type ChatPreset,
} from "../../../entities/chat-room";
import { useChatRooms } from "../../../features/chat-room-list";
import {
	ChatMessageComposer,
	ChatPresetList,
	useChatPresets,
	useChatRoomMessages,
} from "../../../features/chat-room-detail";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

// TODO: 인증 사용자 정보 조회 API가 연결되면 실제 사용자 ID로 교체
const MOCK_CURRENT_USER_ID = 1;

export default function ChatRoomDetailPage() {
	const navigate = useNavigate();
	const { activityMatchId } = useParams();
	const id = Number(activityMatchId);
	const isValidId = Number.isInteger(id) && id > 0;

	const {
		chatRooms,
		isLoading: isChatRoomLoading,
		error: chatRoomError,
	} = useChatRooms();
	const chatRoom = chatRooms.find((room) => room.activityMatchId === id);
	const resolvedMatchId =
		isValidId && !isChatRoomLoading && chatRoom ? id : null;

	const { messages, isLoading, error, isSending, sendError, sendMessage } =
		useChatRoomMessages(resolvedMatchId);
	const {
		presets,
		isLoading: isPresetLoading,
		error: presetError,
	} = useChatPresets();

	const bottomRef = useRef<HTMLDivElement>(null);
	const messageListRef = useRef<HTMLElement>(null);
	const hasInitialScroll = useRef(false);
	const isNearBottom = useRef(true);

	useEffect(() => {
		hasInitialScroll.current = false;
		isNearBottom.current = true;
	}, [resolvedMatchId]);

	useEffect(() => {
		if (isLoading || resolvedMatchId === null) return;
		if (!hasInitialScroll.current || isNearBottom.current) {
			bottomRef.current?.scrollIntoView({ block: "end" });
			hasInitialScroll.current = true;
		}
	}, [isLoading, messages, resolvedMatchId]);

	const handleMessageScroll = () => {
		const element = messageListRef.current;
		if (!element) return;
		const remaining =
			element.scrollHeight - element.scrollTop - element.clientHeight;
		isNearBottom.current = remaining < 80;
	};

	const isRoomNotFound =
		!isChatRoomLoading && !chatRoomError && (!isValidId || !chatRoom);
	const canSendMessage = Boolean(
		chatRoom && chatRoom.status !== "completed" && resolvedMatchId !== null,
	);

	const [showCancelConfirm, setShowCancelConfirm] = useState(false);

	const handlePresetSelect = (preset: ChatPreset) => {
		if (preset.code === "CANNOT_PARTICIPATE") {
			setShowCancelConfirm(true);
			return;
		}
		void sendMessage(preset.content);
	};

	return (
		<main className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-primary-50 px-6">
				<button
					type="button"
					aria-label="뒤로 가기"
					className="grid size-10 place-items-center text-title"
					onClick={() => navigate(-1)}
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-7 fill-none stroke-current"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<h1 className="text-2xl font-bold text-title">
					{chatRoom?.participantNickname ?? "채팅"}
				</h1>
			</header>

			<section
				ref={messageListRef}
				onScroll={handleMessageScroll}
				className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
			>
				{isRoomNotFound && (
					<StatusText>채팅방을 찾을 수 없어요.</StatusText>
				)}
				{chatRoomError && (
					<ErrorText className="text-center text-sm">
						{chatRoomError}
					</ErrorText>
				)}
				{isChatRoomLoading && (
					<StatusText>채팅방을 불러오는 중...</StatusText>
				)}
				{resolvedMatchId !== null && isLoading && (
					<StatusText>메시지를 불러오는 중...</StatusText>
				)}
				{resolvedMatchId !== null && error && (
					<ErrorText className="text-center text-sm">
						{error}
					</ErrorText>
				)}
				{resolvedMatchId !== null &&
					!isLoading &&
					!error &&
					messages.length === 0 && (
						<StatusText>아직 주고받은 메시지가 없어요.</StatusText>
					)}
				{resolvedMatchId !== null &&
					!isLoading &&
					!error &&
					messages.map((message) => (
						<ChatMessageBubble
							key={message.id}
							message={message}
							currentUserId={MOCK_CURRENT_USER_ID}
						/>
					))}
				<div ref={bottomRef} />
			</section>

			{canSendMessage && (
				<>
					{presetError && (
						<ErrorText className="px-4 py-2 text-sm">
							{presetError}
						</ErrorText>
					)}
					<ChatPresetList
						presets={presets}
						disabled={isPresetLoading || isSending}
						onSelect={handlePresetSelect}
					/>
					{sendError && (
						<ErrorText className="px-4 pb-2 text-sm">
							{sendError}
						</ErrorText>
					)}
					<ChatMessageComposer
						isSending={isSending}
						onSend={sendMessage}
					/>
				</>
			)}
			{chatRoom?.status === "completed" && (
				<StatusText className="shrink-0 border-t border-divider bg-surface px-4 py-5">
					종료된 채팅방이에요.
				</StatusText>
			)}

			{showCancelConfirm && resolvedMatchId !== null && (
				<ConfirmModal
					title="활동 참여를 취소할까요?"
					description="상대에게 취소 사실이 전달되고 예정된 활동에서 제외돼요."
					cancelLabel="계속 참여"
					confirmLabel="취소하기"
					confirmVariant="destructive"
					onCancel={() => setShowCancelConfirm(false)}
					onConfirm={() =>
						navigate(`/activities/${resolvedMatchId}/cancel`)
					}
				/>
			)}
		</main>
	);
}
