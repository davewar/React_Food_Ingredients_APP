import React,{useState} from 'react'
import  style from '../recipe.module.css'

var uniqid = require('uniqid');


const Recipe = ({title, image, calories,ingredients}) => {
        
     const [readMore, setReadMore] = useState(false);

    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <button type="button" className="btn" onClick={()=>setReadMore(!readMore)}>
                {!readMore ? "Ingredients" : "Close Ingredients"}
            </button>

            {readMore && 
               <ol>
              
                    {  
                    ingredients.map(item=>{
                        
                            return <li key={uniqid.time()}>{item.text}</li>
                    })
                    }
                </ol> 

            }           
                      
            <p style={{color:"lightgreen"}}>Calories - {calories}</p>
            <img className={style.image}src={image} alt=""/>
        </div>
    )
}

export default Recipe
