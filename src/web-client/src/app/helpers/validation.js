import i18n from 'i18next';

export const antRules = () => [{ 
  required: true, 
  message: i18n.t('formPage.fieldIsRequired'),
}];
