function Dashboard({bikes,clients,reservations}){


return(

<div>

<h1>🏠 Panel główny</h1>


<div className="card">

<h2>Statystyki</h2>

<p>🚲 Rowery: {bikes.length}</p>

<p>👥 Klienci: {clients.length}</p>

<p>📋 Rezerwacje: {reservations.length}</p>


</div>


</div>

)

}

export default Dashboard