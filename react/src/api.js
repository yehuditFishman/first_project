
// export const fetchUsers = async () => {
//     const response = await fetch('/api/User'); // אין צורך לציין את הכתובת המלאה
//     const result = await response.json();
//     return result;
// };

// export const fetchUsers = async () => {
//     return new Promise((resolve) => {
//         setTimeout(async () => {
//             const response = await fetch('/api/User' );
//             const result = await response.json();
//             resolve(result);
//         });
//     });
// };
export const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:5137/api/User', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // אם יש צורך בטוקן, הוסיפי אותו כאן:
                // 'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};