import CVEModel from "../models/CVEModel.js";

export const getCvesList = async (req, res) => {
    try {
        const data = await CVEModel.find();
        if (!data || data.length == 0)
            throw new Error("CVE List not found");
        const formattedData = data.map(({ _id, cveId, sourceIdentifier, published, lastModified, vulnStatus }) => {
            return { _id, cveId, sourceIdentifier, published, lastModified, vulnStatus };
        });
        res.status(200).json(formattedData);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getCveDetails = async (req, res) => {
    try {
        const { cveId } = req.params;
        const data = await CVEModel.find({ cveId: cveId });
        if (!data || data.length == 0)
            throw new Error("CVE not found");
        const formattedData = data.map(
            ({ _id, cveId, descriptions, cvssMetricV20, cvssMetricV30, cvssMetricV31, cpeMatch }) => {
                return { _id, cveId, descriptions, cvssMetricV20, cvssMetricV30, cvssMetricV31, cpeMatch };
            }
        )
        res.status(200).json(formattedData);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getCveByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const data = await CVEModel.find({
            $expr:
            {
                $eq: [
                    { $year: "$published" },
                    year
                ]
            }
        });
        if (!data || data.length == 0)
            throw new Error("Year not found");
        const formattedData = data.map(({ _id, cveId, sourceIdentifier, published, lastModified, vulnStatus }) => {
            return { _id, cveId, sourceIdentifier, published, lastModified, vulnStatus };
        });
        res.status(200).json(formattedData);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getCveByScore = async (req, res) => {
    try {
        const { score } = req.params;
        const data = await CVEModel.find(
            {
                $or: [
                    { 'cvssMetricV20.cvssData.baseScore': parseFloat(score) },
                    { 'cvssMetricV30.cvssData.baseScore': parseFloat(score) },
                    { 'cvssMetricV31.cvssData.baseScore': parseFloat(score) }
                ]
            }
        );
        if (!data || data.length == 0)
            throw new Error("Score not found");
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getCveByDays = async (req, res) => {
    try {
        let { days } = req.params;
        if (days != parseInt(days) || days < 0)
            throw new Error("Invalid parameter");
        days = parseInt(days);
        const daysDate = 24 * 60 * 60 * 1000 * days;
        const currDate = Date.now();
        const thresholdDate = new Date(currDate - daysDate);
        const data = await CVEModel.find({
            lastModified: { $gte: thresholdDate }
        });
        if (!data || data.length == 0)
            throw new Error(`No CVEs modified in last ${days} days`);
        const formattedData = data.map(({ _id, cveId, sourceIdentifier, published, lastModified, vulnStatus }) => {
            return { _id, cveId, sourceIdentifier, published, lastModified, vulnStatus };
        });
        res.status(200).json(formattedData);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
};