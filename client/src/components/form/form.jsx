import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { ButtonComponent } from '../button/button';
import { validate } from '../form/form-validate';
import { SocketContext } from '../../contexts/socketContext';
import { UsersContext } from '../../contexts/usersContext';
import { MainContext } from '../../contexts/mainContext';
import './form.scss';

export const FormComponent = ({ children }) => {
  const [image, setImage] = useState(null);
  const [ava, setAva] = useState(null);
  const [imageName, setImageName] = useState(null);
  const socket = useContext(SocketContext);
  const { setUsers } = useContext(UsersContext);
  const { name, room, settings, setSettings, setName } =
    useContext(MainContext);
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);
    }
    formik.values.imageSrc = URL.createObjectURL(event.target.files[0]);
  };

  const addAvatarOnBlock = () => {
    setAva(image);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      jobPosition: '',
      fullName: '',
      imageSrc: '',
      idd: '',
      score: '',
      isObserver: false,
      isMaster: true,
    },
    validate,
    onSubmit: async (values) => {
      formik.values.idd = name;
      formik.values.isObserver = user.isObserver;
      formik.values.isMaster = user.isMaster;
      formik.values.imageSrc = ava;
      formik.values.fullName =
        formik.values.firstName + ' ' + formik.values.lastName;
      dispatch({ type: 'SET_USER', payload: values });

      socket.emit('login', { values, room }, (error) => {
        if (error) {
          console.log(error);
          console.log('error in login');
        } else console.log(`${values.fullName} Welcome to ${room} room`);
      });
      setName(`${values.fullName}`);
      if (user.isMaster) {
        socket.emit('addSettingsRoom', { room }, (error) => {
          if (error) {
            console.log(error);
          } else console.log(`Add ${room} room in settingsData`);
        });
      }

      socket.on('getSettings', (settings) => {
        setSettings(settings);
      });

      socket.on('users', (users) => {
        setUsers(users);
      });

      setTimeout(() => {
        user.isMaster
          ? history.push('/lobby-master')
          : settings.isGame
          ? history.push('/game-master')
          : history.push('/lobby-members');
      }, 1000);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        isRequired
        isInvalid={formik.touched.firstName && formik.errors.firstName}
      >
        <FormLabel>Your first name:</FormLabel>
        <div className='form__section'>
          <Input
            placeholder='First name'
            className={'form__input'}
            id='firstName'
            name='firstName'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          <FormErrorMessage style={{ paddingLeft: '10px' }}>
            {formik.errors.firstName}
          </FormErrorMessage>
        </div>
      </FormControl>

      <FormControl
        isInvalid={formik.touched.lastName && formik.errors.lastName}
      >
        <FormLabel>Your last name:</FormLabel>
        <div className='form__section'>
          <Input
            placeholder='Last name'
            className={'form__input'}
            id='lastName'
            name='lastName'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          <FormErrorMessage style={{ paddingLeft: '10px' }}>
            {formik.errors.lastName}
          </FormErrorMessage>
        </div>
      </FormControl>

      <FormControl
        isInvalid={formik.touched.jobPosition && formik.errors.jobPosition}
      >
        <FormLabel>Your job position:</FormLabel>
        <div className='form__section'>
          <Input
            placeholder='job position'
            className={'form__input'}
            id='jobPosition'
            name='jobPosition'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jobPosition}
          />
          <FormErrorMessage style={{ paddingLeft: '10px' }}>
            {formik.errors.jobPosition}
          </FormErrorMessage>
        </div>
      </FormControl>
      <FormControl>
        <FormLabel>Image:</FormLabel>
        <Flex>
          <Input
            type={'file'}
            onChange={onImageChange}
            className={'filetype'}
          />
          <FormLabel className='choose__avatar'>
            {imageName ? imageName : 'Choose file'}
          </FormLabel>
          <ButtonComponent
            textContent='download'
            colorScheme={'facebook'}
            height={47}
            width={189}
            onClick={addAvatarOnBlock}
          />
        </Flex>
        <Avatar
          name={
            formik.values.firstName
              ? formik.values.firstName + ' ' + formik.values.lastName
              : null
          }
          src={ava}
          size={'lg'}
          bg='#60DABF'
        />
      </FormControl>
      {children}
    </form>
  );
};
