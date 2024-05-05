import { useForm } from 'react-hook-form';
import { USER_ACTIONS, useUserDispatch } from '../UserProvider';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import { GiHotMeal } from 'react-icons/gi';
import { Main } from '../../../Components/Main';
import './styles.css';

interface FormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useUserDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onFormSubmit = (data: FormValues) => {
    const username = data.username;
    dispatch({ type: USER_ACTIONS.updateUser, username: username });
    dispatch({ type: USER_ACTIONS.logIn });
    navigate('/', { replace: true });
  };

  return (
    <Main className='main-pattern'>
      <form className='login-form' onSubmit={handleSubmit(onFormSubmit)}>
        <div className='welcome-section'>
          <GiHotMeal className='form-logo' />
          <h3>Welcome back!</h3>
          <p>Please, enter your details.</p>
        </div>
        <TextField
          type='text'
          id='username'
          label='Username'
          variant='standard'
          {...register('username', { required: 'Please, enter your username' })}
        />
        {errors.username && (
          <span className='error-message'>{errors.username.message}</span>
        )}
        <TextField
          type='password'
          id='password'
          label='Password'
          variant='standard'
          {...register('password', { required: 'Please, enter your password' })}
        />
        {errors.password && (
          <span className='error-message'>{errors.password.message}</span>
        )}
        <button type='submit' className='form-btn--submit'>
          Log In
        </button>
      </form>
    </Main>
  );
};
