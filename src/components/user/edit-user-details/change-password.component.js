import UserAccountOperationsService from '../../../services/user-account-operations.service';
import { validateEmail } from '../../validators';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default function ChangePassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);
    const [error, setError] = useState(null);

    const ifError = () => {
        setIsLoading(false);
        setIsSuccess(false);
        setError("Could not change password");
    }

    const onChangePassword = () => {
        if (newPassword.length < 8) {
            setError("The new password should have more than 8 characters");
            return;
        }

        if (newPassword != newPasswordConfirmation) {
            setError("The new password and confirmation password do not match");
            return;
        }

        setIsLoading(true);
        setIsSuccess(false);
        const username = UserAccountOperationsService.getLoggedInUsername();
        UserAccountOperationsService.updatePassword(username, newPassword)
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
                        Password changed successfully!
                    </div>
                    <Button variant="primary" onClick={() => { redirectToUserProfile() }}>Go to profile</Button>
                </div>
            </div>
        );
    }

    return (
        <Form>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="input" placeholder="Enter password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Form.Text className="text-muted">
                    Enter your new password
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="input" placeholder="Confirm password" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} />
                <Form.Text className="text-muted">
                    Confirm new password
                </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={onChangePassword} style={{ marginTop: "10px" }}>
                Change password
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </Form>);
}
