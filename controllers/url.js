const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  console.log(body)
  if (!body.fullUrl) return res.status(400).json({ error: "url is required" });
 const shortID =  shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.fullUrl,
    visitHistory: [],
  });
  res.redirect('/')
}

async function redirectandanalytics(req, res) {
  const shortId = req.params.shortId;
  // const result = await URL.findOne({ shortId });
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);

 
}
module.exports = {
  handleGenerateNewShortURL,
  redirectandanalytics
};



