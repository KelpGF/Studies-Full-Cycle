import * as yup from 'yup';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
	validate(entity: Customer): void {
		try {
			yup.object()
				.shape({
					id: yup.string().required('Id is required'),
					name: yup.string().required('Name is required'),
				})
				.validateSync(
					{
						id: entity.id,
						name: entity.name,
					},
					{
						abortEarly: false,
					},
				);
		} catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error: string) => {
        entity.addNotificationError({
          context: 'customer',
          message: error,
        })
      })
    }
	}
}
