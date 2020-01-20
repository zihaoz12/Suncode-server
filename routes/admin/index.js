module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    const House = require('../../models/House')

    router.post('/', async(req,res)=>{
        const model = await req.Model.create(req.body)
        console.log(model);
        res.send(model)
    })

    router.get('/',async(req,res)=>{
        const items = await req.Model.find().limit(10);
        res.send(items)
    })

    router.get('/:id', async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/:id', async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    });
    
    app.use('/admin/api/rest/:resource',async (req, res, next)=>{
        const modelName = require('inflection').classify(req.params.resource)
         req.Model = require(`../../models/${modelName}`)
        next()
    }, router);
    
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '../../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:5000/uploads/${file.filename}`
        res.send(file)
    })

    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
            req.Model = require(`../../models/${modelName}`)
        next()
    },router);

    //Login
    app.post('/admin/api/login', async (req,res)=>{
        const {username, password} = req.body
        //1 find admin by username
        const AdminUser = require('../../models/Admin')
        const user = await AdminUser.findOne({ username }).select('+password') // in model select:false
        if(!user){
            return res.status(422).send({
                message: 'This Admin does not existed'
            })
        }
        //2 check password 
        const isValid = require('bcrypt').compareSync(password, user.password)
        if(!isValid){
            return res.status(422).send({
                message: 'Password Incorrect!'
            })
        }
        //3.return token, user
        //npm i jsonwebtoken
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        
        res.send({token,user})
    })

}