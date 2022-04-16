import UserAccountOperationsService from '../../../services/user-account-operations.service';
import { validateEmail } from '../../validators';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default function ChangeEmail() {
    const navigate = useNavigate();

    const [newEmail, setNewEmail] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);
    const [error, setError] = useState(null);

    const ifError = () => {
        setIsLoading(false);
        setIsSuccess(false);
        setError("Could not change email");
    }

    const onChangeEmail = () => {
        if (!validateEmail(newEmail)) {
            setError("Invalid email, enter valid email");
            return;
        }
        setIsLoading(true);
        setIsSuccess(false);
        const username = UserAccountOperationsService.getLoggedInUsername();
        UserAccountOperationsService.updateEmail(username, newEmail)
            .then(response => {
                if (response != null) {
                    setIsLoading(false);
                    setIsSuccess(true);
                }
            }, error => {
                ifError();
            }
            ).catch(() => {
                ifError();
            });
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="edit-user-details-left-bar-item-content">
                <div className="edit-user-details-left-bar-item-content-loading">
                    <span className="spinner-border spinner-border-sm"></span>
                </div>
            </div>
        );
    }

    const redirectToUserProfile = () => {
        navigate("/profile");
    }

    if (isSuccess) {
        return (
            <div className="edit-user-details-left-bar-item-content">
                <div className="edit-user-details-left-bar-item-content-success">
                    <div className="edit-user-details-left-bar-item-content-success-icon">
                        <i className="fas fa-check"></i>
                    </div>
                    <div className="edit-user-details-left-bar-item-content-success-text">
                        Email changed successfully!
                    </div>
                    <Button variant="primary" onClick={() => {redirectToUserProfile()}}>Go to profile</Button>
                </div>
            </div>
        );
    }

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    Enter your new email
                </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={onChangeEmail} style={{ marginTop:"10px" }}>
                Change email
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </Form>);
}
