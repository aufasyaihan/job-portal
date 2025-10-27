export default function Error({ message }: { message: React.ReactNode }) {
    return (
        <p className="px-3 rounded-sm bg-danger-surface text-danger-main text-xs text-center w-full border border-danger-border">
            {message}
        </p>
    );
}
