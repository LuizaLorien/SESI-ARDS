const readData = (callback) => {
    fs.readFile('./recipes.json', 'utf8', (err, data) => {
      if (err) callback(err)
  
      try {
        const recipes = JSON.parse(data)
        callback(null, recipes);
      } catch (error) {
        callback(error)
      }
    });
  }

  
export default readData;