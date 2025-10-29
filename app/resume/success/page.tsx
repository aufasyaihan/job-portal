import ResumeSent from "@/components/icons/resume-sent";

export default function ResumeSuccessPage() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full w-full flex-1">
            <ResumeSent />
            <div className="flex flex-col justify-center items-center text-neutral-90">
                <h1 className="font-bold text-2xl">🎉 Your application was sent!</h1>
                <p className="font-normal text-base text-center">
                    Congratulations! You&apos;ve taken the first step towards a
                    rewarding career at Rakamin. We look forward to learning
                    more about you during the application process.
                </p>
            </div>
        </div>
    );
}
