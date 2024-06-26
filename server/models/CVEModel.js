import mongoose from "mongoose";

const cveSchema = new mongoose.Schema({
    cveId: {
        type: String,
        unique: true,
    },
    sourceIdentifier: String,
    published: Date,
    lastModified: Date,
    vulnStatus: String,
    descriptions: String,

    cvssMetricV20: [{ type: mongoose.Schema.Types.Mixed }],
    cvssMetricV30: [{ type: mongoose.Schema.Types.Mixed }],
    cvssMetricV31: [{ type: mongoose.Schema.Types.Mixed }],

    cpeMatch: [{
        vulnerable: Boolean,
        criteria: String,
        matchCriteriaId: String
    }],
    weaknesses: [{
        type: mongoose.Schema.Types.Mixed,
    }],
    references: [{
        url: String,
        source: String,
    }]
});

const CVEModel = mongoose.model("CVE", cveSchema);
export default CVEModel;