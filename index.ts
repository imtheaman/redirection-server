import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 2000;

app.get("*", async (req, res) => {
	// check the platform using user-agent
	const url = `https://whatsmyua.info/api/v1/ua?ua=${req.headers["user-agent"]}`
	const response = await axios.get(url)
	const data = response.data;
	const platform = data[0].os.family?.toLowerCase();
	if (platform === 'android') res.status(301).redirect('https://play.google.com/store/apps/details?id=black.touch.app')
	else if (platform === 'ios') res.status(301).redirect('https://apps.apple.com/in/app/touch-black/id6504214097')
	else res.status(200).json(data);
})

app.listen(port, () => console.log("Server started at port: " + port));
