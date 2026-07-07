import {useState} from "react"


function Bikes({bikes,setBikes}){


const [bike,setBike]=useState({
name:"",
model:"",
battery:"",
status:"Dostępny"
})



function addBike(){

if(!bike.name) return


setBikes([
...bikes,
{
...bike,
id:Date.now()
}
])


setBike({
name:"",
model:"",
battery:"",
status:"Dostępny"
})

}



function deleteBike(id){

setBikes(
bikes.filter(
b=>b.id!==id
)
)

}



return(

<div>


<h1>🚲 Baza rowerów</h1>


<div className="card">


<input
placeholder="Numer roweru np. EB-01"
value={bike.name}
onChange={
e=>setBike({...bike,name:e.target.value})
}
/>


<input
placeholder="Model"
value={bike.model}
onChange={
e=>setBike({...bike,model:e.target.value})
}
/>



<input
placeholder="Bateria %"
type="number"
value={bike.battery}
onChange={
e=>setBike({...bike,battery:e.target.value})
}
/>



<select

value={bike.status}

onChange={
e=>setBike({...bike,status:e.target.value})
}

>

<option>Dostępny</option>

<option>Zarezerwowany</option>

<option>Wypożyczony</option>

<option>Serwis</option>

</select>



<button onClick={addBike}>
➕ Dodaj rower
</button>


</div>



<h2>Lista rowerów</h2>



{
bikes.map(b=>(


<div className="card" key={b.id}>


<h2>
🚲 {b.name}
</h2>


<p>
Model: {b.model}
</p>


<p>
🔋 Bateria: {b.battery}%
</p>


<p>
Status: {b.status}
</p>


<button
onClick={()=>deleteBike(b.id)}
>

🗑 Usuń

</button>


</div>


))

}



</div>

)

}


export default Bikes