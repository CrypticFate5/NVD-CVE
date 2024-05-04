import CVEModel from "../models/CVEModel.js";

export const getCvesList = async (req, res) => {
    try {
        const datas = await CVEModel.find();
        const formattedData = datas.map(({ _id, cveId, sourceIdentifier, published, lastModified, vulnStatus }) => {
            return { _id, cveId, sourceIdentifier, published, lastModified, vulnStatus };
        });
        console.log(datas);
        res.status(200).json(formattedData);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const getCveDetails = async (req, res) => {
    try {
        const { cveId } = req.params;
        const data = await CVEModel.find({ cveId: cveId });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
    }
}