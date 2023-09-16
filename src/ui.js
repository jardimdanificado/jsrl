import * as util from "./util.js"
import {drawFrame} from "./render.js"

export class Text
{
    constructor(content,position)
    {
        this.content = content
        this.position = position
    }
}

export class Button
{
    constructor(content,position, size)
    {
        this.content = content
        this.position = position
        this.size = size
    }
}

// Definindo a classe Window
export class Window {
    constructor(session,canvas, title) 
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.title = title;
        this.width = 160; // Largura da janela
        this.height = 100; // Altura da janela
        this.x = 64; // Posição X da janela
        this.y = 64; // Posição Y da janela
        this.isDragging = false;
        canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        canvas.addEventListener("mouseup", () => this.onMouseUp());
        canvas.addEventListener("click", (e) => this.onClick(e));
        this.onMouseMove = (e) => {
            if (this.isDragging) {
                const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
                const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
                this.x = mouseX - this.dragOffsetX;
                this.y = mouseY - this.dragOffsetY;
                drawFrame(session);
            }
        }
        this.onClick = (e)=> {
            const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
            const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
    
            if (e.button == 0 &&
                mouseX >= this.x + this.width - 16 && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + 16) {
                    for (let i = 0; i < session.window.length; i++) {
                        if (this == session.window[i]) 
                        {
                            session.window.splice(i,1);
                            drawFrame(session)
                            break;
                        }
                    }
            }
            else if (e.button == 1 && 
                mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) 
            {
                for (let i = 0; i < session.window.length; i++) {
                    if (this == session.window[i]) 
                    {
                        session.window.splice(i,1);
                        drawFrame(session)
                        break;
                    }
                }
            }
        }
        this.draw = () => 
        {
            // Desenha a janela
            this.ctx.fillStyle = "#ccc";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
    
            // Desenha a barra de título
            this.ctx.fillStyle = "#333";
            this.ctx.fillRect(this.x, this.y, this.width, 16);
    
            // Desenha o texto do título
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "14px Arial";
            this.ctx.fillText(this.title, this.x + 2, this.y + 12);
    
            this.ctx.drawImage(session.tilelink['button_close_0'], this.x + this.width - 16, this.y);
        }
    }

    onMouseDown(e) 
    {
        const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;

        if (e.button == 0 &&
            mouseX >= this.x && mouseX <= this.x + this.width - 16 &&
            mouseY >= this.y && mouseY <= this.y + 16) 
        {
            this.isDragging = true;
            this.dragOffsetX = mouseX - this.x;
            this.dragOffsetY = mouseY - this.y;
        }
        else if (e.button == 1 &&
            mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) 
        {
            this.isDragging = true;
            this.dragOffsetX = mouseX - this.x;
            this.dragOffsetY = mouseY - this.y;
        }
    }

    onMouseUp() {
        this.isDragging = false;
    }
}