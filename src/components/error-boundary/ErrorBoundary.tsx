import React, { ReactNode } from 'react';

type TErrorMessageProps = {
	error: Error;
};

type TErrorBoundaryProps = {
	errorComponent: React.ComponentType<TErrorMessageProps>;
	children: ReactNode;
};

export class ErrorBoundary extends React.Component<
	TErrorBoundaryProps,
	{ error: Error | null }
> {
	constructor(props: TErrorBoundaryProps) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { error: error };
	}

	render() {
		if (this.state.error) {
			return React.createElement(this.props.errorComponent, {
				error: this.state.error,
			});
		}
		return this.props.children;
	}
}

export const ErrorMessage = ({ error }: TErrorMessageProps) => {
	return (
		<div className='error'>
			<p className='warning'>
				Что-то пошло не так! Пожалуйста, попробуйте обновить страницу.
			</p>
			<p>
				<span>Ошибка:</span> {error.message}
			</p>
			<button onClick={() => window.location.reload()}>
				Обновить страницу
			</button>
		</div>
	);
};
