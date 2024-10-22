
import { activity } from "../types"

export type ActivityActions = 
    {type:"save-activity", payload : {newActivity:activity}} |
    {type:"save-activeId", payload : {id:activity["id"]}} |
    {type:"delete-activeId", payload : {id:activity["id"]}} |
    {type:"restart-app"}

export type ActivityState = {
    activities : activity[],
    activeId: activity["id"],

}

const localStorageActivities = (): activity[] =>{
    const activities = localStorage.getItem("activities")
    return activities ? JSON.parse(activities) : []
}

export const InitialState:ActivityState = {
    activities:localStorageActivities(),
    activeId: ""
}

export const activityReducer = (
    state:ActivityState = InitialState,
    action:ActivityActions
    ) =>{
    
    if(action.type === "save-activity"){
        //este codigo maneja la logica para manejar el state
        let updatedActivities : activity[] = [];

        if(state.activeId){
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity);
            
        } else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return{
            ...state, 
            activities: updatedActivities,
            activeId: ""
        }
    }

    if(action.type === "save-activeId"){

        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === "delete-activeId"){
        return{
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === "restart-app"){
        return{
            activities: [],
            activeId : ""
        }
    }

    return state;

}