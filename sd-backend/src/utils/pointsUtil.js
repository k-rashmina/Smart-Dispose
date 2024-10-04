const CalculatePoints = (points, polytheneProduction) => {
  const pointRanges = [
    { max: 0.5, points: 20 },
    { max: 1.0, points: 15 },
    { max: 1.5, points: 10 },
    { max: 2.0, points: 5 },
    { max: 2.5, points: 0 },
  ];

  const incrementStep = 0.5;
  const decrementPoints = 5;
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

    newPoints =
      pointRanges[pointRanges.length - 1].points - decrements * decrementPoints;
  }

  points += newPoints;

  return points;
};

module.exports = { CalculatePoints };
