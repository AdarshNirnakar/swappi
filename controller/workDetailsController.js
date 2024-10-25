const requestModel = require('../module/Request');

const requestController = async (req, res) => {
    try {
        const { offers, description } = req.body; // Corrected to 'description'
        if (!offers) {
            return res.status(400).send({ message: "Offers cannot be kept empty" });
        }
        if (!description) { // Check for description
            return res.status(400).send({ message: "Description is required" }); // Corrected message
        }

        // Assuming user details are available in req.user
        const user = req.user; // Extract user details from the request

        // Save the request and offers to the database
        const newRequest = await requestModel.create({ offers, description }); // Include description
        res.status(201).send({
            message: "Request created successfully",
            newRequest,
            // user: { name: user.name, email: user.email } // Include user details in the response
        });

    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: "Validation Error", error });
        }
        res.status(500).send({ message: "Internal Server Error", error });
    }
}

module.exports = { requestController };