import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res => {
            setUsers(res.data);
            setLoading(false);
        }))
        .catch((err) => console.error(err));
    }, []);
    const filterredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    if (loading) return <Loader />;

    return (
        <div className="dashboard">
            <h1>User Dsahboard</h1>
            <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-bar" />
            
            <div className="user-grid">
                {filterredUsers.length > 0 ? (
                    filterredUsers.map((user) => <UserCard key={user.id} user={user} />)
                ) : (
                    <p>No users found.</p>
                )}
               
            </div>
        </div>
    );
}

export default Dashboard;