
import axios from "../axios";

export default function downloadFile(url) {
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