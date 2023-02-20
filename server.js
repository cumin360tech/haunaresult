import mongodb from 'mongodb';
let MongoClient = mongodb.MongoClient;
import express from 'express';
const uri = "mongodb+srv://admin:result2022@results2022oct.ygamb21.mongodb.net/test";
//const uri = "mongodb+srv://gowthami123:gowthami@cluster0.7vwrl4g.mongodb.net/?retryWrites=true&w=majority";
import xlsxFile from 'read-excel-file/node';
import cors from 'cors'
import upload from './middlewares/fileUpload.js'

const client = new MongoClient(uri, {});

const app = express();
app.use(cors())
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded());

client.connect(err => {
    if (err) {
        console.log(err)
    }
    console.log("CONNECTED TO DB")
})

const db = client.db('test');
client.close();

app.post('/publishResult', upload, async (req, res) => {
    let result;
    const schema = {
        'Register_No': {
            prop: 'Register_No',
            type: String
        },
        'Cluster': {
            prop: 'Cluster',
            type: String
        },
        'Name': {
            prop: 'Name',
            type: String
        },
        'School': {
            prop: 'School',
            type: String
        },
        'Demonstrating_understanding_of_the_Hauna_vision_and_mission': {
            prop: 'Demonstrating_understanding_of_the_Hauna_vision_and_mission',
            type: String
        },
        'Demonstrating_knowledge_of_child_and_child_development': {
            prop: 'Demonstrating_knowledge_of_child_and_child_development',
            type: String
        },
        'Demonstrating_knowledge_of_child_developmental_domains': {
            prop: 'Demonstrating_knowledge_of_child_developmental_domains',
            type: String
        },
        'Demonstrating_knowledge_of_pedagogical_practices_at_Hauna': {
            prop: 'Demonstrating_knowledge_of_pedagogical_practices_at_Hauna',
            type: String
        },
        'Demonstrating_knowledge_of_student_assessments': {
            prop: 'Demonstrating_knowledge_of_student_assessments',
            type: String
        },
        'Demonstrating_Understanding_of_Principles_of_Hauna_Pedagogy': {
            prop: 'Demonstrating_Understanding_of_Principles_of_Hauna_Pedagogy',
            type: String
        },
        'Pedagogy_Demonstration_Class': {
            prop: 'Pedagogy_Demonstration_Class',
            type: String
        },
        'Group_Presentation': {
            prop: 'Group_Presentation',
            type: String
        },
        'Attendance': {
            prop: 'Attendance',
            type: String
        },
        'Total': {
            prop: 'Total',
            type: String
        },
        'Total_Percentage': {
            prop: 'Total_Percentage',
            type: String
        },
    };
    xlsxFile('./result.xlsx', { schema }).then(async (rows) => {
        console.log(rows);
        try {
            await db.collection('haunaresult').drop()
            result = await db.collection('haunaresult').insertMany([...rows.rows])
            res.send({
                'status': 200,
                'message': 'Result addded successfully',
                'resultWeGot': result
            })
        } catch (error) {
            console.log('Error', error);
        }
    })

});

