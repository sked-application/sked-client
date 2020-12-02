import moment from 'moment';

export const getDayLabelByDate = (date) => {
    const day = moment(date).day();
    const weekDays = {
        0: 'Domingo',
        1: 'Segunda',
        2: 'Terça',
        3: 'Quarta',
        4: 'Quinta',
        5: 'Sexta',
        6: 'Sábado',
    };

    return weekDays[day];
};

export const getFormattedDatePreview = (date) => {
    return moment(date).format('DD/MM/YYYY');
};
