const p5 = require('node-p5');
const {cube} = require('./renderer.js')


let c = new cube(100, 5, {x:(200),y:(200)})

function sketch(p) {
    p.setup = () => {
        let canvas = p.createCanvas(400, 400);
        p.background(0);
        c.render(null,p)
        p.stroke(0)
        // p.line(0,0,500,500)
        // setTimeout(() => {
            p.saveCanvas(canvas, 'out', 'png').then(filename => {
                console.log(`saved the canvas as ${filename}`);
                process.exit(0);
            });
        // }, 100);
    }
    // p.draw = () => {
    //     p.background(0);
    //     c.render(null,p, {x:(200),y:(200)})
    //     // p.line(0,0,500,500)
    // }
}

let p5Instance = p5.createSketch(sketch);