app.post('/appendResult', upload, async (req, res) => {
    let result;
    const schema = {
        'Register_No': {
            prop: 'Register_No',
            type: String
        },
        'Cluster': {
            prop: 'Cluster',
            type: String
        },
        'Name': {
            prop: 'Name',
            type: String
        },
        'School': {
            prop: 'School',
            type: String
        },
        'Demonstrating_understanding_of_the_Hauna_vision_and_mission': {
            prop: 'Demonstrating_understanding_of_the_Hauna_vision_and_mission',
            type: String
        },
        'Demonstrating_knowledge_of_child_and_child_development': {
            prop: 'Demonstrating_knowledge_of_child_and_child_development',
            type: String
        },
        'Demonstrating_knowledge_of_child_developmental_domains': {
            prop: 'Demonstrating_knowledge_of_child_developmental_domains',
            type: String
        },
        'Demonstrating_knowledge_of_pedagogical_practices_at_Hauna': {
            prop: 'Demonstrating_knowledge_of_pedagogical_practices_at_Hauna',
            type: String
        },
        'Demonstrating_knowledge_of_student_assessments': {
            prop: 'Demonstrating_knowledge_of_student_assessments',
            type: String
        },
        'Demonstrating_Understanding_of_Principles_of_Hauna_Pedagogy': {
            prop: 'Demonstrating_Understanding_of_Principles_of_Hauna_Pedagogy',
            type: String
        },
        'Pedagogy_Demonstration_Class': {
            prop: 'Pedagogy_Demonstration_Class',
            type: String
        },
        'Group_Presentation': {
            prop: 'Group_Presentation',
            type: String
        },
        'Attendance': {
            prop: 'Attendance',
            type: String
        },
        'Total': {
            prop: 'Total',
            type: String
        },
        'Total_Percentage': {
            prop: 'Total_Percentage',
            type: String
        },
    };
    xlsxFile('./result.xlsx', { schema }).then(async (rows) => {
        try {
            result = await db.collection('haunaresult').insertMany([...rows.rows])
            res.send({
                'status': 200,
                'message': 'Result appended successfully',
                'resultWeGot': result
            })
        } catch (error) {
            console.log('Error', error);
        }
    })
})

app.post('/publishResult2', upload, async (req, res) => {
    let result;
    const schema = {
        'Register_Number': {
            prop: 'Register_Number',
            type: String
        },
        'Cluster': {
            prop: 'Cluster',
            type: String
        },
        'Name': {
            prop: 'Name',
            type: String
        },
        'School': {
            prop: 'School',
            type: String
        },
        'Demonstrating_Understanding_of_Hauna_Vision_and_Mission': {
            prop: 'Demonstrating_Understanding_of_Hauna_Vision_and_Mission',
            type: String
        },
        'Demonstrating_Knowledge_of_Child_and_Child_Development': {
            prop: 'Demonstrating_Knowledge_of_Child_and_Child_Development',
            type: String
        },
        'Demonstrating_Knowledge_of_Child_Developmental_Domains': {
            prop: 'Demonstrating_Knowledge_of_Child_Developmental_Domains',
            type: String
        },
        'Demonstrating_Knowledge_of_Pedagogical_Practices_at_Hauna': {
            prop: 'Demonstrating_Knowledge_of_Pedagogical_Practices_at_Hauna',
            type: String
        },
        'Demonstrating_Knowledge_of_Student_Assessments': {
            prop: 'Demonstrating_Knowledge_of_Student_Assessments',
            type: String
        },
        'Demonstrating_understanding_of_principles_of_Hauna_Pedagogy': {
            prop: 'Demonstrating_understanding_of_principles_of_Hauna_Pedagogy',
            type: String
        },
        'Pedagogy_Demonstration_Class': {
            prop: 'Pedagogy_Demonstration_Class',
            type: String
        },
        'Group_Presentation': {
            prop: 'Group_Presentation',
            type: String
        },
        'Attendance': {
            prop: 'Attendance',
            type: String
        },
        'Total': {
            prop: 'Total',
            type: String
        },
        'Percentage': {
            prop: 'Percentage',
            type: String
        },
    };
    xlsxFile('./result.xlsx', { schema }).then(async (rows) => {
        console.log(rows);
        try {
            await db.collection('haunaresult2').drop()
            result = await db.collection('haunaresult2').insertMany([...rows.rows])
            res.send({
                'status': 200,
                'message': 'Result addded successfully',
                'resultWeGot': result
            })
        } catch (error) {
            console.log('Error', error);
        }
    })

});

