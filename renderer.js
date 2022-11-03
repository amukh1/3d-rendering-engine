// const p5 = require('node-p5');
const math = require('mathjs');
const {cos,sin} = Math

let focal = 20

class cube {
    constructor(size, length, pos){
      
      this.points = []

      this.pos = pos

      this.size = size
      // length = size
      
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

  this.faces = [
    [1,2,6,5, 'pink'],
    [2,3,7,6, 'yellow'],
    [0,1,2,3, 'red'], // 4 verticies and how much shadow should be on it
    [0,3,7,4, 'green'],
    [0,1,5,4, 'blue'],
  ]

      this.points = []
      this.theta = 30
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
      let [x,y,z] = rotate3D(vert, this.theta)
      // p5.point(rotate3D(vert, this.theta)[0], rotate3D(vert, this.theta)[1])
      console.log(rotate3D(vert, this.theta))
    let [w,h] = [this.pos.x, this.pos.y]
      this.points.push([project(x+w,z), project(y+h,z)])
      //   p5.stroke(255)
      // p5.point([project(x + w,z), project(y + h,z)])
      // line(0, 0, project((x) + 150,z), project((y) + 150,z));
    })
    
    this.edges.forEach((edge, i)=> {
      // stroke(225)
      p5.line(this.points[edge[0]][0], this.points[edge[0]][1], this.points[edge[1]][0], this.points[edge[1]][1])
    })
if(this.pos.wireframe !== true){
    this.faces.forEach((face, i)=> {
      // console.log(i)
      p5.fill(255 / 4 * i)
      // p5.square(this.points[face[0]][0], this.points[face[0]][1], this.points[face[1]][0] - this.points[face[0]][0])
      // p5.square(Math.random() * 100, Math.random() * 100, 100)
      // use p5.quad instead of p5.square
      p5.quad(this.points[face[0]][0], this.points[face[0]][1], this.points[face[1]][0], this.points[face[1]][1], this.points[face[2]][0], this.points[face[2]][1], this.points[face[3]][0], this.points[face[3]][1])
    })
  }

    }
  }

function project(X, Z){
    return ((focal * X) / (focal + Z))
}

function rotate3D(vert, mtheta) {
  let rotationMatrixX = ([
    [cos(mtheta), -(sin(mtheta)),0],
    [sin(mtheta), cos(mtheta),0],
            [0, 0, 1],
  ])

  // let rotationMatrixX = ([
  //   [cos(mtheta), 0,(sin(mtheta))],
  //   [0, 1, 0],
  //   [-sin(mtheta), 0,cos(mtheta)],
  // ])
  // console.log([vert])
  // console.log(rotationMatrixX)
  // console.log((math.multiply(math.matrix([vert]), rotationMatrixX))._data)
  // p5.stroke(255)
  let beh = (math.multiply(([vert]), rotationMatrixX))[0]
  // beh[2] = beh[2] > 5 ? beh[2]/5 : beh[2]
  // console.log(beh)
  // p5.point()
  // return (math.multiply(math.matrix([vert]), rotationMatrixX))._data[0]
  console.log(vert)
  return beh
}

module.exports = {cube}