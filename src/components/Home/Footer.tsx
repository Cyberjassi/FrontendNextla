"user client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
  const [pagesData, setpagesData] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}pages/`)
      .then((response) => {
        console.log("Data:", response.data);
        setpagesData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <footer className="py-3 my-5">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link href="/" className="nav-link px-2 text-muted">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Faq" className="nav-link px-2 text-muted">
            FAQs
          </Link>
        </li>
        {pagesData &&
          pagesData.map((row, index) => (
            <li key={index} className="nav-item">
              <Link
                href={`/page/${row.id}${row.url}`}
                className="nav-link px-2 text-muted"
              >
                {row.title}
              </Link>
            </li>
          ))}
        <li className="nav-item">
          <Link href="/contact-us" className="nav-link px-2 text-muted">
            Contact Us
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">© 2024 Jaswant khatri Demo</p>
    </footer>
  );
}
