export const SELL_NOW = 'SELL_NOW'

export const customerRecord = (pTitle, pPrice,customerName, customerNumber, customerCNIC, pQuantity) => {
    return async (dispatch) => {
        // const url1 = 'https://rn-complete-guide-54916-default-rtdb.firebaseio.com/customerRecord.json'
        try {
            const response = await fetch('https://integratedsamsungfranchise-default-rtdb.firebaseio.com/customerRecord.json',

                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pTitle,
                        pPrice,
                        customerName,
                        customerNumber,
                        customerCNIC,
                        pQuantity
                    })
                })
            const resData = await response.json()
            // console.log(resData)
            dispatch({
                type: SELL_NOW,
                pTitle,
                pPrice,
                customerName,
                customerNumber,
                customerCNIC,
                pQuantity
            });
        } catch (err) {
            throw err
        }
    }
}

