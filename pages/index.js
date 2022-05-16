import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import prisma from 'lib/prisma'

export default function Home({cars, specialCar}) {
  return (
    <div className={styles.container}>
    
    <p>Special: {specialCar.brand} - {specialCar.model}</p>
      
    {cars.map(
      (car) => {
        return <li key={car.id}>
          {car.brand} - {car.model} - {car.created_at}
          </li>
      }
    )}
      
    </div>
  )
}

export async function getServerSideProps () {

  let cars = await prisma.car.findMany()
  cars = JSON.parse(JSON.stringify(cars)) // convert dates to strings

  let specialCar = await prisma.car.findUnique({
    where: {
      id: 1,
    },
  }
  )

  specialCar = JSON.parse(JSON.stringify(specialCar)) // convert dates to strings

  await prisma.car.update({
    where: { id: 4 },
    data: {
      model: 'Fiesta',
      bought: true,
    }
  })

  return {
    props: {
     cars,
     specialCar
    
  } 
}
}
