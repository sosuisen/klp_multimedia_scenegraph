import * as PIXI from 'pixi.js';

let app = new PIXI.Application({ antialias: true, width: 640, height: 640 });

document.body.appendChild(app.view);

// コンテナ作成。addChild()で追加した子をグループ化する。
const container = new PIXI.Container();

// box生成関数
const createBox = (w, h, color) => {
  const box = new PIXI.Graphics();
  box.beginFill(color, 0.9);
  box.drawRoundedRect(0, 0, w, h, 7);
  box.endFill();
  box.pivot.set(w / 2, h / 2); // Graphicsにanchorはない。pivotのみ

  // マウスに反応するようにする。
  box.interactive = true;
  box.cursor = 'pointer';
  box.on('pointerdown', sendToBottom); 
  return box;
};

const sendToBottom = event => {
  // クリックされたboxをchildren配列から削除
  container.children = container.children.filter(box => box !== event.target);
  // クリックされたboxをchildren配列の先頭へ追加
  container.children.unshift(event.target);
};

const box1 = createBox(100, 100, 0xff6060);
box1.position.set(100, 100);
container.addChild(box1);

const box2 = createBox(100, 100, 0x60ff60);
box2.position.set(150, 150);
container.addChild(box2);

const box3 = createBox(100, 100, 0x6060ff);
box3.position.set(200, 200);
container.addChild(box3);

app.stage.addChild(container);
