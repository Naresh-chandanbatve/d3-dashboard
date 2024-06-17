import DataModel from '../models/dataModel.js'

export const getData = async (req, res)=>{
    try{

        const data = await DataModel.find({});
        res.json(data);
    }
    catch(err){
        res.status(500).send(err);
    }
}


