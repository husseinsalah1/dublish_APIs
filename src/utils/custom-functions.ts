export interface FormObject {
  [key: string]: string | undefined;
}
export const convertFieldsToLowerCase = (
  formObject: FormObject,
  fieldNames: string[]
): FormObject => {
  fieldNames.forEach((fieldName) => {
    if (formObject[fieldName]) {
      formObject[fieldName] = formObject[fieldName]!.toLowerCase();
    }
  });
  return formObject;
};
