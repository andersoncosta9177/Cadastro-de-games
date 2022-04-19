const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


var db = {
    games: [{
            id: 20,
            title: 'Call of duty',
            year: 2019,
            price: 2.99
        },
        {
            id: 21,
            title: 'Counter strike',
            year: 2019,
            price: 50
        },
        {
            id: 22,
            title: 'Euro truck',
            year: 2011,
            price: 30
        }
    ]
}


app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(db.games)

})


app.get('/games/:id', (req, res) => {

    if (isNaN(req.params.id)) {

        res.sendStatus(400)

    } else {
        var id = parseInt(req.params.id)
        var game = db.games.find(g => g.id == id)
        if (game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})


app.post('/games', (req,res)=>{
    var {title,price,year} =  req.body

    db.games.push({
        id: 24,
        title,
        price,
        year
    })
    res.sendStatus(200)
})


app.delete("/games/:id", (req,res)=>{
   
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index =  db.games.findIndex( g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            db.games.splice(index,1)
            res.sendStatus(200)
        }
    }

})



app.put('/games/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var game = db.games.find(g =>g.id == id)
        if(game != undefined){
            var {title,price, year} = req.body
            if(title != undefined){
                game.title = title
            }
            if(price != undefined){
                game.price = price
            }
            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)

        }else{
            res.sendStatus(400)
        }
    }


})




app.get('/', (req, res) => {
    res.send('ok')
})


app.listen(1337, () => {
    console.log("api iniciado")
})