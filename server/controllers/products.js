import axios from 'axios';

export const fetchAll = async (req, res) => {
    try {
        const { data } = await axios.get(`https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=14`, {
            headers: {
                'x-rapidapi-host': process.env.RAPID_API_HOST,
                'x-rapidapi-key': process.env.RAPID_API_KEY
            }
        });

        res.status(200).json(data.products);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { data } = await axios.get(`https://asos2.p.rapidapi.com/products/v3/detail?id=${id}`, {
            headers: {
                'x-rapidapi-host': process.env.RAPID_API_HOST,
                'x-rapidapi-key': process.env.RAPID_API_KEY
            }
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}