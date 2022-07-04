import { Button, Card } from 'react-bootstrap';
import './Login.css'
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState();
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await logIn(user.email, user.password)
            navigate('/store');
        } catch (error) {
            console.log(error.code)
            if (error.code === 'auth/internal-error') {
                setError('Ocurrió un error, por favor intentalo de nuevo') || setTimeout(() => setError(''), 3000);
            } else if (error.code === 'auth/user-not-found') {
                setError('Usuario no registrado') || setTimeout(() => setError(''), 3000);
            } else if (error.code === 'auth/wrong-password') {
                setError('La contraseña incorrecta, intenta nuevamente') || setTimeout(() => setError(''), 3000);
            } else if (error.code === 'auth/invalid-email') {
                setError('El correo proporcionado es inválido') || setTimeout(() => setError(''), 3000)};
        }
    };

    const turnBack = () => {
        navigate('/store')
    }

    return (
        <>
            <div>
            <Button variant='light' onClick={turnBack}><ArrowBackIcon /> Regresar </Button>
            </div>
            <div className='login'>
                <Card className="text-center">
                    <Card.Title className="BBLog">BikerBander</Card.Title>
                    <Card.Body>
                        <Card.Title>Iniciar Sesión:</Card.Title>
                        {error && <p className='error'>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email:</label>
                            <input onChange={handleChange} type="email" name="email" id="email" placeholder='Ingresa tu Correo'></input>
                            <br />
                            <label htmlFor='password'>Contraseña</label>
                            <input onChange={handleChange} type="password" name="password" id="password" placeholder='Contraseña'></input>
                            <br />
                            <button>Entrar</button>
                        </form>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <p>¿Aún no tienes cuenta?<a href="/register"> Registrate</a></p>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </Card.Footer>
                </Card>
            </div>
        </>
    );
}