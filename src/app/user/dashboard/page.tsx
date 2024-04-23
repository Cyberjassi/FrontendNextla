
import UserSidebar from "@/components/User/UserSidebar";

function Dashboard() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         Dashboard
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
