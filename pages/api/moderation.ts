import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await axios({
        method: 'post',
		url: 'https://api.openai.com/v1/moderations',
		headers: { 
				'Authorization': `Bearer ${process.env.NEXT_OPENAI_API_KEY}`, 
				'Content-Type': 'application/json'
		},
        data: req.body
    }).then(response => {
        console.log(JSON.stringify(response.data))
        res.send(response.data.results[0].flagged)
    })
}