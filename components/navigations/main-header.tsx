import ProfileDropdown from "./profile-dropdown";

export default function MainHeader() {
    return (
        <header className="sticky top-0 z-10 px-[120px] py-3 shadow-xs w-full">
            <nav className="w-full flex justify-end items-center">
                <div className="border-l border-neutral-40 w-fit flex justify-end pl-4">
                    <ProfileDropdown />
                </div>
            </nav>
        </header>
    );
}
