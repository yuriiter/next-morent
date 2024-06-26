import { CarsQuery } from "../types/carsQuery"
import { setTimeOfDate } from "./time"

export const buildCarQuery = (query: CarsQuery) => {
    const {
        typeSport,
        typeSUV,
        typeMPV,
        typeSedan,
        typeCoupe,
        typeHatchback,
        capacity2,
        capacity4,
        capacity6,
        capacity8,
        price,
        search,
        recommendedFlag,
        popularFlag,
        pickUpLocation,
        pickUpDate,
        pickUpTime,
        dropOffLocation,
        dropOffDate,
        dropOffTime,
    } = query

    const conditions = []

    const carTypeConditions = []
    if (typeSport) carTypeConditions.push({ carType: "sport" })
    if (typeSUV) carTypeConditions.push({ carType: "SUV" })
    if (typeMPV) carTypeConditions.push({ carType: "MPV" })
    if (typeSedan) carTypeConditions.push({ carType: "sedan" })
    if (typeCoupe) carTypeConditions.push({ carType: "coupe" })
    if (typeHatchback) carTypeConditions.push({ carType: "hatchback" })

    if (carTypeConditions.length > 0) {
        conditions.push({ $or: carTypeConditions })
    }

    const capacityConditions = []
    if (capacity2) capacityConditions.push({ peopleCapacity: 2 })
    if (capacity4) capacityConditions.push({ peopleCapacity: 4 })
    if (capacity6) capacityConditions.push({ peopleCapacity: 6 })
    if (capacity8) capacityConditions.push({ peopleCapacity: 8 })

    if (capacityConditions.length > 0) {
        conditions.push({ $or: capacityConditions })
    }

    if (price !== undefined) {
        conditions.push({ price: { $lte: price } })
    }

    if (search) {
        conditions.push({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        })
    }

    if (recommendedFlag) conditions.push({ recommendedFlag: true })
    if (popularFlag) conditions.push({ popularFlag: true })

    if (pickUpLocation && pickUpDate && dropOffLocation && dropOffDate) {
        conditions.push({
            $or: [
                {
                    "rentalData.pickUpData.dateTime": {
                        $gte: setTimeOfDate(dropOffDate, dropOffTime),
                    },
                },
                {
                    "rentalData.dropOffData.dateTime": {
                        $lte: setTimeOfDate(pickUpDate, pickUpTime),
                    },
                },
                {
                    rentalData: { $exists: false },
                },
            ],
        })
    }

    const finalQuery =
        conditions.length > 0
            ? { $and: conditions }
            : { $and: [{ _id: { $ne: null } }] }

    return finalQuery
}
