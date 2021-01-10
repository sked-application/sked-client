import React, { useContext, useState } from 'react';
import ScheduleService from '../../../../services/schedule';
import CustomerService from '../../../../services/customer';
import schemaSignUp from './main-schedule-form-schemas/customer-signup-validator';
import schemaSignIn from './main-schedule-form-schemas/customer-signin-validator';
import NumberFormat from 'react-number-format';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { FormInputError } from '../../../../components/input-form-error/input-form-error';
import { MainContext } from '../../../../contexts/main/main';
import { AuthContext } from '../../../../contexts/auth/auth';

const MainSlotGrid = () => {
	const {
		scheduleSlot,
		accountInfo,
		service,
		user,
		resetMainDate,
		resetMainService
	} = useContext(MainContext);
	const {
		isAuthenticated,
		handleSignIn,
		userAccountUrl,
		handleSignOut
	} = useContext(AuthContext);
    const [formType, setFormType] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register: signUpRegister,
		handleSubmit: signUpHandleSubmit,
		formState: signUpFormState,
		errors: signUpErros,
		reset: signUpReset,
		control: signUpControl
	} = useForm({
		resolver: yupResolver(schemaSignUp.form.validator),
		defaultValues: schemaSignUp.form.initialValues,
		mode: 'onTouched',
	});

	const {
		register: signInRegister,
		handleSubmit: signInHandleSubmit,
		formState: signInFormState,
		errors: signInErros,
		reset: signInReset,
	} = useForm({
		resolver: yupResolver(schemaSignIn.form.validator),
		defaultValues: schemaSignIn.form.initialValues,
		mode: 'onTouched',
	});

    const getScheduleInfoPreview = ({ date, start, end }) => {
        if (!date) return 'Selecione um horário';

        return `${start.slice(0, 5)} às ${end.slice(0, 5)}`;
    };

    const submitSchedule = async () => {
        try {
            const { date, start, end } = scheduleSlot;

            if (!service.id) {
                alert('Escolha um serviço');
                return;
			}

			if (!user.id) {
                alert('Escolha um profissional');
                return;
            }

            if (!date) {
                alert('Escolha o horário');
                return;
            }

            await ScheduleService.create({
                date,
                start,
                end,
                account_id: accountInfo.id,
                service_id: service.id,
                user_id: user.id,
			});

            resetMainService();
            resetMainDate();
            alert('Agendamento realizado com sucesso!');
        } catch ({ response }) {
            resetMainDate();
            alert(response.data);
        }
    };

    const signUpForm = async (values) => {
		try {
			const { email, name, telephone, password } = values;

			setIsLoading(true);

			const { data } = await CustomerService.signUp({
				email,
				name,
				telephone,
				password,
			});

			signUpReset();
			setIsLoading(false);
			handleSignIn(data.token);
			alert('Cadastro realizado com sucesso, realize agora seu agendamento!');
		} catch ({ response }) {
			alert(response.data);
			setIsLoading(false);
		}
	};

    const signInForm = async (values) => {
		try {
			const { email, password } = values;

			setIsLoading(true);

			const { data } = await CustomerService.signIn({
				email,
				password,
			});

			signInReset();
			setIsLoading(false);
			handleSignIn(data.token);
		} catch ({ response }) {
			alert(response.data);
			setIsLoading(false);
		}
	};

    return (
        <div className="card">
            <div className="card__header">
                <h2 className="card__title">Agende</h2>
                <span className="card__subtitle">
                    {getScheduleInfoPreview(scheduleSlot)}
                </span>
            </div>

            {isLoading && <span className="loading loading--primary m-b-20"></span>}

            {!isAuthenticated && !isLoading && formType === 'SIGN_UP' && (
                <form onSubmit={signUpHandleSubmit(signUpForm)}>
                    <div className="m-t-15">
                        <input
                            name="email"
                            type="email"
                            ref={signUpRegister}
							placeholder="Email"
							className="input input--dark"
							autoComplete="off"
                        />
                        <FormInputError
                            error={signUpErros.email && signUpErros.email.message}
                        />
                    </div>
                    <div className="m-t-15">
                        <input
                            name="name"
                            type="text"
                            ref={signUpRegister}
							placeholder="Nome"
							className="input input--dark"
                        />
                        <FormInputError
                            error={signUpErros.name && signUpErros.name.message}
                        />
                    </div>
                    <div className="m-t-15">
						<Controller
							name="telephone"
							control={signUpControl}
							as={<NumberFormat
								format="(##) #####-####"
								mask="_"
								type="tel"
								className="input input--dark"
								placeholder="Telefone"
							/>}
						/>
                        <FormInputError
                            error={signUpErros.telephone && signUpErros.telephone.message}
                        />
                    </div>
                    <div className="m-t-15">
                        <input
                            name="password"
                            type="password"
                            ref={signUpRegister}
							placeholder="Senha"
							className="input input--dark"
							autoComplete="off"
                        />
                        <FormInputError
                            error={signUpErros.password && signUpErros.password.message}
                        />
                    </div>
                    <div className="m-t-15">
                        <input
                            name="confirmPassword"
                            type="password"
                            ref={signUpRegister}
							placeholder="Confirme sua senha"
							className="input input--dark"
							autoComplete="off"
                        />
                        <FormInputError
                            error={signUpErros.confirmPassword && signUpErros.confirmPassword.message}
                        />
                    </div>
                    <div className="m-t-15">
                        <button
							type="submit"
							className="button button--block button--primary"
							disabled={!signUpFormState.isValid}>
                            Casdastrar
                        </button>
                    </div>
                    <div className="text--center m-t-25 m-b-15">
                        <div onClick={() => setFormType('SIGN_IN')} className="cursor--pointer">
                            <span>Já sou cliente</span>
                        </div>
                    </div>
                </form>
            )}

            {!isAuthenticated && !isLoading && formType === 'SIGN_IN' && (
                <form onSubmit={signInHandleSubmit(signInForm)}>
                    <div className="m-t-15">
                        <input
                            name="email"
                            type="email"
                            ref={signInRegister}
							placeholder="Email"
							className="input input--dark"
							autoComplete="off"
                        />
                         <FormInputError
                            error={signInErros.email && signInErros.email.message}
                        />
                    </div>
                    <div className="m-t-15">
                        <input
                            name="password"
                            type="password"
                            ref={signInRegister}
							placeholder="Senha"
							className="input input--dark"
							autoComplete="off"
                        />
                        <FormInputError
                            error={signInErros.password && signInErros.password.message}
                        />
                    </div>
                    <div className="m-t-15">
						<button
							type="submit"
							className="button button--block button--primary"
							disabled={!signInFormState.isValid}>
                            Entrar
                        </button>
                    </div>
                    <div className="text--center m-t-25 m-b-15">
                        <div onClick={() => setFormType('SIGN_UP')} className="cursor--pointer">
                            <span>Não tenho cadastro</span>
                        </div>
                    </div>
                </form>
            )}

            {!isAuthenticated && !formType && (
                <div className="m-t-5">
                    <button
                        className="button button--block button--outline m-b-15"
                        onClick={() => setFormType('SIGN_IN')}
                    >
                        Já sou cliente
                    </button>
                    <button
                        className="button button--block button--outline"
                        onClick={() => setFormType('SIGN_UP')}
                    >
                        Não tenho cadastro
                    </button>
                </div>
            )}

            {isAuthenticated && !userAccountUrl && (
                <div className="flexbox m-t-5">
                    <div className="flexbox__item">
                        <button
                            className="button button--block button--primary"
                            onClick={submitSchedule}
                        >
                            Agendar
                        </button>
                    </div>
                </div>
            )}

            {isAuthenticated && userAccountUrl && (
                <div className="flexbox m-t-5">
                    <div className="flexbox__item">
                        <button
                            className="button button--block button--outline"
                            onClick={() => handleSignOut(true)}
                        >
                            Entrar como cliente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainSlotGrid;
