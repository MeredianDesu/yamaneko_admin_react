interface FormField {
  name: string
  value: string
}

export const getFormValues = (values: FormField[]) => {
  return values.reduce(
    (result, currentValue) => {
      return {
        ...result,
        [currentValue.name]: currentValue.value,
      }
    },
    {} as Record<string, string>,
  )
}
