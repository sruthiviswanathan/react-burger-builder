export const reducerUtility = (state, updatedStateObjects) => {
    return {
        ...state,
        ...updatedStateObjects  
    };
}