const CalculatePoints = (points, polytheneProduction) => {
  const pointRanges = [
    { max: 1, points: 25 },
    { max: 2, points: 20 },
    { max: 3, points: 15 },
    { max: 4, points: 10 },
    { max: 5, points: 5 },
  ];

  const incrementStep = 1;
  const decrementPoints = 2;
  let newPoints = 0;

  for (let i = 0; i < pointRanges.length; i++) {
    if (polytheneProduction <= pointRanges[i].max) {
      newPoints = pointRanges[i].points;
      break;
    }
  }

  if (polytheneProduction > pointRanges[pointRanges.length - 1].max) {
    let maxRange = pointRanges[pointRanges.length - 1].max;
    let extraProduction = polytheneProduction - maxRange;
    let decrements = Math.ceil(extraProduction / incrementStep);

    newPoints = 0 - decrements * decrementPoints;
  }

  points += newPoints;

  return points;
};

module.exports = { CalculatePoints };
