import  { useMemo } from 'react'
import { activity } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
    activities:activity[]
}


function CalorieTracker({activities} : CalorieTrackerProps) {

    //contadores

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

  return (
    <>
            <h2 className='text-xl font-black text-white text-center'>Resumen de Calorías</h2>
            <section className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
                <CalorieDisplay
                    calories = {caloriesConsumed}
                    text = "Consumidas"
                />
                <CalorieDisplay
                    calories = {caloriesBurned}
                    text = "Quemadas"
                />
                <CalorieDisplay
                    calories = {netCalories}
                    text = "Diferencia"
                />
            </section>
            
    
    </>
  )
}

export default CalorieTracker