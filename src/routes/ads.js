const express = require("express");
const adsRoutes = express.Router();
const adsModel = require("../model/ads");

adsRoutes.get("/", async (req, res) => {
    const { query } = req.query;
    console.log("query:", query);
    let keywords = query.split(",");
    console.log("keywords:", keywords);

    try {
        let search = {
            $or: keywords.map((item) => ({
                $or: [
                    //$option: "i" --> "i" flag is used to specify a case-insensitive search.
                    //new RegExp --> operator is used to search for documents that match a specified string like includes.
                    { primaryText: new RegExp(item, "i") },
                    { headline: new RegExp(item, "i") },
                    { company: new RegExp(item, "i") },
                    { description: new RegExp(item, "i") },
                ],
            })),
        };
        // console.log("search:",keywords[0], search.$or[0] || "");
        // console.log("search:",keywords[1], search.$or[1] || "");
        // console.log("search:",keywords[2], search.$or[2] || "");


        //1. For single Search
        // let data = await adsModel.find({ company: { $regex: query, $options: "i" } });

        //2. With the help of find I Search all
        // let data = await adsModel.find(search)

        //3. with the help of aggration
        let data = await adsModel.aggregate([{ $match: search }]);

        res.status(200).send({ message: "Get Data Successfully!", data });
    } catch (e) {
        res.status(400).send({ message: "Error Occurs!", desc: e.message, data: [] });
    }
});

module.exports = adsRoutes;
