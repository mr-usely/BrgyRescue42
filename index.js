const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const log = require("./logs");
const path = require('path');
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")));
}

// ================== ADMIN ================== //

// validate admin users
app.get('/admin/:user/:pass/auth', async (req, res) => {
    try {
        const { user, pass } = req.params
        const adminLog = await pool.query("SELECT * FROM tblUser WHERE Username = $1 AND Password = $2", [
            user, pass
        ]);

        if(adminLog == null){
            res.json("error");
            log.adminLogFail();
        } else {
            res.json(adminLog.rows[0]);
            log.adminLogSuccess();
        }
        
    } catch (err) {
        console.error(err.message);
        log.adminLogFail();
    }
});

// ================== APP USERS ================== //

// validate login of app users
app.get('/user/:user/:pass/auth', async (req, res) => {
    try {
        const { user, pass } = req.params;

        const query = `
                SELECT
                    id,
                    firstname,
                    lastname,
                    age,
                    birthdate,
                    address,
                    persontocontact,
                    contactnumber,
                    organdonor,
                    allergy,
                    pathology,
                    medications,
                    username
                FROM tblappusers WHERE username = $1 AND password = $2
            `;
        
        const appLog = await pool.query(query, [user, pass]);

        appLog.rows[0].birthdate = appLog.rows[0].birthdate.toISOString().split("T")[0];
        if (appLog != null) {
            res.json(appLog.rows[0]);
            log.usersLogSuccess();
        } else {
            res.json("error");
            log.usersLogFail();
        }
    } catch (err) {
        console.error(err.message);
        log.usersLogFail();
    }
});


// add app users
app.post('/user/add', async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            birthdate,
            age,
            address,
            personToContact,
            relation,
            contactNumber,
            allergy,
            pathology,
            medications,
            organDonor,
            email,
            password,
            cpnumber
        } = req.body;

        const query = `
            INSERT INTO tblappusers VALUES ((SELECT MAX(id)+1 FROM tblappusers),
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 1, $15) RETURNING *
        `;

        const addUser = await pool.query(query,[
            firstName, lastName, age, birthdate, address, personToContact, contactNumber, organDonor, allergy, pathology, medications, email, password, relation, cpnumber
        ]);

        res.json([addUser.rows[0]]);
        log.addUserSuccess();
    } catch (err) {
        console.error(err.message);
        log.addUserFail();
    }
});


// get all app users
app.get('/user/all', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM tblappusers WHERE active = 1");
        
        res.json(allUsers.rows);
        log.getUsersSuccess();
    } catch (err) {
        console.error(err.message);
        log.getUsersFail();
    }
});


// update app user
app.put('/user/:id/update', async (req, res) => {
    try {
        const {id} = req.params;
        const {
            firstName,
            lastName,
            birthdate,
            age,
            address,
            personToContact,
            relation,
            contactNumber,
            allergy,
            pathology,
            medications,
            organDonor,
            email,
            password,
            cpnumber
        } = req.body;

        const query = `
            UPDATE tblappusers
            SET firstname = $1,
                lastname = $2,
                age = $3,
                birthdate = $4,
                address = $5,
                cpnumber = $6,
                persontocontact = $7,
                relation = $8,
                contactnumber = $9,
                organdonor = $10,
                allergy = $11,
                pathology = $12,
                medications = $13,
                username = $14,
                password = $15
            WHERE id = $16
        `;
        const update = await pool.query(query, [
            firstName,lastName,age,birthdate,address,cpnumber,personToContact,relation,contactNumber,organDonor,allergy,pathology,medications,email,password,id
        ]);

        if(update == null){
            res.json("User was updated");
            log.updateUserSuccess();
        }
        res.json("Not Updated")
        
    } catch (err) {
        console.error(err.message);
        log.updateUserFail();
    }
});


// delete app user by id
app.put('/user/:id/remove', async (req, res) => {
    try {
        const { id } = req.params;
        const del = await pool.query(
            "UPDATE tblappusers SET active = 0 WHERE id = $1",
            [id]
        );

        if (del == null) {
            res.json({result: 'deleted'});
            log.deleteUserSuccess();
        }
        log.deleteUserFail();
    } catch (err) {
        console.error(err.message);
        log.deleteUserFail();
    }
})

