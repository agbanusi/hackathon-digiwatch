const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const secret2 = process.env.SECRETS

function verify(req, res, next){
    jwt.verify(req.body.token, secret, function(err, decoded) {
        if (err) return res.status(400).send({ message: 'Failed to authenticate token.' });
        
        req.user = decoded
        next()
    });
}

function verifyAdmin(req, res, next){
    jwt.verify(req.body.token, secret2, function(err, decoded) {
        if (err) return res.status(400).send({ message: 'Failed to authenticate token.' });
        
        if(decoded.isDoctor){
            req.isDoctor = true
            next()
        }else{
            return res.status(400).send({ message: 'Failed to authenticate token.' });
        }
    });
}

module.exports = function(ap,dbe, id){
    let db = dbe.collection('patient')
    let doctor = dbe.collection('doctor')

    app.post('/register',async(req,res)=>{
        let data = req.body    //condition, assignedDoctor,prescriptions, Number,hospitalContact
        let decoded = await jwt.verify(data.token,secret2)
        let {firstName, lastName, phoneNumber,  email, country,emergencyContact, password}  = data
        let {firstName, lastName, hospital, doctorId, email, country,emergencyContact,
            condition, assignedDoctors,prescriptions,hospitalContact } = decoded

        if(firstName && email && password){ 
            bcrypt.hash(password, 13, (err, hash)=>{
                db.insertOne({firstName, lastName, email, country, password:hash, emergencyContact,
                     phoneNumber,hospital, doctorId, condition, prescriptions, hospitalContact,
                     assignedDoctors, createdAt: new Date(),updatedAt: new Date() }, 
                (user)=>{
                    var token = jwt.sign({email, password: hash,phoneNumber}, secret, {
                        expiresIn: 86400* 2 // expires in 24 hours
                    });
                    assignedDoctors.map(i=>{
                        doctor.findOneAndUpdate({doctorId: i}, {$push:{patients: user.op._id}})
                    })
                    res.json({"message":"registration successful", token})
                })
            })
        }else{
            res.status(400).send({ message: 'Email or Password Incorrect' })
        }
    })

    app.post('/registerdoctor',async(req,res)=>{
        let data = req.body    //condition, assignedDoctor,prescriptions, Number,hospitalContact
        let {firstName, lastName, phoneNumber,hospital, doctorId, email, country,emergencyContact, password}  = data

        if(firstName && email && password){ 
            bcrypt.hash(password, 13, (err, hash)=>{
                doctor.insertOne({firstName, lastName, email, country, password:hash, emergencyContact,patients:[],
                     phoneNumber,createdAt: new Date(),updatedAt: new Date() }, 
                (user)=>{
                    var token = jwt.sign({email, password: hash,phoneNumber, hospital, doctorId}, secret2, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.json({"message":"registration successful", token})
                })
            })
        }else{
            res.status(400).send({ message: 'Email or Password Incorrect' })
        }
    })

    app.post('/registerpatient', verifyAdmin, async(req,res)=>{
        let data = req.body    //condition, assignedDoctor,prescriptions, Number,hospitalContact
        let {firstName, lastName, hospital, doctorId, email, country,emergencyContact,condition, assignedDoctors,prescriptions,hospitalContact }  = data

        if(firstName && email){ 
                
            var token = jwt.sign({firstName, lastName, hospital, doctorId, email, country,emergencyContact,condition, assignedDoctors,prescriptions,hospitalContact }, secret2, {
                expiresIn: 86400/2 // expires in 24 hours
            });
            res.json({token})
        }else{
            res.status(400).send({ message: 'Email or Password Incorrect' })
        }
    })

    app.post('/login', async(req,res)=>{
        let {email, password} = req.body
        if(email && password){
            db.findOne({email}, (err,doc)=>{
                if(doc){
                    let re = bcrypt.compareSync(password, doc.password)
                    if(re){
                        var token = jwt.sign({email, password: doc.password,phoneNumber:doc.phoneNumber}, secret, {
                            expiresIn: 86400* 2 // expires in 24 hours
                        });
                        
                        res.json({"message":"login successful", token})
                    }
                }
            })

        }
    })

    // get data from watch
    app.put('/api/watch', (req,res)=>{
        let data = req.body
        id(data)
    })

}