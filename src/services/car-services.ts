import {Car} from '../models/car'
import {connectDb} from '../connectDb'
import { CollectionReference } from 'firebase-admin/firestore'

interface CarService {

    addNewCar(car:Car):Promise<Car>
    getAllCars():Promise<Car[] | null>
    updateCar(car:Car):Car
    getCarById(carId:string):Car

}

const carCollection = connectDb().collection('car') as CollectionReference<Car>

const getAllCars= async ():Promise<Car[] | null> => {
// const cars: Car[] = [];
// // Line 15 && 17 are similar
// const car1: Car= {make:"Audi", model:'A3', year: 2020}

// const car2: Car={make: 'Audi', model:'A1'} as Car //casting it as type Car -- even though it is required to have "make,model,and year" it's still considered a Car without the year.


// cars.push(car1,car2)


try {
    const result = await carCollection.get()
    const cars = result.docs.map((doc) => {
        const car:Car = doc.data()
        car.id = doc.id;
        return car;
    })
    return cars
} catch (error) {
return null
}

}

const addNewCar = async (car:Car): Promise<Car> => {
    const result = await carCollection.add(car)
    
    car.id = result.id
    return car
}

export const CarService= {getAllCars, addNewCar } as CarService

