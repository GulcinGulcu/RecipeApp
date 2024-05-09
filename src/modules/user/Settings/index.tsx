import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Main } from '../../../Components/Main';
import { BsPlusLg } from 'react-icons/bs';
import { LiaMinusSolid } from 'react-icons/lia';
import { useState } from 'react';
import { useUserDispatch } from '../UserProvider';
import { USER_ACTIONS } from '../UserProvider';
import { FormValues } from '../models';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import './styles.css';

export const Settings = () => {
  const dispatch = useUserDispatch();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [activeFormId, setActiveFormId] = useState('');

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onFormSubmitUsername = (data: FormValues) => {
    dispatch({ type: USER_ACTIONS.updateUser, username: data.username });
    setOpen(true);
    reset();
  };
  const onFormSubmitPassword = (data: FormValues) => {
    dispatch({ type: USER_ACTIONS.updatePassword, password: data.password });
    setOpen(true);
    reset();
  };

  const action = (
    <button className='close-btn' onClick={handleClose}>
      X
    </button>
  );

  return (
    <Main className='settings'>
      <div
        className={
          activeFormId === 'change_username'
            ? 'settings__form-area active'
            : 'settings__form-area'
        }
        onClick={() => setActiveFormId('change_username')}
      >
        <p className='settings__title'>
          {activeFormId === 'change_username' ? (
            <LiaMinusSolid />
          ) : (
            <BsPlusLg />
          )}
          Update your username
        </p>
        {activeFormId === 'change_username' && (
          <form
            className='settings__form'
            onSubmit={handleSubmit(onFormSubmitUsername)}
            noValidate
          >
            <TextField
              fullWidth
              type='text'
              id='username'
              label='New Username'
              required
              variant='standard'
              {...register('username', {
                required: true,
              })}
              error={!!errors.username}
              helperText={errors.username && 'Please enter a user name'}
            />
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </form>
        )}
      </div>
      <div
        className={
          activeFormId === 'change_password'
            ? 'settings__form-area active'
            : 'settings__form-area'
        }
        onClick={() => setActiveFormId('change_password')}
      >
        <p className='settings__title'>
          {activeFormId === 'change_password' ? (
            <LiaMinusSolid />
          ) : (
            <BsPlusLg />
          )}
          Change your password
        </p>
        {activeFormId === 'change_password' && (
          <form
            className='settings__form'
            onSubmit={handleSubmit(onFormSubmitPassword)}
            noValidate
          >
            <TextField
              fullWidth
              type='text'
              id='password'
              label='New Password'
              variant='standard'
              required
              {...register('password', {
                required: true,
              })}
              error={!!errors.password}
              helperText={errors.password && 'Please enter new password'}
            />
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </form>
        )}
      </div>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={
            activeFormId === 'change_username'
              ? 'Your username is updated!'
              : 'Your password is changed!'
          }
          action={action}
        />
      )}
    </Main>
  );
};
