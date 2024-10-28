import { ChangeEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import { activity } from "../types"
import { useActivity } from "../hooks/useActivity"

//npm i uuid para crear id unicos


const initialState:activity = {
    id: uuidv4(),
    category:1,
    name:"",
    calories:0
}

function Form() {

    const {state, dispatch} = useActivity()
    const [activity, setActivity] = useState<activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{

        const isNumberField = ["category", "calories"].includes(e.target.id)

        setActivity({

            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () =>{
        const {name, calories} = activity
        return name.trim() !== "" && calories >0
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        dispatch({type: "save-activity", payload: {newActivity:activity}})
        setActivity({
            ...initialState,
            id:uuidv4()
        })
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >

        <section className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoria:</label>

            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
            >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                       {category.name}
                    </option>

                ))}    

            </select>
        </section>

        <section className="grid grid-cols-1 gap-3">
             <label htmlFor="name">Actividad:</label>
             <input type="text" id = "name" 
             value={activity.name}
             onChange={handleChange}
             className="border border-slate-300 p-2 rounded-lg w-full bg-white"
             placeholder="Ej, Comida, Jugo de Naranja, Ensalada, Pesas"
             />
        </section>

        <section className="grid grid-cols-1 gap-3">
             <label htmlFor="calories">Calorias:</label>
             <input type="number" id = "calories" className="border border-slate-300 p-2 rounded-lg w-full bg-white"
             value={activity.calories}
             onChange={handleChange}
             placeholder="Calorías, ej. 300 o 500"
             />
        </section>

        <input type="submit" 
        className="p-2 bg-gray-800 hover:bg-gray-900 w-full font-bold text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled = {!isValidActivity()}
        />

    </form>
  )
}

export default Form