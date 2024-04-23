// slice means action+reducer
// action means we just store in  redux store 
// and reducer store action data in redux store
// current means we can access state data in action
const { createSlice,nanoid,current } = require("@reduxjs/toolkit");

const initialState={
    // users:[]
    // for bring data from local storage after refresh page
    // users:JSON.parse(localStorage.getItem("users"))
    users:JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
}

const Slice = createSlice({
    name:"users",
    initialState,
    reducers:{
        // actions-
        // state means what data and action means which data we'll put
        addUser:(state,action)=>{
            // to check our state data is came in action or not
            // console.log(action)
            const data ={
                id:nanoid(),
                name:action.payload
            }
            state.users.push(data)

            let userdata = JSON.stringify(current(state.users))
            localStorage.setItem("users",userdata)


            // we can not access state directly that why we use current in argument 
            // console.log(state.users)


            // for see current state data in action
            console.log(current(state.users))
            
        },
        
        removeUser:(state,action)=>{
            // means we'll remove data from state
            const data = state.users.filter((user)=>user.id !== action.payload)
            state.users = data
            // for remove data from local storage after remove data
            localStorage.removeItem("users")
        }
    }   
})  

export const {addUser,removeUser} = Slice.actions
export default Slice.reducer