
const { createSlice,nanoid,current } = require("@reduxjs/toolkit");

const initialState={
    users:JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
}

const Slice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const data ={
                id:nanoid(),
                name:action.payload
            }
            state.users.push(data)

            let userdata = JSON.stringify(current(state.users))
            localStorage.setItem("users",userdata)       
        },
        
        removeUser:(state,action)=>{
            const data = state.users.filter((user)=>user.id !== action.payload)
            state.users = data
            localStorage.removeItem("users")
        }
    }   
})  

export const {addUser,removeUser} = Slice.actions
export default Slice.reducer