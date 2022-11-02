// const p5 = require('node-p5');
// const math = require('mathjs');

let focal = 20

class cube {
    constructor(size, length, pos){
      
      this.points = []

      this.pos = pos

      this.size = size
      
      this.verts = [
    [0*size, 0*size, 0*length],
    [1*size, 0*size, 0*length],
    [1*size, 1*size, 0*length],
    [0*size, 1*size, 0*length],
    [0*size, 0*size, 1*length],
    [1*size, 0*size, 1*length],
    [1*size, 1*size, 1*length],
    [0*size, 1*size, 1*length],
  ]
      
    this.edges = [
    [0,1],
    [0,3],
    [0,4],
    [1,5],
    [1,2],
    [2,6],
    [2,3],
    [3,7],
    [7,6],
    [7,4],
    [4,5],
    [5,6]
  ]  
      this.points = []
      this.theta = 6
  }
    
    render(c, p5) {
      p5.stroke(c || 255)
       p5.strokeWeight(4);
      
//       let rotationMatrixX = math.matrix([
//         [1, 0, 0],
//     [0, cos(this.theta), -(sin(this.theta))],
//     [0, sin(this.theta), cos(this.theta)]
//   ])
      this.verts.forEach((vert, i)=> {
      let [x,y,z] = vert
    //   rotate3D(vert, this.theta)
    let [w,h] = [this.pos.x, this.pos.y]
      this.points.push([project(x+w,z), project(y+h,z)])
        p5.stroke(255)
      p5.point([project(x + w,z), project(y + h,z)])
      // line(0, 0, project((x) + 150,z), project((y) + 150,z));
    })
    
    this.edges.forEach((edge, i)=> {
      // stroke(225)
      p5.line(this.points[edge[0]][0], this.points[edge[0]][1], this.points[edge[1]][0], this.points[edge[1]][1])
    })
    }
  }

function project(X, Z){
    return ((focal * X) / (focal + Z))
}

module.exports = {cube}