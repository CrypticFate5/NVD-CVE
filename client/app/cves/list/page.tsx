"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CvesItemType {
    cveId: string;
    sourceIdentifier: string;
    published: Date;
    lastModified: Date;
    vulnStatus: string;
}

const List = () => {
    const [data, setData] = useState<CvesItemType[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [docsLen, setDocsLen] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/cves/?page=${page}&limit=${limit}`);
                setData(res.data.formattedData);
                setDocsLen(res.data.pagination.docsLen)
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [page, limit]);

    const rowClickRoute = (cveId: string) => {
        router.push(`/cves/${cveId}`);
    }
    const totalRecords = docsLen;
    return (
        <div>
            <h1 className=" mt-7 text-center text-2xl font-bold">CVE LIST</h1>
            <p className="font-semibold text-sm">Total Records: {totalRecords}</p>

            <div className="">
                <table className="w-full text-sm text-center border-collapse ">
                    <thead className="text-xm uppercase bg-gray-300">
                        <tr className="">
                            <th scope="col" className="border px-6 py-3">
                                CVE-ID
                            </th>
                            <th scope="col" className="border px-6 py-3">
                                IDENTIFIER
                            </th>
                            <th scope="col" className="border px-6 py-3">
                                PUBLISHED DATE
                            </th>
                            <th scope="col" className="border px-6 py-3">
                                LAST MODIFIED DATE
                            </th>
                            <th scope="col" className="border px-6 py-3">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, idx) => (
                                <tr className="hover:bg-blue-50 cursor-pointer" key={idx} onClick={() => rowClickRoute(item.cveId)}>
                                    <td className="border px-6 py-4">
                                        {item.cveId}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {item.sourceIdentifier}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {new Date(item.published).toLocaleDateString("en-GB", {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        }).replace(/ /g, ' ')}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {new Date(item.lastModified).toLocaleDateString("en-GB", {
                                            day: "numeric", month: "short", year: "numeric"
                                        }).replace(/ /g, " ")}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {item.vulnStatus}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <form className="flex ">
                <label htmlFor="limit" className="m-2 text-sm font-medium ">Results per page:</label>
                <select id="limit" className="border mt-2 text-sm focus:border-blue-500 cursor-pointer "
                    value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </form>
        </div>
    )
};

export default List;