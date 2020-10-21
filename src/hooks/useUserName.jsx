import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useUserName = () => {
    const { allUsers } = useSelector((state) => state.Users);
    const id_name_map = useMemo(() => {
        return allUsers.reduce((acc, cur) => {
            return {
                ...acc,
                [cur.id]: cur.name,
            };
        }, {});
    }, [allUsers]);
    return (id) => id_name_map[id];
};
