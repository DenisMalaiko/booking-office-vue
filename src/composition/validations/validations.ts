export function Validations() {
  const emailRules: any = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ];

  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || 'Password must be more than 8 characters',
  ]

  return {
    emailRules,
    passwordRules
  }
}