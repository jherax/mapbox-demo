import cities from 'cities.json';

const allCities = cities as City[];

export default function repeatedCities() {
  return new Promise<Record<string, number>>(resolve => {
    const uniqueCities = Object.create(null);
    const max = allCities.length;
    for (let i = 0; i < max; i += 1) {
      // remove accent: https://stackoverflow.com/a/37511463/2247494
      // name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const name = allCities[i].name;
      if (uniqueCities[name] != null) {
        uniqueCities[name] += 1;
      } else {
        uniqueCities[name] = 1;
      }
    }
    const repeated = Object.keys(uniqueCities)
      .filter(key => uniqueCities[key] > 1)
      .sort((a, b) => uniqueCities[b] - uniqueCities[a])
      .reduce((rep, current) => {
        rep[current] = uniqueCities[current];
        return rep;
      }, Object.create(null));
    resolve(repeated);
  });
}
