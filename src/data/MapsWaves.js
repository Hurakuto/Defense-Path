const map1Waves = [
    { normal: 3, speedy: 0, tanky: 0, spawnInterval: 60, waveDelay: 600 },
    { normal: 5, speedy: 2, tanky: 0, spawnInterval: 60, waveDelay: 600 },
    { normal: 3, speedy: 3, tanky: 0, spawnInterval: 55, waveDelay: 600 },
    { normal: 5, speedy: 4, tanky: 1, spawnInterval: 50, waveDelay: 600 },
    { normal: 0, speedy: 5, tanky: 2, spawnInterval: 50, waveDelay: 600 },
    { normal: 5, speedy: 2, tanky: 3, spawnInterval: 45, waveDelay: 600 },
    { normal: 8, speedy: 3, tanky: 3, spawnInterval: 45, waveDelay: 600 },
    { normal: 5, speedy: 8, tanky: 5, spawnInterval: 40, waveDelay: 550 },
    { normal: 0, speedy: 10, tanky: 8, spawnInterval: 35, waveDelay: 500 },
    { normal: 10, speedy: 10, tanky: 10, spawnInterval: 30, waveDelay: 500 },
];

const map2Waves = [
    { normal: 5, speedy: 0, tanky: 0, spawnInterval: 60, waveDelay: 600 },
    { normal: 8, speedy: 0, tanky: 0, spawnInterval: 55, waveDelay: 600 },
    { normal: 5, speedy: 3, tanky: 0, spawnInterval: 55, waveDelay: 600 },
    { normal: 5, speedy: 5, tanky: 1, spawnInterval: 50, waveDelay: 600 },
    { normal: 0, speedy: 8, tanky: 2, spawnInterval: 50, waveDelay: 600 },
    { normal: 8, speedy: 5, tanky: 3, spawnInterval: 45, waveDelay: 600 },
    { normal: 5, speedy: 10, tanky: 3, spawnInterval: 45, waveDelay: 600 },
    { normal: 10, speedy: 8, tanky: 5, spawnInterval: 40, waveDelay: 600 },
    { normal: 0, speedy: 15, tanky: 5, spawnInterval: 40, waveDelay: 600 },
    { normal: 15, speedy: 15, tanky: 8, spawnInterval: 35, waveDelay: 600 },
];

const map3Waves = [
    { normal: 8, speedy: 0, tanky: 0, spawnInterval: 55, waveDelay: 600 },
    { normal: 10, speedy: 2, tanky: 0, spawnInterval: 55, waveDelay: 600 },
    { normal: 8, speedy: 5, tanky: 1, spawnInterval: 50, waveDelay: 600 },
    { normal: 5, speedy: 8, tanky: 2, spawnInterval: 50, waveDelay: 600 },
    { normal: 0, speedy: 10, tanky: 3, spawnInterval: 45, waveDelay: 600 },
    { normal: 10, speedy: 8, tanky: 4, spawnInterval: 45, waveDelay: 600 },
    { normal: 8, speedy: 12, tanky: 5, spawnInterval: 45, waveDelay: 600 },
    { normal: 12, speedy: 12, tanky: 6, spawnInterval: 40, waveDelay: 600 },
    { normal: 5, speedy: 18, tanky: 8, spawnInterval: 40, waveDelay: 600 },
    { normal: 20, speedy: 20, tanky: 10, spawnInterval: 35, waveDelay: 600 },
];

const map4Waves = [
    { normal: 8, speedy: 10, tanky: 1, spawnInterval: 55, waveDelay: 600 },
    { normal: 12, speedy: 8, tanky: 1, spawnInterval: 55, waveDelay: 600 },
    { normal: 10, speedy: 10, tanky: 2, spawnInterval: 50, waveDelay: 600 },
    { normal: 8, speedy: 12, tanky: 3, spawnInterval: 50, waveDelay: 600 },
    { normal: 5, speedy: 15, tanky: 5, spawnInterval: 45, waveDelay: 600 },
    { normal: 15, speedy: 18, tanky: 6, spawnInterval: 45, waveDelay: 600 },
    { normal: 10, speedy: 22, tanky: 8, spawnInterval: 45, waveDelay: 600 },
    { normal: 15, speedy: 25, tanky: 10, spawnInterval: 40, waveDelay: 600 },
    { normal: 10, speedy: 30, tanky: 12, spawnInterval: 30, waveDelay: 550 },
    { normal: 0, speedy: 50, tanky: 250, lava: 1000, spawnInterval: 20, waveDelay: 550 },
];

export const mapsWaves = [map1Waves, map2Waves, map3Waves, map4Waves];