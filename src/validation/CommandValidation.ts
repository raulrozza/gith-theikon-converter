import * as Yup from 'yup';

export const CommandValidation = Yup.object({
    calendar: Yup.string().oneOf(['gith', 'theikon']).required(),
    target: Yup.string().oneOf(['gith', 'theikon']).required(),
    day: Yup.number().required(),
    month: Yup.string().required(),
    year: Yup.number().required(),
});
