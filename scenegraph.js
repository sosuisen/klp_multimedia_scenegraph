let app = new PIXI.Application({ antialias: true, width: 640, height: 640 });
gsap.registerPlugin(PixiPlugin);
app.ticker.stop();
gsap.ticker.add(time => {
  app.ticker.update();
});

document.body.appendChild(app.view);

// タイムライン
const tl = gsap.timeline()

// コンテナ作成。addChild()で追加した子をグループ化する。
const container = new PIXI.Container();

// box生成関数
const createBox = (w, h, color) => {
  const box = new PIXI.Graphics();
  box.beginFill(color);
  box.drawRoundedRect(0, 0, w, h, 7);
  box.endFill();
  box.pivot.set(w / 2, h / 2); // Graphicsにanchorはない。pivotのみ
  return box;
};

/**
 * containerにbox1とbox2を追加
 */
const box1 = createBox(50, 50, 0xff0000);
// position.set()は box1.x = 320; box1.y = 100; でもよい。
box1.position.set(150, 100);
container.addChild(box1);

const box2 = createBox(50, 50, 0x00ff00);
box2.position.set(350, 100);
container.addChild(box2);

// container に動きを与えると、box1とbox2に反映される
tl.to(container, {
  x: 100, duration: 1, repeat: -1, ease: 'none', yoyo: true
});

/**
 * box1にbox3とbox4を追加
 */
const box3 = createBox(50, 50, 0xffc000);
// box1からの相対座標。box1のpivot前の座標が基準のため注意
box3.position.set(-25, 150);
box1.addChild(box3);

const box4 = createBox(50, 50, 0xffff00);
box4.position.set(75, 150);
tl.to(box4, {
  angle: 360, duration: 1, repeat: -1, ease: 'none', yoyo: true,
}, '<');
box1.addChild(box4);

// box1に動きを与えると、box3とbox4にのみ反映される
tl.to(box1, {
  y: 140, duration: 0.5, repeat: -1, ease: 'none', yoyo: true
}, '<');

// containerをstageに追加
app.stage.addChild(container);

/**
 * UI
 */
document.getElementById('pauseBtn').addEventListener('click', () => tl.pause());
document.getElementById('resumeBtn').addEventListener('click', () => tl.resume());
