import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import userAPI from '../services/userAPI';

const RegisterPage = (props) => {

    const [user, setUser] = useState({
        lastname: "",
        firstname: "",
        pseudo: "",
        email: "",
        password: ""

    })

    const [errors, setErrors] = useState({
        lastname: "",
        firstname: "",
        pseudo: "",
        email: "",
        password: ""
    })
    
    const handleChange = ({currentTarget}) => {
        
        const value = currentTarget.value;

        setUser({ ...user, [currentTarget.name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await userAPI.newUser(user);
            toast.success("Votre inscription à réussi ! 👍")
            props.history.replace('/login');
        } catch (error) {
            toast.error("Oups, une erreur viens de ce produire ! 😥")
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    }

    return (
        <>
            <h1 className="text-center">S'inscrire</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
                    <label htmlFor="lastname">Nom de famille</label>
                    <input
                        onChange={handleChange}
                        value={user.lastname}
                        type="text"
                        placeholder="Nom de famille"
                        name="lastname"
                        id="lastname"
                        className={"form-control" + (errors.lastname && " is-invalid")} />
                    {errors.lastname &&
                        <p className="invalid-feedback">{ errors.lastname }</p>
                    }
                </div>
            <div className="form-group m-3">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        onChange={handleChange}
                        value={user.firstname}
                        placeholder="Prénom"
                        name="firstname"
                        id="firstname"
                        type="text"
                        className={"form-control" + (errors.firstname && " is-invalid")}
                    rows='3'/>
                    {errors.firstname &&
                        <p className="invalid-feedback">{ errors.firstname }</p>
                    }
                </div>
            <div className="form-group m-3">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        onChange={handleChange}
                        value={user.pseudo}
                        placeholder="Pseudo"
                        name="pseudo"
                        id="pseudo"
                        type="text"
                        className={"form-control" + (errors.pseudo && " is-invalid")}
                    rows='3'/>
                    {errors.pseudo &&
                        <p className="invalid-feedback">{ errors.pseudo }</p>
                    }
                </div>
            <div className="form-group m-3">
                    <label htmlFor="email">Adresse email</label>
                    <input
                        onChange={handleChange}
                        value={user.email}
                        placeholder="Adresse email"
                        name="email"
                        id="email"
                        type="email"
                        className={"form-control" + (errors.email && " is-invalid")}
                    rows='3'/>
                    {errors.email &&
                        <p className="invalid-feedback">{ errors.email }</p>
                    }
                </div>
            <div className="form-group m-3">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        onChange={handleChange}
                        value={user.password}
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        type="password"
                        className={"form-control" + (errors.password && " is-invalid")}
                    rows='3'/>
                    {errors.password &&
                        <p className="invalid-feedback">{ errors.password }</p>
                    }
                </div>
                <div className="form-group m-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-success"> Enregistrer </button>
                    <Link to="/" className="btn btn-link">Retour</Link>
                </div>
            </form>
        </>
     );
}
 
export default RegisterPage;