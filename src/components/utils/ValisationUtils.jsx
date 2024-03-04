const isValidEmail = (email) => {
  // Utilisez une expression régulière pour valider le format de l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  // Vérifiez si le mot de passe a au moins 8 caractères, une majuscule, un chiffre et un caractère spécial
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export { isValidEmail, isValidPassword };
