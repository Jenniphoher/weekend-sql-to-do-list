const router = require('express').Router();
const pool = require('../modules/pool');

// ~~~~~~~~~~~~~~~~~~~~~~~ NOTE: console.logs in TERMINAL!!!!!!!!!



// ================== GET ================== 

router.get('/', (req, res) => {
    
    const sqlText = `SELECT * FROM "todos"
                    ORDER BY "id";`;

    pool.query(sqlText)
    .then((result) => {
        console.log('This is the data being sent back:', result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
    
})

// ================== POST ================== 

router.post('/', (req, res) => {

    const data = req.body;

    const sqlText = `INSERT INTO "todos"
                    ("text", "isComplete")
                    VALUES
                    ($1, $2);`;

    const sqlValue = [
        data.text,
        data.isComplete
    ]

    pool.query(sqlText, sqlValue)
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })

})

// ================== POST ==================

router.delete('/:id', (req, res) => {

    const todoId = req.params.id;
    console.log('The id that will be deleted:', todoId);

    const sqlText = `DELETE FROM "todos"
                    WHERE "id" = $1;`;
    
    const sqlValue = [todoId];

    pool.query(sqlText, sqlValue)
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    })

})

// ================== PUT ==================

router.put('/:id', (req, res) => {

    const todoId = req.params.id;
    console.log('The id that updates is:', todoId);

    const sqlText = `UPDATE "todos"
                    SET "isComplete" = TRUE
                    WHERE "id" = $1;`;
    
    const sqlValue = [todoId];

    pool.query(sqlText, sqlValue)
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    })

})






module.exports = router;
