import React, { useMemo } from 'react'
import { activity } from '../types'
import { categories } from '../data/categories'
import {PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline"
import { ActivityActions } from '../reducers/activityReducer'


type ActivityListProps = {
    activities:activity[],
    dispatch: React.Dispatch<ActivityActions>
}

function ActivityList({activities, dispatch} : ActivityListProps) {

    const categoryName = useMemo(() => (category:activity["category"]) => categories.map(cat => cat.id=== category ? cat.name : ""), [activities])
    const isEmptyActivities = useMemo(() => activities.length === 0 , [activities])

  return (
    <>
        <h2 className='text-4xl fonto-bold text-slate-600 text-center'>Comida y Actividades</h2>
        {isEmptyActivities ? <p className='text-center my-5'>No hay actividades aún</p> :
        
        
        activities.map(activities => (
            <div key={activities.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow-lg'>
                <div className='space-y-2 relative'>
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white font-bold ${activities.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}>
                        {categoryName(+activities.category)}
                    </p>
                    <p className='text-2xl font-bold pt-5'>
                        {activities.name}
                    </p >
                    <p className='font-black text-4xl text-lime-500'>
                        {activities.calories} {" "}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className='flex gap-5 item-center'>
                    <button onClick={() => dispatch({type: "save-activeId", payload:{id: activities.id}})}>
                        <PencilSquareIcon
                            className = "h-8 w-8 text-gray-800"
                    
                    /></button>

                     <button onClick={() => dispatch({type: "delete-activeId", payload:{id: activities.id}})}>
                        <XCircleIcon
                            className = "h-8 w-8 text-red-500"
                    
                    /></button>
                </div>
            </div>
        ))}
    </>
  )
}

export default ActivityList