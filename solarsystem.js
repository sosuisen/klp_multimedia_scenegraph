let app = new PIXI.Application({ antialias: true, width: 640, height: 640 });
gsap.registerPlugin(PixiPlugin);
app.ticker.stop();
gsap.ticker.add(time => {
  app.ticker.update();
});

document.body.appendChild(app.view);

const tl = gsap.timeline()

/**
 * 太陽
 */
const sun = new PIXI.Graphics();
const sunRadius = 40;
sun.lineStyle(7, 0xffb000, 0.5);
sun.beginFill(0xffff90, 1);
sun.drawCircle(0, 0, sunRadius);
sun.endFill();
sun.x = 320;
sun.y = 320;
tl.to(sun, {
    // 月の公転周期を1としたときの地球の公転周期
    duration: 13.4, repeat: -1, ease: 'none', pixi: {
      angle: 360
    }
  });
app.stage.addChild(sun);


/**
 * 地球
 */
const earth = new PIXI.Graphics();
const earthRadius = 20;
earth.lineStyle(10, 0xf0ffff, 0.5);
earth.beginFill(0x90c0ff, 1);
earth.drawCircle(0, 0, earthRadius);
earth.endFill();
tl.to(earth, {
    duration: 1, repeat: -1, ease: 'none', pixi: {
      angle: 360
    },
  },
  '<'); // < で直前のアニメーションと同時に開始
earth.x = 230;
sun.addChild(earth);

/**
 * 月
 */
const moon = new PIXI.Graphics();
const moonRadius = 10;
moon.lineStyle(0);
moon.beginFill(0xffffff, 1);
moon.drawCircle(0, 0, moonRadius);
moon.endFill();
moon.x = 50;
earth.addChild(moon);

/**
 * UI
 */
document.getElementById('pauseBtn').addEventListener('click', () => tl.pause());
document.getElementById('resumeBtn').addEventListener('click', () => tl.resume());
