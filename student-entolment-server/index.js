const storage=require('node-persist');
const {v4:uuidv4}=require('uuid');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

(async()=>{

    await storage.init({dir:'./data'});

    // use server express

    const server=express();

    // server to use cors
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());

    server.get('/courses',async(request,response)=>{
        let courses=await storage.valuesWithKeyMatch(/course-/);
       
       
        response.json(courses)
    });

    server.post('/enrolments',async(request,response)=>{

        letcourseId=request.body.courseId;
        let courses=await storage.valuesWithKeyMatch(/course-/);
        let selectedCourse=null;
        for(c of courses){
            if(c.Id==courseId){
                selectedCourse=c;
            }
        }
        if(selectedCourse==null){
            response.json({status:400,message:"Invalid course Id provided"})
        }
        let forename=request.body.forename;
        letsurname=request.body.surname;

        let now=new Date();
        let nowAsString=now.toISOString();
        let nowAsStringInParts=nowAsString.split('T');
        
        let enrolment={
            id:uuidv4(),
            forename,
            surname,
            courseId,
            dateOfEnrolment:new Date().toISOString().slice(0,10)
        };

        await storage.setItem(`enrolment-${enrolment.id}`,enrolment);

        response.json(enrolment)   
    })  

    server.listen(4000,()=>{
        console.log("http://localhost:4000 is up and running,..yay");
    })
})()
