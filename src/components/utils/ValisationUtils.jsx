const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateCategory = (categorie) => {
  const validCategories = ["film", "serie", "animé"];
  return (
    categorie.trim() !== "" && validCategories.includes(categorie.toLowerCase())
  );
};

const validateCommentary = (comment) => {
  const validateCommentaries = comment
}

export { isValidEmail, isValidPassword, validateCategory };
