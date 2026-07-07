import { useState, useEffect } from "react"

const { ipcRenderer } = window.require("electron")


function App(){


const today = new Date()
.toISOString()
.substring(0,10)


const [page,setPage] = useState("new")

const [selectedDate,setSelectedDate] = useState(today)

const [reservations,setReservations] = useState([])

const [editReservation,setEditReservation] = useState(null)



useEffect(()=>{

async function load(){

const data = await ipcRenderer.invoke(
"get-data"
)

setReservations(data)

}

load()

},[])



useEffect(()=>{

ipcRenderer.invoke(
"save-data",
reservations
)

},[reservations])





return(

<div className="app">


<div className="menu">

<h1>
🚲 E-Bike
</h1>


<button onClick={()=>{

setEditReservation(null)

setPage("new")

}}>
➕ Nowa rezerwacja
</button>


<button onClick={()=>setPage("calendar")}>
📅 Kalendarz
</button>


<button onClick={()=>setPage("history")}>
📚 Historia
</button>


</div>



<div className="content">


{
page==="new" &&

<ReservationForm

reservations={reservations}

setReservations={setReservations}

editReservation={editReservation}

setEditReservation={setEditReservation}

/>

}



{
page==="calendar" &&

<Calendar

date={selectedDate}

setDate={setSelectedDate}

reservations={reservations}

setReservations={setReservations}

setEditReservation={setEditReservation}

setPage={setPage}

/>

}



{
page==="history" &&

<History

reservations={reservations}

/>

}



</div>


</div>

)

}








function ReservationForm({

reservations,

setReservations,

editReservation,

setEditReservation

}){


const [bikes,setBikes]=useState(

editReservation
?
editReservation.bikes
:
[]

)




function addBike(){

setBikes([

...bikes,

{
type:"HT",
sizes:""
}

])

}





function save(e){

e.preventDefault()


const form = new FormData(e.target)



const reservation = {


id:

editReservation

?

editReservation.id

:

Date.now(),



phone:

form.get("phone"),



date:

form.get("date"),



bikes:bikes,



notes:

form.get("notes"),



status:

editReservation

?

editReservation.status

:

"active"


}





if(editReservation){


setReservations(

reservations.map(r=>

r.id===editReservation.id

?

{

...r,

...reservation

}

:

r

)

)


}

else{


setReservations([

...reservations,

reservation

])


}



setEditReservation(null)

setBikes([])

e.target.reset()

}







return(

<div>


<h1>

{

editReservation

?

"✏️ Edycja rezerwacji"

:

"➕ Nowa rezerwacja"

}

</h1>




<form className="card" onSubmit={save}>


<input

name="phone"

placeholder="📞 Telefon"

defaultValue={editReservation?.phone || ""}

/>



<input

type="date"

name="date"

defaultValue={editReservation?.date || ""}

/>



<h2>
🚲 Rowery
</h2>



{

bikes.map((b,index)=>(


<div key={index}>


<select

value={b.type}

onChange={(e)=>{


const copy=[...bikes]

copy[index].type=e.target.value

setBikes(copy)

}}

>

<option>HT</option>

<option>FULL</option>

<option>MTB</option>

<option>KLASYCZNY</option>

<option>SURRON</option>


</select>



<input

placeholder="np. L,L,M"

value={b.sizes}

onChange={(e)=>{


const copy=[...bikes]

copy[index].sizes=e.target.value

setBikes(copy)

}}

/>


</div>


))


}




<button

type="button"

onClick={addBike}

>

➕ Dodaj rower

</button>



<textarea

name="notes"

placeholder="📝 Uwagi"

defaultValue={editReservation?.notes || ""}

/>



<button>

💾 Zapisz

</button>



</form>


</div>

)

}









function Calendar({

date,

setDate,

reservations,

setReservations,

setEditReservation,

setPage

}){


const list = reservations.filter(

r=>

r.date===date

&&

r.status!=="cancelled"

)



return(

<div>


<h1>
📅 Rezerwacje
</h1>



<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>



<button onClick={()=>window.print()}>
🖨 Drukuj
</button>





{

list.length===0

?

<div className="card">

Brak rezerwacji

</div>


:

list.map(r=>(


<div className="card" key={r.id}>


<h2>
📞 {r.phone}
</h2>



{

r.bikes.map((b,i)=>(


<p key={i}>

🚲 {b.sizes.split(",").length}x {b.type}

({b.sizes})

</p>


))

}



<p>
📝 {r.notes}
</p>





<button onClick={()=>{


setEditReservation(r)

setPage("new")


}}>

✏️ Edytuj

</button>





<button onClick={()=>{


if(window.confirm("Wykreślić rezerwację?")){


setReservations(

reservations.map(item=>

item.id===r.id

?

{

...item,

status:"cancelled"

}

:

item

)

)


}


}}>

❌ Wykreśl

</button>



</div>


))


}



</div>

)

}








function History({

reservations

}){


const history=[...reservations]

.sort(

(a,b)=>

new Date(b.date)-new Date(a.date)

)




return(

<div>


<h1>
📚 Historia
</h1>



{

history.map(r=>(


<div className="card" key={r.id}>


<h2>
📅 {r.date}
</h2>


<p>
📞 {r.phone}
</p>


{

r.bikes.map((b,i)=>(

<p key={i}>

🚲 {b.sizes.split(",").length}x {b.type}

({b.sizes})

</p>

))

}


<p>
📝 {r.notes}
</p>


<p>

{

r.status==="cancelled"

?

"🔴 Wykreślona"

:

"🟢 Aktywna"

}

</p>


</div>


))


}



</div>

)

}




export default App