export default function Error({ message }: { message: string }) {
    return (
        <p className="px-3 rounded-sm bg-danger-surface text-danger-main text-sm text-center w-full border border-danger-border">
            {message}
        </p>
    );
}
