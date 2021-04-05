export const getAccessToken = () => {
    const user = localStorage.getItem('user');
    if (!user) return '';
    return JSON.parse(user).accessToken;
};

export const setAccessToken = (s) => {
    localStorage.setItem('user', JSON.stringify({ accessToken: s }));
};

export const cleanAccessToken = () => {
    localStorage.setItem('user', '');
};
