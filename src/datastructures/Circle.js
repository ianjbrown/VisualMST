class Circle {
  constructor(x, y, num, colour) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.radius = 15;
    this.colour = colour;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.strokeStyle = "black";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(this.num, this.num < 10 ? this.x - 6 : this.x - 10, this.y + 6);
  }
  
  setColour(colour) {
    this.colour = colour;
  }
}
export default Circle;