(() => {
  const stage = document.querySelector('.contact-landmarks');
  if (!stage) return;

  const resolution = 96;
  const contactHeading = document.getElementById('contact-title');
  const landmarks = [
    {
      id: 'colosseum', label: 'the Colosseum in Rome', highlight: [0.94, 0.94, 0.94],
      language: 'it', heading: ['Qualcosa', 'in ', 'mente?']
    },
    {
      id: 'eiffel', label: 'the Eiffel Tower in Paris', highlight: [1, 0.42, 0],
      language: 'fr', heading: ['Quelque chose', 'en ', 't\u00eate ?']
    },
    {
      id: 'atomium', label: 'the Atomium in Brussels', highlight: [0.94, 0.94, 0.94],
      language: 'nl', heading: ['Iets', 'in ', 'gedachten?']
    },
    {
      id: 'big-ben', label: 'Big Ben in London', highlight: [0.94, 0.94, 0.94],
      language: 'en', heading: ['Something', 'on your ', 'mind?']
    },
    {
      id: 'brandenburg', label: 'the Brandenburg Gate in Berlin', highlight: [0.94, 0.94, 0.94],
      language: 'de', heading: ['Etwas', 'auf dem ', 'Herzen?']
    },
    {
      id: 'burj-khalifa', label: 'the Burj Khalifa in Dubai', highlight: [1, 0.42, 0],
      language: 'ar', heading: ['\u0647\u0644 \u0644\u062f\u064a\u0643 \u0634\u064a\u0621', '\u0641\u064a ', '\u0628\u0627\u0644\u0643\u061f']
    },
    {
      id: 'tokyo-tower', label: 'Tokyo Tower in Tokyo, Japan', highlight: [0.94, 0.94, 0.94],
      language: 'ja', heading: ['\u4f55\u304b', '', '\u304a\u8003\u3048\u3067\u3059\u304b\uff1f']
    }
  ];

  function updateLandmarkCopy(index) {
    const landmark = landmarks[index];
    if (!contactHeading) return;
    const emphasis = document.createElement('em');
    emphasis.textContent = landmark.heading[2];
    contactHeading.lang = landmark.language;
    contactHeading.dir = landmark.language === 'ar' ? 'rtl' : 'ltr';
    contactHeading.style.opacity = '1';
    contactHeading.replaceChildren(landmark.heading[0], document.createElement('br'), landmark.heading[1], emphasis);
  }

  const artworks = landmarks.map(({ id: landmark }) => {
    const image = document.createElement('canvas');
    image.width = resolution;
    image.height = resolution;
    const brush = image.getContext('2d');
    if (!brush) return null;
    brush.imageSmoothingEnabled = false;

    if (landmark === 'colosseum') {
      brush.translate(0, 24);
      brush.scale(1, 0.72);
      brush.fillStyle = '#98430b';
      brush.beginPath();
      brush.moveTo(10, 34);
      for (const [horizontal, vertical] of [[12, 25], [21, 20], [21, 17], [33, 14], [52, 14], [52, 17], [61, 17], [61, 21], [69, 21], [69, 26], [82, 28], [89, 34]]) {
        brush.lineTo(horizontal, vertical);
      }
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#111111';
      for (const horizontal of [25, 33, 41, 49]) brush.fillRect(horizontal, 20, 3, 5);

      brush.fillStyle = '#d45d0b';
      brush.beginPath();
      brush.moveTo(7, 34);
      brush.bezierCurveTo(7, 18, 89, 18, 89, 34);
      brush.lineTo(89, 72);
      brush.bezierCurveTo(89, 88, 7, 88, 7, 72);
      brush.closePath();
      brush.fill();

      brush.fillStyle = '#ff8428';
      brush.beginPath();
      brush.ellipse(48, 34, 41, 12, 0, 0, Math.PI * 2);
      brush.fill();
      brush.fillStyle = '#202020';
      brush.beginPath();
      brush.ellipse(48, 33, 34, 7, 0, 0, Math.PI * 2);
      brush.fill();
      brush.fillStyle = '#494949';
      brush.beginPath();
      brush.ellipse(48, 35, 29, 3.5, 0, 0, Math.PI * 2);
      brush.fill();
      brush.strokeStyle = '#a1a1a1';
      brush.lineWidth = 1;
      brush.beginPath();
      brush.ellipse(48, 33, 34, 7, 0, Math.PI, Math.PI * 2);
      brush.stroke();

      for (let tier = 0; tier < 3; tier++) {
        for (let arch = 0; arch < 15; arch++) {
          const angle = -Math.PI / 2 + (arch + 0.5) / 15 * Math.PI;
          const depth = Math.cos(angle);
          const horizontal = 48 + Math.sin(angle) * 39;
          const vertical = 39 + depth * 10 + tier * 11.5;
          const halfWidth = 0.6 + depth * 1.7;
          brush.fillStyle = '#080808';
          brush.beginPath();
          brush.moveTo(horizontal - halfWidth, vertical + 7);
          brush.lineTo(horizontal - halfWidth, vertical + halfWidth);
          brush.arc(horizontal, vertical + halfWidth, halfWidth, Math.PI, 0);
          brush.lineTo(horizontal + halfWidth, vertical + 7);
          brush.closePath();
          brush.fill();
          brush.fillStyle = '#ff963f';
          brush.fillRect(Math.round(horizontal + halfWidth), Math.round(vertical + 2), 1, 5);
        }
      }
      brush.strokeStyle = '#ff963f';
      for (let tier = 0; tier < 4; tier++) {
        brush.beginPath();
        brush.ellipse(48, 36 + tier * 11.5, 41, 11, 0, 0, Math.PI);
        brush.stroke();
      }
      brush.fillStyle = '#666666';
      brush.fillRect(18, 86, 60, 1);
      brush.resetTransform();
      brush.fillStyle = '#343b36';
      brush.fillRect(62, 89, 12, 1);
      brush.fillStyle = '#3c4948';
      brush.beginPath();
      brush.moveTo(66, 84);
      brush.lineTo(70, 83);
      brush.lineTo(73, 88);
      brush.lineTo(69, 89);
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#566357';
      brush.beginPath();
      brush.moveTo(63, 89);
      brush.lineTo(66, 84);
      brush.lineTo(69, 89);
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#202929';
      brush.beginPath();
      brush.moveTo(64, 89);
      brush.lineTo(66, 85);
      brush.lineTo(67, 89);
      brush.closePath();
      brush.fill();
      brush.strokeStyle = '#738177';
      brush.lineWidth = 0.7;
      brush.beginPath();
      brush.moveTo(66, 84);
      brush.lineTo(70, 83);
      brush.stroke();
    } else if (landmark === 'eiffel' || landmark === 'tokyo-tower') {
      const tokyoTower = landmark === 'tokyo-tower';
      if (tokyoTower) {
        brush.translate(48, 0);
        brush.scale(0.82, 1);
        brush.translate(-48, 0);
      }
      brush.fillStyle = tokyoTower ? '#ff6b00' : '#b6b6b6';
      brush.beginPath();
      brush.moveTo(48, 10);
      for (const [horizontal, vertical] of [[51, 32], [55, 48], [60, 61], [77, 84], [66, 84], [57, 70]]) {
        brush.lineTo(horizontal, vertical);
      }
      brush.quadraticCurveTo(48, 59, 39, 70);
      for (const [horizontal, vertical] of [[30, 84], [19, 84], [36, 61], [41, 48], [45, 32]]) {
        brush.lineTo(horizontal, vertical);
      }
      brush.closePath();
      brush.fill();

      if (tokyoTower) {
        brush.save();
        brush.clip();
        brush.fillStyle = '#e5e5e5';
        for (const vertical of [27, 42, 59, 74]) brush.fillRect(15, vertical, 66, 3);
        brush.restore();
      }
      brush.globalCompositeOperation = 'destination-out';
      brush.beginPath();
      brush.moveTo(48, 22);
      brush.lineTo(43, 46);
      brush.lineTo(53, 46);
      brush.closePath();
      brush.fill();
      brush.beginPath();
      brush.moveTo(44, 51);
      brush.lineTo(52, 51);
      brush.lineTo(57, 61);
      brush.lineTo(39, 61);
      brush.closePath();
      brush.fill();
      brush.globalCompositeOperation = 'source-over';

      brush.strokeStyle = tokyoTower ? '#ffab6b' : '#d9d9d9';
      brush.lineWidth = 1;
      for (const [top, bottom, upperWidth, lowerWidth] of [[22, 29, 1, 2], [29, 37, 2, 3], [37, 46, 3, 5], [51, 61, 4, 9]]) {
        brush.beginPath();
        brush.moveTo(48 - upperWidth, top);
        brush.lineTo(48 + lowerWidth, bottom);
        brush.moveTo(48 + upperWidth, top);
        brush.lineTo(48 - lowerWidth, bottom);
        brush.stroke();
      }
      for (const side of [-1, 1]) {
        brush.strokeStyle = tokyoTower ? '#8c3c12' : '#575757';
        for (const [top, bottom, upperWidth, lowerWidth] of [[69, 75, 15, 19], [75, 82, 19, 25]]) {
          brush.beginPath();
          brush.moveTo(48 + side * (upperWidth - 3), top);
          brush.lineTo(48 + side * lowerWidth, bottom);
          brush.moveTo(48 + side * upperWidth, top);
          brush.lineTo(48 + side * (lowerWidth - 4), bottom);
          brush.stroke();
        }
      }
      if (tokyoTower) {
        brush.fillStyle = '#ededed';
        brush.fillRect(47, 5, 2, 18);
        brush.fillRect(42, 27, 12, 4);
        brush.fillRect(34, 49, 28, 7);
        brush.fillRect(30, 63, 36, 2);
        brush.fillStyle = '#242424';
        brush.fillRect(44, 28, 8, 2);
        brush.fillRect(36, 51, 24, 3);
        brush.fillStyle = '#bfbfbf';
        for (const horizontal of [40, 45, 50, 55]) brush.fillRect(horizontal, 51, 1, 3);
        brush.fillStyle = '#ff6b00';
        for (const vertical of [7, 13, 19]) brush.fillRect(47, vertical, 2, 2);
        brush.fillRect(35, 55, 26, 2);
      } else {
        brush.fillStyle = '#ededed';
        brush.fillRect(47, 6, 2, 7);
        brush.fillRect(44, 13, 8, 2);
        brush.fillRect(37, 47, 22, 3);
        brush.fillRect(30, 63, 36, 3);
        brush.fillStyle = '#ff6b00';
        brush.fillRect(38, 48, 3, 1);
        brush.fillRect(56, 48, 3, 1);
        brush.fillRect(31, 64, 5, 1);
        brush.fillRect(61, 64, 4, 1);
      }
      brush.fillStyle = '#ededed';
      brush.fillRect(17, 84, 15, 2);
      brush.fillRect(64, 84, 15, 2);
      brush.fillStyle = '#666666';
      for (const horizontal of [14, 40, 66]) brush.fillRect(horizontal, 88, 16, 1);
      if (!tokyoTower) {
        brush.fillStyle = '#664735';
        brush.fillRect(58, 84, 1, 1);
        brush.fillRect(57, 85, 2, 1);
        brush.fillRect(57, 86, 4, 1);
        brush.fillRect(56, 87, 5, 1);
        brush.fillStyle = '#936c44';
        brush.fillRect(57, 86, 1, 1);
        brush.fillStyle = '#493021';
        brush.fillRect(56, 88, 5, 1);
      }
    } else if (landmark === 'atomium') {
      const spheres = [[48, 13], [24, 30], [72, 28], [48, 45], [18, 57], [78, 55], [34, 71], [63, 70], [48, 83]];
      const links = [[0, 1], [0, 2], [0, 4], [1, 6], [1, 5], [2, 5], [2, 7], [4, 6], [4, 7], [5, 8], [6, 8], [7, 8]];
      for (const index of [0, 1, 2, 4, 5, 6, 7, 8]) links.push([3, index]);
      brush.beginPath();
      for (const [first, second] of links) {
        brush.moveTo(...spheres[first]);
        brush.lineTo(...spheres[second]);
      }
      brush.moveTo(34, 71);
      brush.lineTo(27, 88);
      brush.moveTo(63, 70);
      brush.lineTo(71, 88);
      brush.moveTo(48, 83);
      brush.lineTo(48, 89);
      brush.strokeStyle = '#575757';
      brush.lineWidth = 3;
      brush.stroke();
      brush.strokeStyle = '#bfbfbf';
      brush.lineWidth = 1;
      brush.stroke();
      for (const [index, [horizontal, vertical]] of spheres.entries()) {
        const radius = index === 3 ? 7.5 : 6.5;
        brush.fillStyle = '#666666';
        brush.beginPath();
        brush.arc(horizontal, vertical, radius, 0, Math.PI * 2);
        brush.fill();
        brush.fillStyle = '#c8c8c8';
        brush.beginPath();
        brush.arc(horizontal - 1, vertical - 1, radius - 1.5, 0, Math.PI * 2);
        brush.fill();
        brush.fillStyle = '#ffffff';
        brush.fillRect(horizontal - 3, vertical - 4, 3, 2);
        brush.fillStyle = '#ff8a32';
        brush.fillRect(Math.round(horizontal + radius - 2), vertical + 1, 1, 3);
      }
      brush.fillStyle = '#666666';
      brush.fillRect(22, 90, 54, 1);
      brush.fillStyle = '#664735';
      brush.fillRect(75, 87, 1, 1);
      brush.fillRect(74, 88, 2, 1);
      brush.fillRect(74, 89, 4, 1);
      brush.fillRect(73, 90, 5, 1);
      brush.fillStyle = '#936c44';
      brush.fillRect(74, 89, 1, 1);
      brush.fillStyle = '#493021';
      brush.fillRect(73, 91, 5, 1);
    } else if (landmark === 'big-ben') {
      brush.save();
      brush.transform(12 / 21, -6 / 21, 0, 1, 57, 0);
      brush.fillStyle = '#886245';
      brush.fillRect(0, 32, 21, 56);
      brush.fillStyle = '#aa8157';
      brush.fillRect(0, 32, 2, 56);
      brush.fillRect(18, 32, 2, 56);
      for (const [vertical, height] of [[32, 3], [48, 3], [55, 2], [70, 2], [84, 2]]) {
        brush.fillStyle = '#ba9366';
        brush.fillRect(0, vertical, 21, height);
        brush.fillStyle = '#604831';
        brush.fillRect(0, vertical + height, 21, 1);
      }
      for (const vertical of [58, 73]) {
        for (const horizontal of [4, 9, 14]) {
          brush.fillStyle = '#473c32';
          brush.fillRect(horizontal, vertical + 1, 3, 9);
          brush.fillRect(horizontal + 1, vertical, 1, 1);
          brush.fillStyle = '#b58d61';
          brush.fillRect(horizontal, vertical + 3, 1, 7);
        }
      }
      brush.fillStyle = '#55402f';
      brush.fillRect(20, 32, 1, 56);
      brush.fillStyle = '#3c362c';
      brush.fillRect(2, 33, 17, 16);
      brush.fillStyle = '#c3bca7';
      brush.beginPath();
      brush.arc(10.5, 41, 6.8, 0, Math.PI * 2);
      brush.fill();
      brush.strokeStyle = '#b28b50';
      brush.lineWidth = 1;
      brush.stroke();
      brush.strokeStyle = '#292b27';
      for (let tick = 0; tick < 12; tick++) {
        const angle = tick / 12 * Math.PI * 2;
        brush.beginPath();
        brush.moveTo(10.5 + Math.cos(angle) * 5.1, 41 + Math.sin(angle) * 5.1);
        brush.lineTo(10.5 + Math.cos(angle) * 6.1, 41 + Math.sin(angle) * 6.1);
        brush.stroke();
      }
      brush.beginPath();
      brush.moveTo(7, 38);
      brush.lineTo(10.5, 41);
      brush.lineTo(13, 36);
      brush.stroke();
      brush.restore();

      brush.fillStyle = '#c5935e';
      brush.fillRect(36, 36, 21, 52);
      brush.fillStyle = '#e0b67d';
      brush.fillRect(35, 32, 23, 3);
      brush.fillRect(35, 48, 23, 3);
      brush.fillStyle = '#313b39';
      brush.beginPath();
      brush.moveTo(49, 12);
      for (const [horizontal, vertical] of [[57, 8], [60, 14], [65, 20], [70, 24], [58, 30], [55, 25], [51, 18]]) {
        brush.lineTo(horizontal, vertical);
      }
      brush.closePath();
      brush.fill();
      brush.strokeStyle = '#867959';
      brush.lineWidth = 1;
      for (const [nearHorizontal, nearVertical, farHorizontal, farVertical] of [[51, 18, 60, 14], [55, 25, 65, 20], [58, 30, 70, 24]]) {
        brush.beginPath();
        brush.moveTo(nearHorizontal, nearVertical);
        brush.lineTo(farHorizontal, farVertical);
        brush.stroke();
      }
      brush.fillStyle = '#a19471';
      brush.beginPath();
      brush.moveTo(43, 12);
      brush.lineTo(51, 8);
      brush.lineTo(57, 8);
      brush.lineTo(50, 12);
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#a88153';
      brush.fillRect(68, 18, 3, 8);
      brush.fillRect(69, 15, 1, 3);
      brush.fillStyle = '#aaa8a3';
      brush.beginPath();
      brush.moveTo(35, 30);
      for (const [horizontal, vertical] of [[38, 25], [42, 18], [44, 12], [49, 12], [51, 18], [55, 25], [58, 30]]) brush.lineTo(horizontal, vertical);
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#484c4b';
      brush.beginPath();
      brush.moveTo(46, 12);
      brush.lineTo(48, 12);
      brush.lineTo(54, 29);
      brush.lineTo(39, 29);
      brush.closePath();
      brush.fill();
      brush.fillStyle = '#d5b583';
      brush.fillRect(46, 5, 1, 8);
      brush.fillRect(44, 7, 5, 1);
      brush.fillRect(43, 12, 7, 2);
      brush.fillRect(40, 20, 13, 1);
      brush.fillRect(38, 26, 17, 1);
      brush.fillRect(34, 30, 25, 2);
      for (const horizontal of [34, 56]) {
        brush.fillRect(horizontal, 24, 3, 8);
        brush.fillRect(horizontal + 1, 21, 1, 3);
      }
      brush.fillStyle = '#303432';
      for (const horizontal of [40, 44, 48, 52]) brush.fillRect(horizontal, 28, 2, 2);
      brush.fillStyle = '#e3bb83';
      brush.fillRect(36, 35, 2, 52);
      brush.fillRect(55, 35, 2, 52);
      for (const vertical of [55, 70, 84]) brush.fillRect(36, vertical, 21, 2);
      brush.fillStyle = '#59493a';
      for (const vertical of [58, 73]) {
        for (const horizontal of [40, 45, 50]) {
          brush.fillRect(horizontal, vertical + 1, 3, 9);
          brush.fillRect(horizontal + 1, vertical, 1, 1);
        }
      }
      brush.fillStyle = '#e4b67b';
      for (const horizontal of [40, 45, 50]) {
        brush.fillRect(horizontal, 60, 1, 7);
        brush.fillRect(horizontal, 75, 1, 7);
      }
      brush.fillStyle = '#393a31';
      brush.fillRect(38, 33, 17, 16);
      brush.fillStyle = '#f0ece2';
      brush.beginPath();
      brush.arc(46.5, 41, 6.8, 0, Math.PI * 2);
      brush.fill();
      brush.strokeStyle = '#cfaa66';
      brush.lineWidth = 1;
      brush.stroke();
      brush.strokeStyle = '#2c3030';
      brush.lineWidth = 1;
      for (let tick = 0; tick < 12; tick++) {
        const angle = tick / 12 * Math.PI * 2;
        brush.beginPath();
        brush.moveTo(46.5 + Math.cos(angle) * 5.1, 41 + Math.sin(angle) * 5.1);
        brush.lineTo(46.5 + Math.cos(angle) * 6.1, 41 + Math.sin(angle) * 6.1);
        brush.stroke();
      }
      brush.beginPath();
      brush.moveTo(43, 38);
      brush.lineTo(46.5, 41);
      brush.lineTo(49, 36);
      brush.stroke();
      brush.fillStyle = '#8d7152';
      brush.beginPath();
      brush.moveTo(59, 87);
      brush.lineTo(71, 81);
      brush.lineTo(71, 84);
      brush.lineTo(59, 90);
      brush.closePath();
      brush.fill();
      brush.strokeStyle = '#ba9a70';
      brush.lineWidth = 1;
      brush.beginPath();
      brush.moveTo(59, 87);
      brush.lineTo(71, 81);
      brush.stroke();
      brush.fillStyle = '#d6bb97';
      brush.fillRect(34, 87, 25, 3);
      brush.fillStyle = '#666666';
      brush.fillRect(29, 91, 47, 1);
      brush.fillStyle = '#2d3030';
      brush.fillRect(27, 84, 2, 1);
      brush.fillRect(26, 85, 4, 2);
      brush.fillRect(27, 87, 3, 2);
      brush.fillRect(27, 89, 1, 2);
      brush.fillRect(29, 89, 1, 2);
      brush.fillRect(30, 88, 1, 1);
      brush.fillStyle = '#121719';
      brush.fillRect(27, 85, 2, 1);
      brush.fillStyle = '#444844';
      brush.fillRect(27, 84, 1, 1);
      brush.fillStyle = '#4b4c45';
      brush.fillRect(31, 88, 1, 1);
    } else if (landmark === 'brandenburg') {
      brush.translate(0, 24);
      brush.scale(1, 0.72);
      brush.fillStyle = '#666666';
      brush.fillRect(7, 88, 82, 2);
      brush.fillStyle = '#b3b3b3';
      brush.fillRect(11, 84, 74, 4);
      brush.fillRect(9, 62, 8, 22);
      brush.fillRect(79, 62, 8, 22);
      for (const horizontal of [19, 30, 41, 54, 65, 76]) {
        brush.fillStyle = '#a5a5a5';
        brush.fillRect(horizontal - 2, 51, 5, 29);
        brush.fillStyle = '#e1e1e1';
        brush.fillRect(horizontal - 2, 51, 1, 29);
        brush.fillRect(horizontal - 4, 48, 9, 4);
        brush.fillRect(horizontal - 3, 80, 7, 4);
      }
      brush.fillStyle = '#c8c8c8';
      brush.fillRect(14, 39, 68, 9);
      brush.fillStyle = '#f0f0f0';
      brush.fillRect(11, 36, 74, 3);
      brush.fillRect(14, 47, 68, 2);
      brush.fillStyle = '#777777';
      for (let horizontal = 20; horizontal < 79; horizontal += 6) brush.fillRect(horizontal, 42, 3, 2);
      brush.fillStyle = '#b3b3b3';
      brush.fillRect(25, 32, 46, 4);
      brush.fillRect(32, 30, 32, 3);
      brush.fillStyle = '#ff6b00';
      for (const horizontal of [35, 41, 50, 56]) {
        brush.beginPath();
        brush.moveTo(horizontal, 28);
        brush.lineTo(horizontal - 1, 23);
        brush.lineTo(horizontal + 2, 21);
        brush.lineTo(horizontal + 3, 25);
        brush.lineTo(horizontal + 5, 28);
        brush.closePath();
        brush.fill();
        brush.fillRect(horizontal + 1, 28, 1, 3);
      }
      brush.fillRect(54, 14, 1, 12);
      brush.beginPath();
      brush.arc(54.5, 12, 2, 0, Math.PI * 2);
      brush.fill();
      brush.fillStyle = '#dddddd';
      brush.fillRect(46, 21, 4, 7);
      brush.beginPath();
      brush.arc(48, 18, 2, 0, Math.PI * 2);
      brush.fill();
      brush.resetTransform();
      brush.lineWidth = 0.8;
      brush.lineJoin = 'round';
      brush.strokeStyle = '#777166';
      brush.beginPath();
      brush.moveTo(10.5, 79.5);
      brush.bezierCurveTo(15.5, 75.5, 10.5, 82.5, 15.5, 78.5);
      brush.lineTo(14.5, 80.5);
      brush.stroke();
      brush.strokeStyle = '#687c7e';
      brush.beginPath();
      brush.moveTo(80.5, 78.5);
      brush.lineTo(83.5, 77.5);
      brush.lineTo(81.5, 80.5);
      brush.lineTo(85.5, 79.5);
      brush.moveTo(82.5, 81.5);
      brush.lineTo(84.5, 81.5);
      brush.stroke();
    } else if (landmark === 'burj-khalifa') {
      brush.fillStyle = '#b8c3c6';
      brush.beginPath();
      brush.moveTo(48, 5);
      for (const [horizontal, vertical] of [[49, 5], [49, 19], [50, 19], [50, 26], [52, 26], [52, 34], [54, 34], [54, 43], [56, 43], [56, 52], [58, 52], [58, 63], [60, 63], [60, 73], [63, 73], [63, 87], [34, 87], [34, 78], [36, 78], [36, 67], [38, 67], [38, 56], [40, 56], [40, 46], [42, 46], [42, 36], [44, 36], [44, 28], [46, 28], [46, 21], [47, 21], [47, 13], [48, 13]]) {
        brush.lineTo(horizontal, vertical);
      }
      brush.closePath();
      brush.fill();
      brush.save();
      brush.clip();
      brush.fillStyle = '#687b80';
      brush.fillRect(34, 22, 11, 65);
      brush.fillStyle = '#87989d';
      brush.fillRect(51, 26, 12, 61);
      brush.fillStyle = '#dce3e3';
      brush.fillRect(45, 22, 5, 65);
      brush.fillStyle = '#687a80';
      for (let vertical = 29; vertical < 87; vertical += 3) brush.fillRect(33, vertical, 31, 1);
      brush.fillStyle = '#cad6d8';
      for (const [horizontal, vertical] of [[36, 78], [38, 67], [40, 56], [42, 46], [44, 36], [51, 26], [53, 34], [55, 43], [57, 52], [59, 63], [61, 73]]) {
        brush.fillRect(horizontal, vertical, 1, 87 - vertical);
      }
      brush.fillStyle = '#eff2ed';
      brush.fillRect(47, 5, 1, 82);
      brush.fillStyle = '#d6b487';
      for (const vertical of [48, 69, 82]) brush.fillRect(52, vertical, 1, 1);
      brush.restore();
      brush.fillStyle = '#aebbbc';
      brush.fillRect(30, 87, 38, 2);
      brush.fillStyle = '#666666';
      brush.fillRect(24, 91, 49, 1);
    }

    const pixels = brush.getImageData(0, 0, resolution, resolution).data;
    const points = [];
    for (let row = 0; row < resolution; row++) {
      for (let column = 0; column < resolution; column++) {
        const offset = (row * resolution + column) * 4;
        if (pixels[offset + 3] < 128) continue;
        points.push({
          horizontal: (column + 0.5) / resolution * 2 - 1,
          vertical: 1 - (row + 0.5) / resolution * 2,
          color: [pixels[offset] / 255, pixels[offset + 1] / 255, pixels[offset + 2] / 255]
        });
      }
    }
    return { image, points };
  });
  if (artworks.some(artwork => !artwork || !artwork.points.length)) return;

  const fallback = stage.querySelector('.landmarks-fallback');
  fallback.width = resolution;
  fallback.height = resolution;
  fallback.getContext('2d').drawImage(artworks[0].image, 0, 0);
  stage.dataset.state = 'fallback';
  stage.dataset.landmark = landmarks[0].id;
  stage.setAttribute('aria-label', 'Pixel art of the Colosseum in Rome');
  updateLandmarkCopy(0);
  if (!window.THREE) return;

  const THREE = window.THREE;
  const canvas = stage.querySelector('.landmarks-canvas');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
  } catch {
    return;
  }
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1.2, 1.2, 1.2, -1.2, 0.1, 10);
  camera.position.z = 3;
  const count = Math.max(...artworks.map(artwork => artwork.points.length));
  const frames = artworks.map(artwork => {
    const positions = [];
    const colors = [];
    for (let index = 0; index < count; index++) {
      const point = artwork.points[Math.floor(index * artwork.points.length / count)];
      positions.push(point.horizontal, point.vertical, 0);
      colors.push(...point.color);
    }
    return {
      positions: new THREE.Float32BufferAttribute(positions, 3),
      colors: new THREE.Float32BufferAttribute(colors, 3)
    };
  });
  const phases = [];
  for (let index = 0; index < count; index++) {
    phases.push((index * 0.61803398875 % 1) * Math.PI * 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      elapsed: { value: 0 },
      viewport: { value: new THREE.Vector2() },
      pixelPitch: { value: 3 },
      baseHighlight: { value: new THREE.Vector3() },
      targetHighlight: { value: new THREE.Vector3() }
    },
    vertexShader: `
      attribute vec3 destination;
      attribute vec3 baseColor;
      attribute vec3 targetColor;
      attribute float phase;
      uniform float elapsed;
      uniform vec2 viewport;
      uniform float pixelPitch;
      uniform vec3 baseHighlight;
      uniform vec3 targetHighlight;
      varying vec3 ink;
      varying float opacity;

      void main() {
        float cycle = mod(elapsed, 9.0);
        float morph = smoothstep(6.0, 9.0, cycle);
        float scatter = sin(morph * 3.14159265);
        vec3 point = mix(position, destination, morph);
        point.x += sin(phase + elapsed * 0.6) * scatter * 0.1;
        point.y += cos(phase * 1.7 + elapsed * 0.7) * scatter * 0.1;
        float pulse = pow(max(0.0, sin(elapsed * 1.6 - point.y * 5.0 + phase * 0.2)), 16.0);
        vec3 highlight = mix(baseHighlight, targetHighlight, morph);
        ink = mix(mix(baseColor, targetColor, morph), highlight, pulse * 0.38);
        opacity = (0.86 + pulse * 0.14) * (1.0 - scatter * 0.18);

        vec4 projected = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
        vec2 screen = (projected.xy / projected.w * 0.5 + 0.5) * viewport;
        screen = (floor(screen / pixelPitch) + 0.5) * pixelPitch;
        projected.xy = (screen / viewport * 2.0 - 1.0) * projected.w;
        gl_Position = projected;
        gl_PointSize = pixelPitch;
      }
    `,
    fragmentShader: `
      varying vec3 ink;
      varying float opacity;

      void main() {
        gl_FragColor = vec4(ink, opacity);
      }
    `,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  scene.add(new THREE.Points(geometry, material));

  let visible = false;
  let contextLost = false;
  let previousTime = 0;
  let activeLandmark = -1;
  let activeHeading = -1;

  function renderFrame(timestamp) {
    if (contextLost) return;
    if (previousTime && timestamp - previousTime < 1000 / 30) return;
    const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.1) : 0;
    previousTime = timestamp;
    if (!motionPreference.matches && visible && !document.hidden) material.uniforms.elapsed.value += delta;
    const index = Math.floor(material.uniforms.elapsed.value / 9) % frames.length;
    if (index !== activeLandmark) {
      const next = (index + 1) % frames.length;
      geometry.setAttribute('position', frames[index].positions);
      geometry.setAttribute('destination', frames[next].positions);
      geometry.setAttribute('baseColor', frames[index].colors);
      geometry.setAttribute('targetColor', frames[next].colors);
      geometry.computeBoundingSphere();
      material.uniforms.baseHighlight.value.fromArray(landmarks[index].highlight);
      material.uniforms.targetHighlight.value.fromArray(landmarks[next].highlight);
      stage.dataset.landmark = landmarks[index].id;
      stage.dataset.nextLandmark = landmarks[next].id;
      activeLandmark = index;
    }
    const morph = THREE.MathUtils.smoothstep(material.uniforms.elapsed.value % 9, 6, 9);
    const headingIndex = (index + (morph >= 0.5 ? 1 : 0)) % landmarks.length;
    if (headingIndex !== activeHeading) {
      updateLandmarkCopy(headingIndex);
      activeHeading = headingIndex;
    }
    if (contactHeading) contactHeading.style.opacity = String(1 - Math.sin(morph * Math.PI));
    renderer.render(scene, camera);
  }

  function updateAnimation() {
    previousTime = 0;
    const running = !motionPreference.matches && visible && !document.hidden && !contextLost;
    renderer.setAnimationLoop(running ? renderFrame : null);
    stage.dataset.animating = String(running);
    stage.setAttribute('aria-label', motionPreference.matches || contextLost
      ? 'Pixel art of the Colosseum in Rome'
      : `Animated pixel art cycling through ${landmarks.map(landmark => landmark.label).join(', ')}`);
    renderFrame(performance.now());
  }

  function resize() {
    const width = Math.max(1, Math.round(stage.clientWidth));
    const height = Math.max(1, Math.round(stage.clientHeight));
    const pixelPitch = Math.max(1, Math.floor(Math.min(width, height) / (resolution + 6)));
    renderer.setSize(width, height, false);
    camera.left = -width / (resolution * pixelPitch);
    camera.right = -camera.left;
    camera.top = height / (resolution * pixelPitch);
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    material.uniforms.viewport.value.set(width, height);
    material.uniforms.pixelPitch.value = pixelPitch;
    previousTime = 0;
    renderFrame(performance.now());
  }

  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateAnimation();
  }, { threshold: 0 }).observe(stage);
  document.addEventListener('visibilitychange', updateAnimation);
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) material.uniforms.elapsed.value = 0;
    updateAnimation();
  });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    contextLost = true;
    stage.dataset.state = 'fallback';
    stage.dataset.landmark = landmarks[0].id;
    activeLandmark = -1;
    activeHeading = -1;
    updateLandmarkCopy(0);
    updateAnimation();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    resize();
    stage.dataset.state = 'ready';
    updateAnimation();
  });
  window.addEventListener('pagehide', () => {
    renderer.setAnimationLoop(null);
    stage.dataset.animating = 'false';
  });
  window.addEventListener('pageshow', updateAnimation);

  resize();
  stage.dataset.state = 'ready';
  updateAnimation();
})();