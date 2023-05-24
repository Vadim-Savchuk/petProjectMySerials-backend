import Serial from '../models/Serial.js';
import User from '../models/User.js';

// Add serial
export const addSerial = async (req, res) => {
    try {
        const { name, season, series, attach } = req.body;

        const newSerial = new Serial({
            name,
            season,
            series,
            attach,
        })

        await newSerial.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { serials: newSerial },
        })

        return res.json(newSerial);
    } catch (error) {
        res.json({
            message: 'Сталась помилка при додавані нового серіалу'
        })
    }
}

// Get all serials by id
export const getById = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const serials = await Promise.all(
            user.serials.map(serial => {
                return Serial.findById(serial._id)
            })
        )

        res.json(serials)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані всіх серіалів'
        })
    }
}

// Remove serial by id
export const removeSerial = async (req, res) => {
    try {
        const serial = await Serial.findByIdAndDelete(req.params.id);

        if (!serial) {
            res.json({
                message: 'Такого серіалу не існує'
            })
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { serials: req.params.id }
        })

        res.json({
            message: 'Серіал був видалений'
        })
    } catch (error) {
        res.json({
            message: 'Сталась помилка при видалені серіалу'
        })
    }
}

// Update serial
export const updateSerial = async (req, res) => {
    try {
        const { name, season, series, attach, id } = req.body;
        const serial = await Serial.findById(id);

        serial.name = name
        serial.season = season
        serial.series = series
        serial.attach = attach

        await serial.save()

        res.json(serial)
    } catch (error) {
        res.json({
            message: 'Сталась помилка при редагувані серіалу'
        })
    }
}