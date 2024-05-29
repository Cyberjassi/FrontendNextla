import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'


export function middleware(request:NextRequest,response:NextResponse){
  const authtoken = request.cookies.get('token')
  const userType = request.cookies.get('userType')
  console.log("middleware",userType?.value)
  const loggedInUserNotAccessPaths = 
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/registration";


    const studentPaths = [
      "/registration",
      "/login",
      "/student/:path*"
    ];
  
    const teacherPaths = [
      "/registration",
      "/login",
      "/teacher/:path*"
    ];

    if(loggedInUserNotAccessPaths){
      if(authtoken){
        return NextResponse.redirect(new URL("/",request.url));
      }
    }else{
      if(!authtoken){
        return NextResponse.redirect(new URL("/login",request.url));
      }
    }
}
export const config = {
    matcher:[
      "/registration",
      "/login",
        "/teacher/:path*",
        "/student/:path*",]
      }

    
    
    // const cookieall = request.cookies
    // console.log("middleware",cookieall)

    // if(request.nextUrl.pathname.startsWith("/s")){
      // return NextResponse.redirect(new URL("/login", request.url))
      // }
      