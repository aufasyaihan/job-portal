import { getAllCandidates } from "@/data-access-layer/candidate";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import MainHeader from "@/components/navigations/main-header";
import EmptyCandidate from "@/components/icons/empty-candidate";

const headers = [
    { key: "full_name", label: "Nama Lengkap" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone Numbers" },
    { key: "date_of_birth", label: "Date of Birth" },
    { key: "domicile", label: "Domicile" },
    { key: "gender", label: "Gender" },
    { key: "linkedin_link", label: "Link Linkedin" },
];

export default async function JobDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string; name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id } = await params;
    const { j : name } = await searchParams;
    const candidates = await getAllCandidates(id);

    return (
        <>
            <MainHeader
                breadcrumbs={[
                    { label: "Job List", href: "/admin/jobs" },
                    { label: "Manage Candidates", disabled: true },
                ]}
            />
            <div className="flex-1 flex flex-col gap-6 px-[104px] py-10">
                <h1 className="font-bold text-2xl text-neutral-100 capitalize">{name}</h1>
                <Card className="flex-1">
                    <CardContent className="flex-1">
                        {candidates.length === 0 ? (
                            <div className="flex flex-col gap-6 text-center text-neutral-80 justify-center items-center h-full flex-1">
                                <EmptyCandidate />
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg">
                                        No candidates found
                                    </h3>
                                    <p className="text-sm text-neutral-70">
                                        Share your job vacancies so that more
                                        candidates will apply.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-neutral-20 border-b-0">
                                        <TableHead className="w-12">
                                            <Checkbox />
                                        </TableHead>
                                        {headers.map((header) => (
                                            <TableHead
                                                key={header.key}
                                                className="font-bold text-neutral-100 uppercase text-xs"
                                            >
                                                {header.label}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidates.map((candidate) => {
                                        const attributeMap = new Map(
                                            candidate.attributes.map((attr) => [
                                                attr.key,
                                                attr.value,
                                            ])
                                        );

                                        return (
                                            <TableRow
                                                key={candidate.id}
                                                className="hover:bg-neutral-10"
                                            >
                                                <TableCell>
                                                    <Checkbox />
                                                </TableCell>
                                                {headers.map((header) => {
                                                    const value =
                                                        attributeMap.get(
                                                            header.key
                                                        );
                                                    const displayValue =
                                                        value || "-";

                                                    return (
                                                        <TableCell
                                                            key={header.key}
                                                            className="text-neutral-80"
                                                        >
                                                            {header.key ===
                                                                "linkedin_link" &&
                                                            value ? (
                                                                <a
                                                                    href={value}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary-main hover:underline truncate block max-w-xs"
                                                                >
                                                                    {value}
                                                                </a>
                                                            ) : (
                                                                displayValue
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
