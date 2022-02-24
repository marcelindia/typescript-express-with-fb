import express, { Request,Response } from "express"
import { Car } from "./models/car"
import { CarService } from "./services/car-services"

const app = express()

app.use(express.json())

app.get('/cars',async (req:Request, res:Response)=> {
    const result = await CarService.getAllCars()

    if (!result){
        res.status(500).send('Something went wrong')
    }

    res.status(200).json(result)
})

app.post('/cars', async (req: Request, res:Response)=> {
    const {make, model, year} = req.body
    const car :Car = {make, model, year}
    try{

    const result= await CarService.addNewCar(car)
    car.id= result.id
    } catch (error) {
        res.status(500).send("Something went wrong")
    }

    res.status(201).json(car)
})

const port = 3000

app.listen(port,()=> {
    console.log(`We're listening on port ${port}`)
})