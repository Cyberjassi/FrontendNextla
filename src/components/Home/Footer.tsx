'user client'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className='py-3 my-5'>
       <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Home</Link></li>
        <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">About us</Link></li>
        <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Contact</Link></li>
        <li className="nav-item"><Link href="/Faq" className="nav-link px-2 text-muted">FAQs</Link></li>
        <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Support</Link></li> 
       </ul>
       <p className="text-center text-muted">© 2024 Jaswant khatri Demo</p>
    </footer>
  )
}
