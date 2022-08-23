import * as Yup from 'yup';

export const schemaValidation = Yup.object({
  patrimony: Yup.string()
        .required('Por favor, forneça o código do patrimônio!'),
  equipment: Yup.string()
        .required('Por favor, forneça qual equipamento está com defeito!'),
  description: Yup.string()
        .required('Por favor, forneça uma descrição do problema!')
}).required();