import React, {useState} from 'react'

const data = [
  {
    id:1,
    title:"html",
    content:"text for html"
  },
  {
    id:2,
    title:"css",
    content:'text for css'
  },
  {
    id:3,
    title:"javascript",
    content:"text for javascript"
  }

]

const App = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) =>{

    setActiveIndex(activeIndex === i?null:i)

  }
  
  return (
    <div style={{margin:'40px'}}>
      <div>
        {
          data.map((d, i) =>(
            <div style={{backgroundColor:"grey", margin:"5px",border:"4px solid black"}}>
            <div key={i} onClick={() => toggle(i)} >
              {d.title}
            </div>
            
              {(i === activeIndex) && <div >{d.content}</div>}
            </div>
            
          )

          )
        }
      </div>
      
    </div>
  )
}

export default App
