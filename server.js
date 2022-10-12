import mongodb from 'mongodb';
let MongoClient = mongodb.MongoClient;
import express from 'express';
const uri = "mongodb+srv://admin:result2022@results2022oct.ygamb21.mongodb.net/test";
//const uri = "mongodb+srv://gowthami123:gowthami@cluster0.7vwrl4g.mongodb.net/?retryWrites=true&w=majority";
import xlsxFile from 'read-excel-file/node';
import cors from 'cors'
import upload from './middlewares/fileUpload.js'
import fs from 'fs'

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
        'Register_Number': {
            prop: 'Register_Number',
            type: String
        },
        'Cluster': {
            prop: 'Cluster',
            type: String
        },
        'NAMES': {
            prop: 'NAMES',
            type: String
        },
        'SCHOOL_NAME': {
            prop: 'SCHOOL_NAME',
            type: String
        },
        'ATTENDANCE _FROM_21APR_TO_5TH_APR': {
            prop: 'ATTENDANCE _FROM_21APR_TO_5TH_APR',
            type: String
        },
        'DEMONSTRATING_UNDERSTANDING_OF_THE_HAUNA_VISION_AND_MISSION_5_SCORE': {
            prop: 'DEMONSTRATING_UNDERSTANDING_OF_THE_HAUNA_VISION_AND_MISSION_5_SCORE',
            type: String
        },
        'DEMONSTRATING_KNOWLEDGE_OF_CHILD_AND_CHILD_DEVELOPMENT_10_Score': {
            prop: 'THIRD_LANG_URDU',
            type: String
        },
        'DEMONSTRATING_KNOWLEDGE_OF_CHILD_DEVELOPMENTAL_DOMAINS_25_Score': {
            prop: 'DEMONSTRATING_KNOWLEDGE_OF_CHILD_DEVELOPMENTAL_DOMAINS_25_Score',
            type: String
        },
        'DEMONSTRATING_KNOWLEDGE_OF_PEDAGOGICAL_PRACTICES_HAUNA_15_Score': {
            prop: 'DEMONSTRATING_KNOWLEDGE_OF_PEDAGOGICAL_PRACTICES_HAUNA_15_Score',
            type: String
        },
        'DEMONSTRATING_KNOWLEDGE_OF_STUDENT_ASSESSMENTS_10_Score': {
            prop: 'DEMONSTRATING_KNOWLEDGE_OF_STUDENT_ASSESSMENTS_10_Score',
            type: String
        },
        'ATTENDANCE_Percentage': {
            prop: 'ATTENDANCE_Percentage',
            type: String
        },
        'Total_Presentation_Marks_20': {
            prop: 'Total_Presentation_Marks_20',
            type: String
        },
        'Total_5_modules_score_Attendance_marks_Presentation_95_Marks': {
            prop: 'Total_5_modules_score_Attendance_marks_Presentation_95_Marks',
            type: String
        },
        'Total_Percentage': {
            prop: 'Total_Percentage',
            type: String
        }
    };
    xlsxFile('./result.xlsx', { schema }).then(async (rows) => {
        db.collection('haunaresult').drop()
        result = await db.collection('haunaresult').insertMany([...rows.rows])
    })
    res.send({
        'status': 200,
        'message': 'Result addded successfully',
        'resultWeGot': result
    })
});

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
    const result = await db.collection('haunaresult').find({ 'Register_Number': req.query.reg_no }).toArray();
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
                'message': 'Student with duplicated register no exists'
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

// CALL A SERVER AND LISTEN
app.listen(PORT, function (err) {
    if (err) console.error(err)
    console.log("Server is running in port", PORT)
});

// Dark Green : 0,45,43
// linear-gradient(90deg, #00968f, #00fff4)

// f8485e
