import { FETCH_ALL_PRODUCTS } from '../constants';

const productRoutes = (state = [], {type, payload}) => {
    switch(type) {
        case FETCH_ALL_PRODUCTS:      
            return {...state, payload};
        default:
            return state;
    }
}

export default productRoutes;