app.post('/appendResult2', upload, async (req, res) => {
    let result;
    const schema = {
        'Register_Number': {
            prop: 'Register_Number',
            type: String
        },
        'Cluster': {
            prop: 'Cluster',
            type: String
        },
        'Name': {
            prop: 'Name',
            type: String
        },
        'School': {
            prop: 'School',
            type: String
        },
        'Demonstrating_Understanding_of_Hauna_Vision_and_Mission': {
            prop: 'Demonstrating_Understanding_of_Hauna_Vision_and_Mission',
            type: String
        },
        'Demonstrating_Knowledge_of_Child_and_Child_Development': {
            prop: 'Demonstrating_Knowledge_of_Child_and_Child_Development',
            type: String
        },
        'Demonstrating_Knowledge_of_Child_Developmental_Domains': {
            prop: 'Demonstrating_Knowledge_of_Child_Developmental_Domains',
            type: String
        },
        'Demonstrating_Knowledge_of_Pedagogical_Practices_at_Hauna': {
            prop: 'Demonstrating_Knowledge_of_Pedagogical_Practices_at_Hauna',
            type: String
        },
        'Demonstrating_Knowledge_of_Student_Assessments': {
            prop: 'Demonstrating_Knowledge_of_Student_Assessments',
            type: String
        },
        'Demonstrating_understanding_of_principles_of_Hauna_Pedagogy': {
            prop: 'Demonstrating_understanding_of_principles_of_Hauna_Pedagogy',
            type: String
        },
        'Pedagogy_Demonstration_Class': {
            prop: 'Pedagogy_Demonstration_Class',
            type: String
        },
        'Group_Presentation': {
            prop: 'Group_Presentation',
            type: String
        },
        'Attendance': {
            prop: 'Attendance',
            type: String
        },
        'Total': {
            prop: 'Total',
            type: String
        },
        'Percentage': {
            prop: 'Percentage',
            type: String
        },
    };
    xlsxFile('./result.xlsx', { schema }).then(async (rows) => {
        try {
            result = await db.collection('haunaresult2').insertMany([...rows.rows])
            res.send({
                'status': 200,
                'message': 'Result appended successfully',
                'resultWeGot': result
            })
        } catch (error) {
            console.log('Error', error);
        }
    })
})

app.delete('/result', async (req, res) => {
    const resultCollection = db.collection('haunaresult');
    const result = await resultCollection.deleteMany({})
    if (result.acknowledged) {
        res.send({
            'status': 200,
            'message': 'All RESULT item deleted successfully',
            'result': result
        });
    } else {
        res.send({
            'status': 500,
            'message': 'MULTIPLE DELETE OPERATION FAILED',
            'result': result
        });
    }

});

app.get('/result', async (req, res) => {
    const result = await db.collection('haunaresult').find({ 'Register_No': req.query.reg_no }).toArray();
    console.log(result)

    try {
        if (result.length == 1) {
            res.send({
                'status': 200,
                'data': result[0]
            })
        }
        if (result.length > 1) {
            res.send({
                'status': 500,
                'data': [],
                'message': 'User with duplicated register no exists'
            })
        }
        if (result.length == 0) {
            res.send({
                'status': 404,
                'data': [],
                'message': 'No result found'
            })
        }
    } catch (e) {
        res.send({
            'status': 500,
            'data': 'failed'
        })
    }

});

app.get('/result2', async (req, res) => {
    const result = await db.collection('haunaresult2').find({ 'Register_Number': req.query.reg_no }).toArray();
    console.log(result.length)

    try {
        if (result.length == 1) {
            res.send({
                'status': 200,
                'data': result[0]
            })
        }
        if (result.length > 1) {
            res.send({
                'status': 500,
                'data': [],
                'message': 'User with duplicated register no exists'
            })
        }
        if (result.length == 0) {
            res.send({
                'status': 404,
                'data': [],
                'message': 'No result found'
            })
        }
    } catch (e) {
        res.send({
            'status': 500,
            'data': 'failed'
        })
    }

});

app.get('/results', async (req, res) => {
    const results = await db.collection('haunaresult').find({});
    console.log(results);
});

// CALL A SERVER AND LISTEN
app.listen(PORT, function (err) {
    if (err) console.error(err)
    console.log("Server is running in port", PORT)
});
