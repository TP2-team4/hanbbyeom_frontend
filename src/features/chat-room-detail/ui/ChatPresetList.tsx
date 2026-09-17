import type { ChatPreset, PresetCode } from "../../../entities/chat-room";

type Props = {
	presets: ChatPreset[];
	disabled?: boolean;
	onSelect: (code: PresetCode) => void;
};

export function ChatPresetList({ presets, disabled = false, onSelect }: Props) {
	if (presets.length === 0) return null;

	return (
		<div>
			<div className="flex gap-2 overflow-x-auto pb-1">
				{presets.map((preset) => (
					<button
						key={preset.code}
						type="button"
						disabled={disabled}
						onClick={() => onSelect(preset.code)}
						className={`shrink-0 rounded-full border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
							preset.code === "CANNOT_PARTICIPATE"
								? "border-error-accent bg-error-bg text-error-text"
								: "border-border bg-action-primary text-title"
						}`}
					>
						{preset.content}
					</button>
				))}
			</div>
		</div>
	);
}
