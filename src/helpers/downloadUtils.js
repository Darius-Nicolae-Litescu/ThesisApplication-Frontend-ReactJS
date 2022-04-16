
import axios from "../axios";

export function downloadFile(url) {
    if (url) {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            let filenameAndExtension = response.headers['filename'];
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filenameAndExtension);
            document.body.appendChild(link);
            link.click();
        });
    }
}

export const baseURL = () => {
     return "http://localhost:8080/api";
};

export const constructProfileImageUrl = (userId) => {
    return `${baseURL()}/users/${userId}/profile-image/`
}

export function serveImage(url) {
    if (url) {
        return axios.get(url, null, { responseType: 'blob' })
        .then((response) => {
            return response;
        });
    }
}