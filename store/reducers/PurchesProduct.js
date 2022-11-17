import { PURCHES_ITEM, SET_PURCHES_PRODUCT} from '../actions/PurchesProduct'
import Purches from '../../models/Purches'

const initialState = {
    purches: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PURCHES_PRODUCT:
            return {
                ...state,
                purches: action.PurchesProduct
            }

        case PURCHES_ITEM:
            const purchesitems = new Purches(
                action.id,
                action.title,
                action.price,
                action.Quantity,
                action.supName,
                action.supNum,
                action.date
            )
            return {
                ...state,
                purches: state.purches.concat(purchesitems),   
            }
    }


    return state;
}