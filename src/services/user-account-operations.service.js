import axios from "../axios";
import { getUserFromLocalStorage } from "../common/auth-verify";

class UserAccountOperationsService {

    getLoggedInUsername = () => {
        return getUserFromLocalStorage().username;
    }

    updateProfilePicture(profilePicture) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture.file);
        return axios({
            method: "post",
            url: "/users/upload-profile-picture/",
            data: formData,
            headers: { 'Content-Type': `multipart/form-data` },
        }).then((response) => {
            response.data = response.data.success;
            return response.data;
        }).catch(function (error) {
            console.log(JSON.stringify(error))
        });
    }


    updateEmail(username, email) {
        return axios
            .put(`users/update/email`, { username: username, email: email })
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
    }
    updatePassword(username, password) {
        return axios
            .put(`users/update/password`, { username, password })
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
    }
}

export default new UserAccountOperationsService();
