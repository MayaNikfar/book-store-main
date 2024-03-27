// controllers/api/search.js

const Item = require('../../models/item');

module.exports = {
    index
}

async function index(req, res) {
    try {
        const query = req.query.query;

        if (query) {
            const searchResults = await Item.find({ name: { $regex: new RegExp(query, 'i') } });

            if (searchResults.length > 0) {
                return res.json({ name: 'Search Result', items: searchResults });
            } else {
                return res.json({ name: 'No Search Result! Please Try Again', items: [] });
            }
        }

        const items = await Item.find({});
        res.json({ name: 'Items', items });

    } catch (err) {
        console.error('Error searching items:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
}
