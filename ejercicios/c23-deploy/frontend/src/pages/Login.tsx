import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { LoginValidado } from '../schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const [errorApi, setErrorApi] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginValidado>({
        resolver: zodResolver(loginSchema)
    });

    const { login } = useAuth();

    const onSubmit = async (datos: LoginValidado) => {
    try {
        await login(datos);
        navigate('/catalogo');
    } catch (e) {
        setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="subtituloDestacados login-title">Ingresar</h2>

                {errorApi && <p className="login-error">{errorApi}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="login-field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@libreria.test"
                            {...register('email')}
                        />

                        {errors.email && <span className="login-message">{errors.email.message}</span>}
                    </div>

                    <div className="login-field">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="********"
                            {...register('password')}
                        />

                        {errors.password && <span className="login-message">{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary login-submit">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );

}