// total users
app.get('/user/totals', async (req, res) => {
    try {
        const query = "SELECT COUNT(*) as countu FROM tblappusers WHERE active = 1";
        const result = await pool.query(query);
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// ================== EMERGENCY REPORT ================== //

app.post('/report/:id/emergency', async (req, res) => {
    try {
        const { id } = req.params;
        const { location } = req.body;

        const query = `
            INSERT INTO tblemergencyreport (name, cpnumber, persontocontact, contactnoptc, location, datereported)
            SELECT
                firstname ||' '|| lastname as name,
                cpnumber as cpnumber,
                persontocontact ||' ('||relation||')' as persontocontact,
                contactnumber as contactnoptc,
                $1 as currlocation,
                CURRENT_TIMESTAMP as datereported
            FROM tblappusers WHERE id = $2
            RETURNING *
        `;

        const result = await pool.query(query,[location, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// update rescued status
app.put('/report/:id/rescued', async (req, res) => {
    try {
        const { id } = req.params;
        const query = "UPDATE tblemergencyreport SET rescued = 'YES' WHERE id = $1";
        const result = await pool.query(query, [id]);

        if(result == null) {
            res.json({ "response": "rescued"});
        }
    } catch (err) {
        console.error(err.message);
    }
})


// total rescued
app.get('/emergency/totals', async (req, res) => {
    try {
        const query = "SELECT COUNT(*) as counte FROM tblemergencyreport";
        const result = await pool.query(query);
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// ==================== BRGY ==================== //

// get all brgys
app.get('/get/brgys', async (req, res) => {
    try {
        const query = `
            SELECT brgy, contactnumber, COUNT(emergency) as NumberOfReport FROM consRescueBrgy as rescue
            LEFT JOIN tblemergencyreport as emergency ON emergency.location = rescue.brgy
            GROUP BY rescue.brgy, rescue.contactnumber
            ORDER BY NumberOfReport DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/totals/graph', async (req, res) => {
    try {
        const query = `
            SELECT months, totalReports, totalRescue, COUNT(totalNotRescued.*) AS totalNotRescue FROM (
                SELECT AA.months, AA.totalReports, COUNT(totalRescued.*) as totalRescue From (
                    SELECT date.Gendates as months, COUNT(emergency.*) as totalReports FROM (
                        SELECT TO_CHAR(GENERATE_SERIES((DATE '2020-01-01'),(DATE '2020-12-31'),interval '1 MONTH')::DATE, 'Month') as GenDates
                    ) AS date
                    LEFT JOIN tblemergencyreport as emergency ON TO_CHAR(emergency.datereported, 'Month') = date.GenDates
                    GROUP BY date.GenDates
                ) AS AA
                LEFT JOIN (SELECT * FROM tblemergencyreport WHERE rescued = 'yes') as totalRescued ON TO_CHAR(totalRescued.datereported, 'Month') = AA.months
                GROUP BY AA.months, AA.totalReports
            ) AS AB
            LEFT JOIN (SELECT * FROM tblemergencyreport WHERE rescued is null) as totalNotRescued ON TO_CHAR(totalNotRescued.datereported, 'Month') = AB.months
            GROUP BY months, totalReports, totalRescue
            ORDER BY TO_DATE(months, 'Month')
        `;
        const result = await pool.query(query);

        const series = [
            {name: 'Rescued', data: []},
            {name: 'Not Rescued', data: []},
            {name: 'Emergency Reports', data: []}
        ];

        for (let i = 0; i < result.rowCount; i++) {
            series[0].data.push(result.rows[i].totalrescue);
            series[1].data.push(result.rows[i].totalnotrescue);
            series[2].data.push(result.rows[i].totalreports);
        }

        res.json(series);
        log.loadGraphData();
    } catch (err) {
        console.error(err.message);
        log.loadGraphDataFail();
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});