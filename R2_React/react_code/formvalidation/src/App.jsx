import React, { useState } from 'react';
import './FormValidation.css';

function FormValidation() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, email } = formData;

    if (!firstName.trim()) newErrors.firstName = 'Invalid Input';
    if (!lastName.trim()) newErrors.lastName = 'Invalid Input';
    if (!email.trim()) {
      newErrors.email = 'Invalid Input';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid Email Format';
    }

    const userExists = users.some(
      (u) => u.firstName === firstName.trim() && u.lastName === lastName.trim()
    );
    const emailExists = users.some((u) => u.email === email.trim());

    if (!newErrors.firstName && !newErrors.lastName && userExists) {
      newErrors.exists = 'User already exists';
    }
    if (!newErrors.email && emailExists) {
      newErrors.emailExists = 'Email already registered';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setUsers([...users, formData]);
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error-border' : ''}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error-border' : ''}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email || errors.emailExists ? 'error-border' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          {errors.emailExists && <p className="error-text">{errors.emailExists}</p>}
        </div>

        {errors.exists && <p className="error-text">{errors.exists}</p>}

        <button type="submit">Submit</button>
      </form>

      <h3>Registered Users</h3>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            {user.firstName} {user.lastName} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormValidation;
