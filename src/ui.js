import * as util from "./util.js"

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

export class Window
{
    button = []
    text = []
    constructor(position = {x:0,y:0},size = {x:0,y:0},title)
    {
        this.title = title
        this.position = position
        this.size = size
    }
}

export var window = [];