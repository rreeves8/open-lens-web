export default function objectToFormData(object: Record<string, string>) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    formData.append(key, object[key]);
  });

  return formData;
}
