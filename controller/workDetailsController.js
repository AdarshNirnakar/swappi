const requestModel = require('../module/Request'); 
const requestController = async (req, res) => {
    try {
        const { title, type, reward, description } = req.body; 

        if (!title || !description) {
            return res.status(400).send({ message: "Title and description are required" });
        }

        const user = req.user; 

        const newRequest = await requestModel.create({ title, type, reward, description }); 
        res.status(201).send({
            message: "Request created successfully",
            newRequest,
            
        });

    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: "Validation Error", error });
        }
        res.status(500).send({ message: "Internal Server Error", error });
    }
}

const getAllRequestsController = async (req, res) => {
    try {
        const requests = await requestModel.find(); 
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error }); 
    }
}

module.exports = { requestController, getAllRequestsController };