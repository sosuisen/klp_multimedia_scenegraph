import * as PIXI from 'pixi.js';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

let app = new PIXI.Application({ antialias: true, width: 640, height: 640 });
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
sun.position.set(320, 320);
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
  // 月の公転周期を1とした時の地球の公転周期
  duration: 13.4, repeat: -1, ease: 'none', 
  pixi: {
    rotation: 360,
  },
});
earth.pivot.x = 250;
sun.addChild(earth);

/**
 * 月
 */
const moon = new PIXI.Graphics();
const moonRadius = 5;
moon.lineStyle(0);
moon.beginFill(0xffffff, 1);
moon.drawCircle(0, 0, moonRadius);
moon.endFill();
tl.to(moon, {
  duration: 1, repeat: -1, ease: 'none',
  pixi: {
    rotation: 360,
  },
},
'<'); // < で直前のアニメーションと同時に開始
moon.pivot.x = 40;
earth.addChild(moon);

/**
 * 金星
 */
const venus = new PIXI.Graphics();
const venusRadius = 19;
venus.lineStyle(10, 0xfffff0, 0.5);
venus.beginFill(0xffffc0, 1);
venus.drawCircle(0, 0, venusRadius);
venus.endFill();
tl.to(venus, {
  duration: 8.3, repeat: -1, ease: 'none', pixi: {
    angle: 360
  },
},
'<');
venus.pivot.x = 180;

sun.addChild(venus);

/**
 * UI
 */
document.getElementById('pauseBtn').addEventListener('click', () => tl.pause());
document.getElementById('resumeBtn').addEventListener('click', () => tl.resume());
