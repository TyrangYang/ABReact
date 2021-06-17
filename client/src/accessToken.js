export const getAccessToken = () => {
    const user = sessionStorage.getItem('user');
    if (!user) return '';
    return JSON.parse(user).accessToken;
};

export const setAccessToken = (s) => {
    sessionStorage.setItem('user', JSON.stringify({ accessToken: s }));
};

export const cleanAccessToken = () => {
    sessionStorage.setItem('user', '');
};
