import axios from "axios";
import CVE from "../models/CVEModel.js";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.API;
const limit = 247000;
let c = 0;

const apiPullData = async () => {
    try {
        for (let startIndex = 0; startIndex < limit; startIndex += 2000) {
            const response = await axios.get(api + startIndex);
            const vulnerabilities = response.data.vulnerabilities;

            for (const vuln of vulnerabilities) {
                c++;
                const cveData = vuln.cve;
                const cpeMatch = getCPEMatch(vuln.cve.configurations);

                const newData = {
                    cveId: cveData.id,
                    sourceIdentifier: cveData.sourceIdentifier,
                    published: new Date(cveData.published),
                    lastModified: new Date(cveData.lastModified),
                    vulnStatus: cveData.vulnStatus,
                    descriptions: cveData.descriptions ? cveData.descriptions[0].value : "",
                    cvssMetricV20: cveData.metrics.cvssMetricV2 || [],
                    cvssMetricV30: cveData.metrics.cvssMetricV30 || [],
                    cvssMetricV31: cveData.metrics.cvssMetricV31 || [],
                    cpeMatch: cpeMatch
                };

                const newCVE = new CVE(newData);
                await newCVE.save();
                console.log(`Data added ${c}`);
            }
        }
        console.log("Data import completed.");
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

const getCPEMatch = (configurations) => {
    let cpeMatch = [];
    if (configurations) {
        for (const conf of configurations) {
            const nodes = conf.nodes;
            if (nodes) {
                for (const node of nodes) {
                    if (node.cpeMatch) {
                        cpeMatch = cpeMatch.concat(node.cpeMatch);
                    }
                }
            }
        }
    }
    return cpeMatch;
};

export default apiPullData;
