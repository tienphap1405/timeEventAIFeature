const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GET all clients
const getClients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM CLIENT ORDER BY client_id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create a client
// Porsgress always return the array of row which is the data retrieved after the query
const createClient = async (req, res) =>{
    const {client_name, time_events} = req.body;
    try{
        const result = await pool.query(
            "INSERT INTO CLIENT(client_name, time_events) VALUES($1, $2) RETURNING client_id, client_name, time_events",
            [client_name, time_events || null]
        );
        res.status(200).json(result.rows[0]);
    }
    catch (error){
        console.error(error, "error when creating new client");
        res.status(400).json({error: "Internal error persisted"});
    }
};


module.exports = { getClients, createClient };
