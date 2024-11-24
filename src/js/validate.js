export const validate = (formType, data) => {
    const errors = {};

    if (formType === 'forgotPassword') {
        if (!data.otpEmail) {
            errors.otpEmail = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.otpEmail)) {
            errors.otpEmail = "Email address is invalid.";
        }
    } else if (formType === 'register') {
        if (!data.name) {
            errors.name = "Username is required.";
        }
        if (!data.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid.";
        }
        if (!data.password) {
            errors.password = "Password is required.";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
    } else if (formType === 'login') {
        if (!data.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid.";
        }
        if (!data.password) {
            errors.password = "Password is required.";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
    }

    return errors;
};