import { NextResponse } from "next/server"

export function middleware(request:any){
    // const authtoken = localStorage.getItem('token')
    console.log("middleware")
    // if(request.nextUrl.pathname!="/login"){
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }
    
}
// export const config = {
//     matcher:[
//         "/teacher/:path*",
//         "/student/:path*",]
//     }

