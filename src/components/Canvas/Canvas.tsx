import { useEffect } from "react";

class Rectangle {
  public x;
  public y;
  public w;
  public h;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx: CanvasRenderingContext2D, color: string = "red") {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  animate(w: number) {
    this.x += 2;
    if (this.x + this.w > w) {
      this.x = 0;
    }
  }
}

export default function Canvas() {
  const W = 400;
  const H = 400;
  let x = W / 2;
  const r = new Rectangle(x, H / 2, 20, 20);

  useEffect(() => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (canvas && ctx) {
      canvas.width = W;
      canvas.height = H;

      // ctx.fillStyle = "red";
      // ctx.fillRect(10, 10, 10, 10);

      function animate() {
        ctx?.clearRect(0, 0, W, H);
        r.draw(ctx!, "yellow");
        r.animate(W);
        requestAnimationFrame(animate);
      }

      animate();
    }
  });

  return (
    <div>
      <h1>Canvas</h1>
      {/* <br /> */}
      <canvas id="myCanvas" style={{ border: "solid black 1px" }}></canvas>
      <br />
      <p>This is a simple working canvas example with animation.</p>
    </div>
  );
}
