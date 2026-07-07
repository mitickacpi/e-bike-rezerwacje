const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const Store = require("electron-store")


const store = new Store({
  name: "baza"
})



function createWindow(){

const win = new BrowserWindow({

width:1400,
height:900,

webPreferences:{

nodeIntegration:true,

contextIsolation:false

}

})


win.loadFile(

path.join(

__dirname,

"dist",

"index.html"

)

)


}





ipcMain.handle(

"get-data",

()=>{

return store.get(

"reservations",

[]

)

}

)





ipcMain.handle(

"save-data",

(event,data)=>{


store.set(

"reservations",

data

)


return true

}

)





app.whenReady()

.then(()=>{

createWindow()

})