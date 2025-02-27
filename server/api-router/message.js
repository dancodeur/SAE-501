import express from "express"; 
import mongoose from "mongoose";
import querystring from "querystring";

import Message from "#models/message.js";

const router = express.Router();
const base = "messages";

router.use(express.json());

router.post(`/${base}`, async (req, res) => { 
    try {
        // Vérification des données requises
        if (!req.body.lastName || !req.body.firstName || !req.body.email || !req.body.content || !req.body.identity) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
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

router.get(`/${base}`, async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    let perPage = Number(req.query.per_page) || 7;
    perPage = Math.min(Math.max(perPage, 1), 20);

    try {
        const listRessources = await Message.find({})
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const count = await Message.countDocuments();

        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
            query_params: querystring.stringify(req.query),
        });
    } catch (e) {
        res.status(400).json({
            errors: [
                e?.message || "Il y a eu un problème",
            ],
        });
    }
});

export default router;
