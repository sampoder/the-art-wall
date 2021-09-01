const AirtablePlus = require('airtable-plus');
 
const airtable = new AirtablePlus({
    baseID: 'appvZKyPbkTTyCcO3',
    apiKey: process.env.AIRTABLE,
    tableName: 'The Art',
});

export default async function handler(req, res){
  const record = await airtable.create({ 'Image Data URL': req.body.imageDataUrl });
  return res.json(record)
}