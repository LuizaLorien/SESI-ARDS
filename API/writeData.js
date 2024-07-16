
import fs from "node:fs";


const writeData = (value, callback) => {
  fs.writeFile('./usuarios.json', JSON.stringify(value, null, 2), 
    (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null);
      }
    }
  );
}



export default writeData