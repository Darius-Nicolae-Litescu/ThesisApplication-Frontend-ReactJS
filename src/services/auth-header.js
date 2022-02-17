export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.jwtToken;
    var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
        localStorage.removeItem("user");
    }

    if (user && user.jwtToken) {
        return { 'Authorization': "Bearer " + user.jwtToken };
    } else {
        return {};
    }
}