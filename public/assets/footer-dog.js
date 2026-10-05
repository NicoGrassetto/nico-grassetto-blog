(() => {
  const track = document.querySelector('.footer-walk');
  const dog = track?.querySelector('.footer-malinois');
  if (!dog) return;

  const sprite = document.createElement('canvas');
  sprite.width = 512;
  sprite.height = 40;
  const context = sprite.getContext('2d');
  if (!context) return;

  const stride = [6, 3, 0, -3, -6, -3, 0, 4];
  const lift = [0, 0, 0, 0, 0, 2, 4, 3];
  const shape = (color, points) => {
    context.fillStyle = color;
    context.beginPath();
    points.forEach(([horizontal, vertical], index) => {
      context[index ? 'lineTo' : 'moveTo'](Math.round(horizontal), Math.round(vertical));
    });
    context.closePath();
    context.fill();
  };

  for (let frame = 0; frame < 8; frame++) {
    context.save();
    context.translate(frame * 64, 0);
    const bob = frame === 2 || frame === 6 ? -1 : 0;
    const tail = frame < 4 ? 0 : 1;

    shape('#534737', [[20, 17 + bob], [15, 18], [11, 23], [7, 27 + tail], [3, 27 + tail], [2, 24 + tail], [1, 28 + tail], [4, 31 + tail], [9, 30 + tail], [14, 25], [20, 21 + bob]]);
    shape('#9d794b', [[19, 18 + bob], [15, 21], [12, 26], [8, 29 + tail], [5, 29 + tail], [9, 27 + tail], [13, 21], [17, 18]]);

    for (const [hip, phase, front, near] of [[25, 6, false, false], [45, 4, true, false], [25, 2, false, true], [45, 0, true, true]]) {
      const step = (frame + phase) % 8;
      const foot = hip + stride[step];
      const ground = 40 - lift[step];
      const coat = near ? '#bd915b' : '#766047';
      const shade = near ? '#80603f' : '#514738';
      if (front) {
        const elbow = hip + Math.round(stride[step] * 0.25);
        shape(shade, [[hip - 2, 21 + bob], [hip + 3, 22 + bob], [elbow + 2, 30 + bob], [foot + 1, ground - 3], [foot + 4, ground - 2], [foot + 4, ground], [foot - 1, ground], [foot - 2, ground - 4], [elbow - 2, 30 + bob]]);
        shape(coat, [[hip, 23 + bob], [hip + 2, 24 + bob], [elbow + 1, 30 + bob], [foot + 1, ground - 2], [foot + 3, ground - 1], [foot, ground - 1], [elbow - 1, 30 + bob]]);
      } else {
        const hock = hip - 3 + Math.round(stride[step] * 0.5);
        shape(shade, [[hip - 5, 22 + bob], [hip + 2, 22 + bob], [hip + 5, 28 + bob], [hock + 2, 34 + bob], [foot + 1, ground - 3], [foot + 4, ground - 2], [foot + 4, ground], [foot - 1, ground], [hock - 1, 34 + bob], [hip - 2, 29 + bob]]);
        shape(coat, [[hip - 3, 24 + bob], [hip + 1, 24 + bob], [hip + 3, 28 + bob], [hock + 1, 34 + bob], [foot + 1, ground - 1], [foot - 1, ground - 1], [hock - 1, 33 + bob], [hip, 28 + bob]]);
      }
    }

    context.save();
    context.translate(0, bob);
    shape('#765b3e', [[17, 17], [23, 14], [37, 15], [44, 13], [49, 16], [51, 23], [47, 29], [40, 27], [32, 26], [27, 25], [23, 28], [18, 25], [16, 21]]);
    shape('#b78a51', [[18, 18], [24, 16], [37, 17], [44, 15], [48, 18], [49, 24], [46, 27], [39, 25], [31, 24], [25, 22], [21, 26], [18, 24]]);
    shape('#cfaa70', [[25, 20], [34, 21], [41, 19], [46, 18], [47, 23], [44, 26], [36, 24], [29, 23]]);
    shape('#665b45', [[19, 17], [25, 15], [36, 16], [43, 14], [44, 17], [36, 19], [29, 18], [24, 19]]);
    shape('#8b734c', [[22, 18], [28, 17], [34, 19], [39, 18], [38, 20], [31, 20], [27, 19], [23, 20]]);
    shape('#a57a49', [[19, 20], [23, 20], [26, 24], [23, 28], [20, 27], [21, 23]]);
    shape('#c19a62', [[42, 18], [45, 17], [48, 20], [47, 26], [45, 29], [43, 26]]);

    shape('#987548', [[41, 17], [45, 12], [47, 8], [51, 7], [57, 10], [57, 17], [52, 20], [49, 26], [45, 24]]);
    shape('#c39a60', [[44, 17], [48, 10], [52, 9], [55, 12], [53, 18], [49, 22], [48, 25], [46, 21]]);
    shape('#dcc18b', [[48, 17], [51, 14], [53, 15], [50, 21], [48, 23]]);

    shape('#514633', [[47, 10], [47, 2], [49, 1], [52, 8], [54, 9]]);
    shape('#9e8151', [[48, 4], [49, 4], [50, 8], [48, 8]]);
    shape('#322f28', [[52, 9], [54, 1], [55, 1], [58, 10]]);
    shape('#8e744c', [[54, 5], [55, 4], [56, 9], [54, 9]]);
    shape('#a17d4d', [[48, 9], [52, 7], [56, 9], [58, 12], [62, 13], [63, 16], [59, 18], [55, 19], [51, 17], [49, 13]]);
    shape('#4b4638', [[52, 10], [56, 10], [58, 12], [62, 13], [62, 17], [58, 19], [54, 18], [52, 15]]);
    shape('#292a26', [[56, 12], [59, 13], [63, 14], [63, 16], [61, 17], [57, 17], [55, 16]]);
    shape('#746348', [[51, 11], [53, 10], [55, 11], [54, 12], [52, 12]]);
    context.fillStyle = '#e3c990';
    context.fillRect(54, 11, 1, 1);
    context.fillStyle = '#191d1c';
    context.fillRect(55, 11, 1, 1);
    context.fillStyle = '#93816a';
    context.fillRect(61, 13, 2, 1);
    context.restore();
    context.restore();
  }

  dog.style.backgroundImage = `url("${sprite.toDataURL()}")`;
  new ResizeObserver(([entry]) => {
    track.style.setProperty('--walk-duration', `${(entry.contentRect.width + 128) / 50}s`);
  }).observe(track);
})();