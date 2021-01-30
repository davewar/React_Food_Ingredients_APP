import React, {useState,useEffect} from 'react'
import Recipe from './components/Recipe'
require('dotenv').config()


function App() {

const [recipes, setRecipes] = useState([])

const [search,setSearch]= useState("")   // input box
const [query, setQuery] = useState('chicken')  // item to fetch
const [isLoading,setLoading] = useState(true)
const [error, setError] = useState({ show: false, msg: '' })


useEffect(() => {
      getRecipes()
}, [ query])


const getRecipes = async () =>{

       
        
        
    try{

      // "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
      
      // const resData  = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const resData  = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`)
                
        // console.log("R",resData);
        if(!resData.ok){
            console.log("here");
          throw Error ("Issue with getting item. Please try again")

        }
        
        const data  = await resData.json()
        // console.log("d",data);

        if(data.hits.length === 0){
          throw Error ("No items found")
            
        }

        console.log(data.hits);
        setRecipes(data.hits)
        setLoading(false) // no longer awaiting data


    }
    catch (err) {

      console.log(err.message)
       setError({show: true, msg: err.message + " , please re-submit and try again"}); // show error message
       setLoading(false) // no dat fetched
      setRecipes(null)  /// show no items
    }


        


}  //end of getRecipes


//update search value
const update = (e) => {  

    setSearch(e.target.value)    
    setError({ show: false, msg: '' }) // clear any error prev error message when typing in the search box

}

//search for a recipe
const handleSubmit = (e)=>{
e.preventDefault()
setQuery(search)
setSearch('')



}

  return (
    <div className="App" onSubmit={handleSubmit}>

          <form className="search-form">
              <input className="search-input" type="text" value={search}
              onChange={update}
              placeholder="Add main ingredient.."
              />
              <button className="search-button" type="submit">Search</button>

          </form>

            {
              isLoading && <div className="loading">Loading.......</div>
            }

            {
              error.show && <div className='error'>{error.msg}</div>
            }

            {
              recipes && 
                          <div className="recipes">
                              {
                                
                                  recipes.map(item =>{
                                      return <Recipe 
                                      key={item.recipe.label} 
                                      title={item.recipe.label}
                                      calories={item.recipe.calories.toFixed(2)}
                                      image={item.recipe.image}
                                      ingredients={item.recipe.ingredients}
                                      />
                                  })

                              }
                        </div>

            }

          
    </div>
  );
}



export default App;
