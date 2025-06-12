import { useState, useEffect } from "react";
import { fetchUsers } from "../api";
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../store/usersSlice';

const ShowUserDetailes = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsers = async () => {
            const fetchedUsers = await fetchUsers();
            dispatch(setUsers(fetchedUsers)); // עדכון ה-state ב-Redux
        };

        getUsers();
    }, [dispatch]); // הוספת dispatch כתלות

    return (
        <div>
            {users.length > 0 ? (
                users.map((user, index) => (
                    <h2 key={index}>{user.email}</h2> // הצגת ה-email של כל משתמש
                ))
            ) : (
                <p>Loading...</p> // הודעה אם הנתונים עוד לא נטענו
            )}
        </div>
    );
};

export default ShowUserDetailes;