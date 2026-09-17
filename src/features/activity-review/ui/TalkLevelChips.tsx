import { SelectableChip } from "../../../shared/ui/selectable-chip";
import { TALK_LEVEL_LABEL, type TalkLevel } from "../model/types";

type Props = {
	value: TalkLevel;
	onChange: (level: TalkLevel) => void;
	partnerTalkLevel?: TalkLevel;
};

const LEVELS: TalkLevel[] = ["SILENT", "LIGHT_CHAT"];

export function TalkLevelChips({ value, onChange, partnerTalkLevel }: Props) {
	return (
		<div>
			<div className="flex gap-2">
				{LEVELS.map((level) => (
					<SelectableChip
						key={level}
						label={TALK_LEVEL_LABEL[level]}
						selected={value === level}
						onClick={() => onChange(level)}
					/>
				))}
			</div>
			{partnerTalkLevel && (
				<p className="mt-2 text-xs text-body">
					상대가 설정한 수준: {TALK_LEVEL_LABEL[partnerTalkLevel]}
				</p>
			)}
		</div>
	);
}
