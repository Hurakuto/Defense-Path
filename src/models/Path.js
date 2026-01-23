export class Path {
    
    constructor(){

        this.width = window.innerWidth,
        this.height = window.innerHeight,

        this.pixelW = window.innerWidth/17;
        this.pixelH = window.innerHeight/9;

        this.map1 = {
            width: window.innerWidth,
            height: window.innerHeight,
            path: [
                { x: this.pixelW, y: this.pixelH*5 },
                { x: this.pixelW*2, y: this.pixelH*5 },
                { x: this.pixelW*2, y: this.pixelH*3 },
                { x: this.pixelW*5, y: this.pixelH*3 },
                { x: this.pixelW*5, y: this.pixelH*5 },
                { x: this.pixelW*6, y: this.pixelH*5 },
                { x: this.pixelW*5, y: this.pixelH*3 },
                { x: this.pixelW*5, y: this.pixelH*5 },
                { x: this.pixelW*6, y: this.pixelH*5 },
                { x: this.pixelW*5, y: this.pixelH*3 },
                { x: this.pixelW*5, y: this.pixelH*5 },
                { x: this.pixelW*6, y: this.pixelH*5 },
            ],
        };
        this.map2 = {
            width: window.innerWidth,
            height: window.innerHeight,
            path: [
                { x: 0, y: 150 },
                { x: 400, y: 150 },
                { x: 400, y: 450 },
                { x: 800, y: 450 },
            ],
        };
    }

    drawPath(map) {
        const canvas = document.getElementById('canva');
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
        ctx.lineWidth = 50;

        ctx.beginPath();
        ctx.moveTo(map.path[0].x, map.path[0].y);

        for (let i = 1; i < map.path.length; i++) {
            ctx.lineTo(map.path[i].x, map.path[i].y);
        }

        ctx.stroke();
    }

}