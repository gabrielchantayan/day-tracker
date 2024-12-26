import TextInput from "./text-input";
import NumberInput from "./number-input";
import { Controller } from "react-hook-form";

const TextWithNumbersInput = ({
	id,
	label,
	numbers_content,
	placeholder,
	form,
	value = 0,
	addition = '',
	on_change
}: {
	id: string;
	label: string;
	numbers_content: [{ name: string }];
	form: any;
	placeholder: string;
	value?: number;
	on_change?: any
	addition? : string
}) => {


	return (
		<div className={`flex flex-row w-full gap-1.5`}>
			<Controller
				key={`${id}-${addition}`}
				control={form.control}
				name={`${id}-${addition}`}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<TextInput
						id={`${id}-${addition}`}
						label={label}
						form={form}
						value={value}
						on_change={onChange}
						placeholder={placeholder}
					/>
				)}
			/>

			{numbers_content.map((number) => (
				<Controller
					key={`${number.name}-${addition}`}
					control={form.control}
					name={`${number.name}-${addition}`}
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<NumberInput
							id={`${number.name}-${addition}`}
							label={number.name}
							value={value}
							on_change={onChange}
							placeholder={'0'}
						/>
					)}
				/>
			))}
		</div>
	);
};

export default TextWithNumbersInput;
