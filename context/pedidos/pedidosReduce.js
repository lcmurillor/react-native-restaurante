
import { SELECCIONAR_PRODUCTO } from "@/types"; 

export default (state, action)=>{
    switch (action.type) {
      
        case SELECCIONAR_PRODUCTO:
            return{
                ...state,
                platillo: action.paylod
            }

        default:
            state;
    }
}