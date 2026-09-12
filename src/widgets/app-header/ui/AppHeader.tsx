type Props = {
    onProfileClick?: () => void;
};

export function AppHeader({ onProfileClick }: Props) {
    return (
        <header className="flex h-20 items-center justify-between bg-surface px-6">
            <h1 className="font-jejudoldam text-3xl text-title">한뼘</h1>
        </header>
    );
}
