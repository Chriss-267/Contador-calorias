
import CalorieDisplay from './CalorieDisplay'
import { useActivity } from '../hooks/useActivity'



function CalorieTracker() {

    const { caloriesConsumed, caloriesBurned, netCalories} = useActivity()



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