import * as util from "./util.js"
import {drawFrame} from "./render.js"

export function move(session,creature, x, y) 
{
    const tx = (x && x!=0) ? creature.position.x + x : creature.position.x;
    const ty = (y && y!=0) ? creature.position.y + y : creature.position.y;
    if (!session.checkCollision(tx, ty)) 
    {
        creature.position.x = tx;
        creature.position.y = ty;
    } 
    else if (session.map.world[tx][ty] == 5 && session.map.door[tx][ty].open ==  false) 
    {
        session.map.door[tx][ty].open = util.roleta(session.map.door[tx][ty].difficulty,1);
    }
    drawFrame(session);
}

export class Buff 
{
    constructor(type,description,group,value)
    {
        this.type = type
        this.group = group
        this.value = value
        this.description = description
    }
}

export class Skill
{
    constructor(name,xp,active=true)
    {
        this.name = name
        this.active = active
        this.xp = xp
    }
}

export class Memory
{
    constructor(actor, victim, action, what, when, where, buff)
    {
        this.actor = actor
        this.victim = victim
        this.action = action
        this.what = what
        this.when = when
        this.where = where
        this.buff = buff || {}
    }
}

export class Creature 
{
    specime = 'human'
    position = { x: 15, y: 15 }
    body = 
    {
        hp:100,
        mp:0,
        waker:100,
        drink:100,
        sleep:100
    }
    memory = []
    knowledge = {}
    skill = {}
    _skill_buffs = {}
    buff = []
    new = 
    {
        skill:(name,xp,active=false)=>
        {
            this.skill[name] = new Skill(name,xp,active) 
        },
        memory:(actor, victim, action, what, when, where, buffs) =>
        {
            let obj = new Memory(actor,victim,action,what,when,where,buffs)
            if (buffs) 
            {
                obj.buffs = buffs
            }
            this.memory.push(obj)
        },
        knowledge:(name,content) =>
        {
            this.knowledge[name] = content
            return this.knowledge[name]
        },
        buff:(type,description,group,value)=>
        {
            this.buff.push(new Buff(type,description,group,value))
            return this.buff[this.buff.length]
        }
    }
    update = ()=>
    {
        this._skill_buffs = {}
        for (const iterator of this.skill) 
        {
            this._skill_buffs[this.skill[i]] = 0
        }
        for (const iterator of buff) 
        {
            if (buff.type == 'skill') 
            {
                this._skill_buffs += this.buff[this.buff.type].value
            }
        }
    }
    constructor(session,specime = 'human', position) 
    {
        this.specime = specime
        if (!position) 
        {
            while (!session.tilename[session.map.world[this.position.x][this.position.y]].includes("floor_")) 
            {
                this.position.x = util.randi(0, session.map.world.length - 1)
                this.position.y = util.randi(0, session.map.world[0].length - 1)
            };
        }
        else
            this.position = position
        let creature = this
        this.move =
        {
            up: function () {session, move(session,creature, 0, -1) },
            down: function () {session, move(session,creature, 0, 1) },
            left: function () {session, move(session,creature, -1, 0) },
            right: function () {session, move(session,creature, 1, 0) },
        }
    }
}

export var creatures = 
{
    human:function(session, name='noname',age='23') 
    {
        let creature = new Creature(session,'human')
        creature.new.memory('self_mom','self','gave_birth','human',0,{x:0,y:0})
        creature.new.skill('walk',1)
        creature.new.skill('speech',1)
        creature.new.skill('see',1)
        creature.new.skill('eat',1)
        creature.new.skill('drink',1)
        creature.new.skill('pee',1)
        creature.new.skill('poop',1)
        creature.new.skill('think',1)
        creature.new.skill('memorize',1)
        creature.new.skill('remember',1)
        creature.new.skill('learn',1)
        let mbuff = creature.new.buff('skill','i know my name','speech',1)
        creature.new.memory('self_mom','self','named',0,{x:0,y:0},0,[mbuff])
        creature.new.knowledge("self_name",name)
        return creature
    }
}