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

export const getMonthLabelByDate = (date) => {
    const month = moment(date).month();
    const months = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julio',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro',
    };

    return months[month];
};

export const getFormattedDatePreview = (date) => {
    return moment(date.slice(0, 10)).format('DD/MM/YYYY');
};

export const replaceSpecialCharacters = (string) => {
	return string.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/([^\w]+|\s+)/g, '')
		.replace(/--+/g, '')
		.replace(/(^-+|-+$)/, '')
		.toLowerCase();
};

export const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

export const validateCpfCnpj = (val) => {
    if (validateCpf(val)) {
		return true;
    } else if (val.length === 14) {
		const cnpj = val.trim()
			.replace(/\./g, '')
			.replace('-', '')
			.replace('/', '')
			.split('')
			.map((i) => ~~i);

        let v1 = 0;
        let v2 = 0;
        let aux = false;

        for (let i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] !== cnpj[i]) {
                aux = true;
            }
        }

        if (aux === false) {
            return false;
        }

        for (let i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }

        if (v1 !== cnpj[12]) {
            return false;
        }

        for (let i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }

        if (v2 !== cnpj[13]) {
            return false;
		}

		return true;
    } else {
        return false;
    }
 };

 export const validateCpf = (val) => {
    if (val.length === 11) {
		const cpf = val.trim()
			.replace(/\./g, '')
			.replace('-', '')
			.split('')
			.map((i) => ~~i);

        let v1 = 0;
        let v2 = 0;
        let aux = false;

        for (let i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] !== cpf[i]) {
                aux = true;
            }
        }

        if (aux === false) {
            return false;
        }

        for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 === 10) {
            v1 = 0;
        }

        if (v1 !== cpf[9]) {
            return false;
        }

        for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 === 10) {
            v2 = 0;
        }

        if (v2 !== cpf[10]) {
            return false;
		}

		return true;
    } else {
        return false;
    }
 };
