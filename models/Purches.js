import  moment from 'moment'
class Purches {
    constructor(id, title, price, Quantity,supName, supNum,Date) {
        this.id = id
        this.title = title
        this.price= price
        this.Quantity= Quantity
        this.supName = supName
        this.supNum = supNum
        this.Date= Date
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default Purches;