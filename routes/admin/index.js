module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const House = require('../../models/House')

    router.post('/houses', async(req,res)=>{
        const model = await House.create(req.body)
        console.log(model);
        res.send(model)
    })

    router.get('/houses',async(req,res)=>{
        const items = await House.find().limit(10);
        res.send(items)
    })

    router.get('/houses/:id', async(req,res)=>{
        const model = await House.findById(req.params.id)
        res.send(model)
    })
    router.put('/houses/:id', async(req,res)=>{
        const model = await House.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });
    router.delete('/houses/:id',async(req,res)=>{
        await House.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    });

    const multer = require('multer');
    const upload = multer({ dest: __dirname + '../../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:5000/uploads/${file.filename}`
        res.send(file)
    })

    app.use('/admin/api',router)
}