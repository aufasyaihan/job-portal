import EmptyJobIcon from "@/components/icons/empty-job";

export default function EmptyJob({
    message,
    renderContent,
}: {
    message: string;
    renderContent?: React.ReactNode;
}) {
    return (
        <div className="flex-1 shadow-none flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4 text-center">
                <EmptyJobIcon />
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-xl text-neutral-90">
                        No job openings available
                    </h3>
                    <p className="text-sm text-neutral-90">
                        {message ||
                            "Please wait for the next batch of openings."}
                    </p>
                </div>
                {renderContent}
            </div>
        </div>
    );
}
