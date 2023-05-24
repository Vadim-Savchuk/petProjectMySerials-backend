import mongoose from 'mongoose';

const SerialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        season: {
            type: String,
            required: true
        },
        series: {
            type: String,
            required: true
        },
        attach: {
            type: Boolean,
            required: true
        },
        
    }, { timestamps: true }
)

export default mongoose.model('Serial', SerialSchema);