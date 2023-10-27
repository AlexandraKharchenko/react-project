function calculateAverageGrade(user) {
  const { homeworks } = user;
  const positiveGrades = Object.values(homeworks).filter((grade) => grade >= 0);
  if (positiveGrades.length > 0) {
    const totalHomeworkGrade = positiveGrades.reduce((acc, cur) => acc + cur, 0);
    const averageHomeworkGrade = totalHomeworkGrade / positiveGrades.length;
    return averageHomeworkGrade;
  }
  return 0;
}
export default calculateAverageGrade;
