import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

export const getDayLabelByDate = (date, short) => {
	const pattern = short ? 'EEEEEE' : 'EEEE';

    return format(parseISO(date.slice(0, 10)), pattern, {
		locale: ptBR
	});
};

export const getMonthLabelByDate = (date) => {
    return format(parseISO(date.slice(0, 10)), 'MMMM', {
		locale: ptBR
	});
};

export const getFormattedDatePreview = (date) => {
	return format(parseISO(date.slice(0, 10)), 'dd/MM/yyyy');
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
