import UserAccountOperationsService from '../../../services/user-account-operations.service';
import { validateEmail } from '../../validators';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { ProfilePictureUploader } from './profile-picture-uploader';
export default function ChangeProfilePicture() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const submitForm = () => {
        if (selectedFile) {
            UserAccountOperationsService.updateProfilePicture(selectedFile).then(response => {
                if (response != null) {
                    navigate('/profile');
                }
                else {
                    setError("Could not update profile picture");
                }
            });
        }
    };

    return (
        <Container>
            <ProfilePictureUploader
                onFileSelect={(file) => setSelectedFile(file)}
            />
            {error && <div className="error">{error}</div>}
            {!error && setSelectedFile && <Button onClick={submitForm} style={{marginTop: "10px"}}>Change profile picture</Button>}
        </Container>
    );
}