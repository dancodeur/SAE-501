import express from "express";
// import mongoose from "mongoose";
import axios from "axios";
import querystring from "querystring";
import routeName from "#server/utils/name-route.middleware.js";

// import upload from "#server/uploader.js";

const base = "messages";
const router = express.Router();

// Get message
router.get(`/${base}`, routeName("message_list"), async (req, res) => {
    const queryParams = querystring.stringify(req.query);

    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    };
    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/back-end/messages/list.njk", {
        list_message: result.data,
    });
});



export default router;
