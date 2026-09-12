export function AppHeader() {
    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-surface px-6">
            <h1 className="font-jejudoldam text-3xl text-title">한뼘</h1>
            <button
                type="button"
                aria-label="알림 열기"
                className="grid size-10 place-items-center text-body"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-6 fill-none stroke-current"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8" />
                    <path d="M10 21h4" />
                </svg>
            </button>
        </header>
    );
}
