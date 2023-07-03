export const removeSpecialChars = (text) => {
  if (!text || text === '') return text;

  let string = text;

  string = string.replace(/[ÁÀÂÃÄ]/gi, 'a');
  string = string.replace(/[ÉÈÊẼË]/gi, 'e');
  string = string.replace(/[ÍÌÎĨÏ]/gi, 'i');
  string = string.replace(/[ÓÒÔÕŌÖ]/gi, 'o');
  string = string.replace(/[ÚÙÛŨÜÛŪ]/gi, 'u');
  string = string.replace(/[Çç]/gi, 'c');
  string = string.replace(/G̃/gi, 'g');
  string = string.replace(/M̃/gi, 'm');
  string = string.replace(/Ñ/gi, 'n');
  string = string.replace(/P̃/gi, 'p');
  string = string.replace(/#/g, '');
  string = string.replace(/&/g, '');
  string = string.replace(/$/g, '');
  string = string.replace(/[.-]/g, '');
  string = string.replace(/,/g, '');
  return string;
};

export const getLocalizedBirthday = (birthday, lang = 'en') => {
  if (lang === 'pt-BR') { return birthday.split('-').reverse().join('-'); }
  return birthday;
};
