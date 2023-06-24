export function setCookie(cookieName: string, cookieValue: string) {

    const expirationSeconds = 86400;
    
    // Obtener todas las cookies
    const allCookies = document.cookie.split(';').reduce((cookieObj, cookie) => {
        const [name, value] = cookie.split('=');
        cookieObj[name.trim()] = value;
        return cookieObj;
    }, {});

    // Verificar si existen múltiples cookies con el mismo nombre
    const duplicateCookies = Object.keys(allCookies).filter((key) => key === cookieName);

    if (duplicateCookies.length > 1) {
    // Eliminar las cookies duplicadas
    duplicateCookies.forEach((cookieKey) => {
        document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    }

    // Expiración de la nueva cookie
    const expirationDate = new Date(new Date().getTime() + expirationSeconds * 1000);

    // Convertir la fecha de expiración en formato UTC
    const expirationDateString = expirationDate.toUTCString();
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDateString};`;
}  