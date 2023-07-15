const ccController = require('express').Router();
const axios = require('axios');


//* Route handler for retrieving available currencies
ccController.get('/currencies', async (req, res) => {
    try {
        const baseCurrency = 'EUR';

        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/5e10f1d357225ff368969b47/latest/${baseCurrency}`
        );

        const { result, conversion_rates } = response.data;

        if (result === 'success') {
            const currencies = Object.keys(conversion_rates);
            res.json(currencies);
        } else {
            throw new Error('Failed to retrieve available currencies');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Router handler for conversion
ccController.get('/convert', async (req, res) => {
    try {
        const baseCurrency = 'EUR';

        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/5e10f1d357225ff368969b47/latest/${baseCurrency}`
        );

        const { result, conversion_rates } = response.data;

        if (result === 'success') {
            res.json(conversion_rates);
        } else {
            throw new Error('Failed to retrieve conversion rates');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = ccController;