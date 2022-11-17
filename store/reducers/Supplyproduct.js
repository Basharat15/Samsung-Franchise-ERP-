import DATA from '../../models/Product';

import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCT,
    PURCHES_PRODUCT,
    MARKETING_PRODUCT,
    UPDATE_MARKETING_PRODUCT,
    SET_MARKETING_PRODUCT,
    SELL_PRODUCT
} from '../actions/Supplyproduct';

const initialState = {
    availableProducts: [],
    userProducts: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                userProducts: action.userProduct,
                
            };

            case SET_MARKETING_PRODUCT:
                return {
                    ...state,
                    availableProducts: action.availableProducts
                }

        case MARKETING_PRODUCT:
            const MarketProduct = new DATA(
                action.MarketingData.id,
                action.MarketingData.onwerId,
                action.MarketingData.title,
                action.MarketingData.imageUrl,
                action.MarketingData.price,
                action.MarketingData.ram,
                action.MarketingData.Quantity
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(MarketProduct)
            };

        case CREATE_PRODUCT:
            const NewProduct = new DATA(
                action.ProductData.id,
                action.ProductData.onwerId,
                action.ProductData.title,
                action.ProductData.imageUrl,
                action.ProductData.price,
                action.ProductData.ram,
                action.ProductData.Quantity
            )
            return {
                ...state,
                userProducts: state.userProducts.concat(NewProduct),
            };


        case UPDATE_PRODUCT:
            const ProductIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
            const Updateproduct = new DATA(
                action.pid,
                state.userProducts[ProductIndex].onwerId,
                action.ProductData.title,
                action.ProductData.imageUrl,
                action.ProductData.price,
                action.ProductData.ram,
                state.userProducts.Quantity
            )

            const UserProduct = [...state.userProducts]
            UserProduct[ProductIndex] = Updateproduct

            return {
                ...state,
                userProducts: UserProduct,
            };

        case PURCHES_PRODUCT:
            const ProductIndexs = state.userProducts.findIndex(prod => prod.id === action.id)
            const Updateproducts = new DATA(
                action.id,
                'u1',
                action.title,
                action.imageUrl,
                action.price,
                action.ram,
                // quantity - Quantity
                action.Quantity.toString()
            )
            const UserProductes = [...state.userProducts]
            UserProductes[ProductIndexs] = Updateproducts
            return {
                ...state,
                userProducts: UserProductes,
            }

        case UPDATE_MARKETING_PRODUCT:
            const ItemIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)
            const UpdateMarketproduct = new DATA(
                action.pid,
                state.availableProducts[ItemIndex].onwerId,
                action.MarketingitemData.title,
                action.MarketingitemData.imageUrl,
                state.availableProducts[ItemIndex].price,
                action.MarketingitemData.ram,
                action.MarketingitemData.Quantity
            )
            const MarketingProduct = [...state.availableProducts]
            MarketingProduct[ItemIndex] = UpdateMarketproduct
            return {
                ...state,
                availableProducts: MarketingProduct,
            };

            case SELL_PRODUCT:
                const itemIndexs = state.availableProducts.findIndex(prod => prod.id === action.id)
                const Updateitem = new DATA(
                    action.id,
                    'u1',
                    action.title,
                    action.imageUrl,
                    action.price,
                    action.ram,
                    // quantity - Quantity
                    action.Quantity.toString()
                )
                const AvailableProducts = [...state.availableProducts]
                AvailableProducts[itemIndexs] = Updateitem
                return {
                    ...state,
                    availableProducts: AvailableProducts,
                }
    
    }

    return state
}
