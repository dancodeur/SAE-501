import express from "express"; 
import mongoose from "mongoose";
import querystring from "querystring";

import Message from "#models/message.js";
import routeName from "#server/utils/name-route.middleware.js";


const router = express.Router();
const base = "messages";

router.use(express.json());

router.post(`/${base}`, routeName("message_api"), async (req, res) => { 
    try {
        // Vérification des données requises
        const missingFields = [];

        if (!req.body.lastName) missingFields.push("lastName");
        if (!req.body.firstName) missingFields.push("firstName");
        if (!req.body.email) missingFields.push("email");
        if (!req.body.content) missingFields.push("content");
        if (!req.body.identity) missingFields.push("identity");

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: `Les champs suivants sont obligatoires : ${missingFields.join(", ")}`,
            });
        }

        const ressource = new Message(req.body);
        await ressource.save();
        
        res.status(201).json(ressource);
    } catch (error) {
        res.status(400).json({
            errors: Object.values(error?.errors || {}).map((item) => item.message),
        });
    } 
});

router.get(`/${base}`, routeName("message_api"), async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    let perPage = Number(req.query.per_page) || 7;
    // Clamps the value between 1 and 20
    perPage = Math.min(Math.max(perPage, 1), 20);

    let listIds = req.query?.id;
    if (req.query.id && !Array.isArray(req.query.id)) {
        listIds = [listIds];
    }

    listIds = (listIds || [])
        .filter(mongoose.Types.ObjectId.isValid)
        .map(item => mongoose.Types.ObjectId.createFromHexString(item));

    try {
        const listMessages = await Message.aggregate([
            ...(listIds.length ? [{ $match: { _id: { $in: listIds } } }] : []),
            { $sort: { _id: -1 } },
            { $skip: Math.max(page - 1, 0) * perPage },
            { $limit: perPage },
        ]);

        const count = await Message.countDocuments(
            listIds.length ? { _id: { $in: listIds } } : null
        );

        const queryParam = { ...req.query };
        delete queryParam.page;

        res.status(200).json({
            data: listMessages,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
            query_params: querystring.stringify(queryParam),
        });
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(
                    e?.errors || [{ message: e?.message || "Il y a eu un problème" }]
                ).map(val => val.message),
            ],
        });
    }
});
export default router;
