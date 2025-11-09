import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res => {
            setUsers(res.data);
            setLoading(false);
        }))
        .catch((err) => console.error(err));
    }, []);
    if (loading) return <Loader />;

    return (
        <div className="dashboard">
            <h1>User Dsahboard</h1>
            <div className="user-grid">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;