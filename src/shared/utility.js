export const updateObject = (oldState,updatedData)=>{
    return{
        ...oldState,
        ...updatedData
    }
}