"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface cvssDataTypeV2 {
    version: string;
    vectorString: string;
    accessVector: string;
    accessComplexity: string;
    authentication: string;
    confidentialityImpact: string;
    integrityImpact: string;
    availabilityImpact: string;
    baseScore: number;
    baseSeverity?: string;
};
interface cvssDataTypeV3 {
    version: string;
    vectorString: string;
    attackVector: string;
    attackComplexity: string;
    privilegesRequired: string;
    confidentialityImpact: string;
    integrityImpact: string;
    availabilityImpact: string;
    baseScore: number;
    baseSeverity?: string;
};

interface CVSSMV2 {
    source: string;
    type: string;
    cvssData: cvssDataTypeV2;
    baseSeverity: string;
    exploitabilityScore: number;
    impactScore: number;
    acInsufInfo: boolean;
    obtainAllPrivilege: boolean;
    obtainUserPrivilege: boolean;
    obtainOtherPrivilege: boolean;
    userInteractionRequired: boolean;
};


interface CVSSMV3 {
    source: string;
    type: string;
    cvssData: cvssDataTypeV3;
    exploitabilityScore: number;
    impactScore: number;
};

interface CpeMatchType {
    vulnerable: boolean;
    criteria: string;
    matchCriteriaId: string;
};

interface CvesDetailType {
    _id: string;
    cveId: string;
    descriptions: string;
    cvssMetricV20: CVSSMV2[];
    cvssMetricV30: CVSSMV3[];
    cvssMetricV31: CVSSMV3[];
    cpeMatch: CpeMatchType[];
}

