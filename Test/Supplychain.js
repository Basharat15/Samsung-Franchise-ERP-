const editproduct = "updateproduct"; // englishCode
const createproduct  = "create";  //spanishCode
function supply(index){
    switch (index.toLowerCase()){
      case editproduct.toLowerCase():
        return 'updateproduct();';
      case createproduct.toLowerCase():
        return 'create()';
    }
    return '';
}
module.exports = supply;