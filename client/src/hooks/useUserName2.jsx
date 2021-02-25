import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useUserName = () => {
    const { allUsers } = useSelector((state) => state.Users);
    const id_name_map = useMemo(() => {
        // console.log('new map');
        return allUsers.reduce((acc, cur) => {
            acc[cur.id] = cur.name;
            return acc;
        }, {});
    }, [allUsers]);
    return id_name_map;
};
// import { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';

// export const useUserName = () => {
//     const { allUsers } = useSelector((state) => state.Users);
//     const ref = useRef();

//     useEffect(() => {
//         const id_name_map = allUsers.reduce((acc, cur) => {
//             acc[cur.id] = cur.name;
//             return acc;
//         }, {});
//         ref.current = (id) => id_name_map[id];
//     }, [allUsers]);

//     if (!ref.current) return (id) => id;
//     return ref.current;
// };