const CveDetails = ({ params }: {
    params: { cve: string }
}) => {
    const [data, setData] = useState<CvesDetailType>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:5000/cves/${params.cve}`);
            setData(res.data);
        }
        fetchData();
    }, []);
    return (
        <>
            <title>{params.cve}</title>
            <div className="m-2">
                <h1 className="my-2 text-3xl font-semibold">{data?.cveId}</h1>
                <h2 className="text-xl font-semibold">Description:</h2>
                <p className="my-2">{data?.descriptions}</p>
                {data?.cvssMetricV20.length && data?.cvssMetricV20.length > 0 ? (
                    <div className="v2Metrics">
                        <h2 className="text-xl font-semibold my-2">CVSS V2 Metrics:</h2>
                        <div className="flex">
                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Severity:  </h3>
                                <p className="mx-1">{data?.cvssMetricV20[0].baseSeverity}</p>
                            </div>
                            <div className="flex">
                                <h3 className=" text-base font-semibold">Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV20[0].cvssData.baseScore}</p>
                            </div>
                        </div>
                        <div className="flex mt-1">
                            <h3 className="text-base font-semibold">Vector String:  </h3>
                            <p className="mx-1">{data?.cvssMetricV20[0].cvssData.vectorString}</p>
                        </div>
                        <table className="w-full text-sm text-center border-collapse my-3">
                            <thead className="text-xs ">
                                <tr className="">
                                    <th scope="col" className="border px-6 py-3">
                                        Access Vector
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Access Complexity
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Authentication
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Confidentiality Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Integrity Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Availability Impact
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.accessVector}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.accessComplexity}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.authentication}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.confidentialityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.integrityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV20[0].cvssData.availabilityImpact}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="scores">
                            <h2 className="text-xl font-semibold my-2">Scores:</h2>

                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Exploitablity Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV20[0].exploitabilityScore}</p>
                            </div>
                            <div className="flex my-2">
                                <h3 className=" text-base font-semibold">Impact Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV20[0].impactScore}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
                {data?.cvssMetricV30.length && data?.cvssMetricV30.length > 0 ? (
                    <div className="v30Metrics">
                        <h2 className="text-xl font-semibold my-2">CVSS V3.0 Metrics:</h2>
                        <div className="flex">
                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Severity:  </h3>
                                <p className="mx-1">{data?.cvssMetricV30[0].cvssData.baseSeverity}</p>
                            </div>
                            <div className="flex">
                                <h3 className=" text-base font-semibold">Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV30[0].cvssData.baseScore}</p>
                            </div>
                        </div>
                        <div className="flex mt-1">
                            <h3 className="text-base font-semibold">Vector String:  </h3>
                            <p className="mx-1">{data?.cvssMetricV30[0].cvssData.vectorString}</p>
                        </div>
                        <table className="w-full text-sm text-center border-collapse my-3">
                            <thead className="text-xs ">
                                <tr className="">
                                    <th scope="col" className="border px-6 py-3">
                                        Attack Vector
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Attack Complexity
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Privileges Required
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Confidentiality Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Integrity Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Availability Impact
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.attackVector}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.attackComplexity}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.privilegesRequired}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.confidentialityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.integrityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV30[0].cvssData.availabilityImpact}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="scores">
                            <h2 className="text-xl font-semibold my-2">Scores:</h2>

                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Exploitablity Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV30[0].exploitabilityScore}</p>
                            </div>
                            <div className="flex my-2">
                                <h3 className=" text-base font-semibold">Impact Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV30[0].impactScore}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
                {data?.cvssMetricV31.length && data?.cvssMetricV31.length > 0 ? (
                    <div className="v31Metrics">
                        <h2 className="text-xl font-semibold my-2">CVSS V3.1 Metrics:</h2>
                        <div className="flex">
                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Severity:  </h3>
                                <p className="mx-1">{data?.cvssMetricV31[0].cvssData.baseSeverity}</p>
                            </div>
                            <div className="flex">
                                <h3 className=" text-base font-semibold">Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV31[0].cvssData.baseScore}</p>
                            </div>
                        </div>
                        <div className="flex mt-1">
                            <h3 className="text-base font-semibold">Vector String:  </h3>
                            <p className="mx-1">{data?.cvssMetricV31[0].cvssData.vectorString}</p>
                        </div>
                        <table className="w-full text-sm text-center border-collapse my-3">
                            <thead className="text-xs ">
                                <tr className="">
                                    <th scope="col" className="border px-6 py-3">
                                        Attack Vector
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Attack Complexity
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Privileges Required
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Confidentiality Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Integrity Impact
                                    </th>
                                    <th scope="col" className="border px-6 py-3">
                                        Availability Impact
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.attackVector}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.attackComplexity}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.privilegesRequired}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.confidentialityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.integrityImpact}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data?.cvssMetricV31[0].cvssData.availabilityImpact}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="scores">
                            <h2 className="text-xl font-semibold my-2">Scores:</h2>

                            <div className="flex mr-6">
                                <h3 className=" text-base font-semibold">Exploitablity Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV31[0].exploitabilityScore}</p>
                            </div>
                            <div className="flex my-2">
                                <h3 className=" text-base font-semibold">Impact Score:  </h3>
                                <p className="mx-1">{data?.cvssMetricV31[0].impactScore}</p>
                            </div>
                        </div>
                    </div>

                ) : null}

                <div className="cpeMetrics">
                    <h2 className="text-xl font-semibold my-3">CPE:</h2>
                    <table className=" w-fit text-sm text-center border-collapse my-3">
                        <thead className=" text-xs ">
                            <tr className="">
                                <th scope="col" className="border px-6 py-3">
                                    Criteria
                                </th>
                                <th scope="col" className="border px-6 py-3">
                                    Match Criteria ID
                                </th>
                                <th scope="col" className="border px-6 py-3">
                                    Vulnerable
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.cpeMatch.map((cpe, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-6 py-4">
                                            {cpe.criteria}
                                        </td>
                                        <td className="border px-6 py-4">
                                            {cpe.matchCriteriaId}
                                        </td>
                                        <td className="border px-6 py-4">
                                            {cpe.vulnerable ? "Yes" : "No"}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default CveDetails;