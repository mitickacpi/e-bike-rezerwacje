import {useState} from "react"



function Reservations({
reservations,
setReservations,
bikes,
clients
}){


const [reservation,setReservation]=useState({

client:"",
bike:"",
date:"",
start:"",
end:"",
status:"Zarezerwowano"

})




function addReservation(){


setReservations([

...reservations,

{
...reservation,
id:Date.now()
}

])


}



return(

<div>


<h1>📋 Rezerwacje</h1>


<div className="card">


<select

onChange={
e=>setReservation({
...reservation,
client:e.target.value
})
}

>

<option>
Wybierz klienta
</option>


{
clients.map(c=>(

<option key={c.id}>
{c.name}
</option>

))

}

</select>




<select

onChange={
e=>setReservation({
...reservation,
bike:e.target.value
})
}

>

<option>
Wybierz rower
</option>


{
bikes.map(b=>(

<option key={b.id}>
{b.name}
</option>

))

}


</select>



<input
type="date"
onChange={
e=>setReservation({
...reservation,
date:e.target.value
})
}
/>



<input
type="time"
onChange={
e=>setReservation({
...reservation,
start:e.target.value
})
}
/>



<input
type="time"
onChange={
e=>setReservation({
...reservation,
end:e.target.value
})
}
/>




<button onClick={addReservation}>
➕ Dodaj rezerwację
</button>


</div>





{
reservations.map(r=>(


<div className="card" key={r.id}>


<h2>
👤 {r.client}
</h2>


<p>
🚲 {r.bike}
</p>


<p>
📅 {r.date}
</p>


<p>
🕒 {r.start} - {r.end}
</p>


<p>
📌 {r.status}
</p>


</div>


))

}



</div>


)

}


export default Reservations