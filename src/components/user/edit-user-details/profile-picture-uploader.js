import React, { useRef } from 'react'
import { useState } from 'react'
import { Container, Image } from 'react-bootstrap'
export const ProfilePictureUploader = ({ onFileSelect }) => {
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const files = e.target.files;
        const file = files[0];
        setError(null);
        if (validateFileIsNull(files)) {
            setError("Please select a file");
            return;
        }
        if (!validateFileCount(files)) {
            setError("Please select only one file")
            return;
        }
        if (!validateFileType(file)) {
            setError("File is not an image")
            return;
        }
        if (!validateFileSize(file)) {
            setError("Image size is too large, size limit is 4MB")
            return;
        }
        setSelectedImage(URL.createObjectURL(file));
        onFileSelect({ file: file })
    }


    const validateFileIsNull = (files) => {
        return !files || files.length === 0;
    }

    const validateFileType = (file) => {
        const fileType = /image.*/;
        return file.type.match(fileType) ? true : false;
    }

    const validateFileCount = (file) => {
        return file.length == 1 ? true : false
    }
    const validateFileSize = (file) => {
        return file.size <= 4 * 1024 * 1024;
    }

    return (
        <Container>
            <input type="file" onChange={handleFileInput} />
            {selectedImage &&
                <Image src={selectedImage} alt="preview" style={{width:"100%", height:"50%"}} />
            }
            {error &&
                <div className="error">{error}</div>
            }
        </Container>

    )
}