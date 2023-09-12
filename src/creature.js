import * as util from "./util.js"
import {drawFrame} from "./render.js"

export function checkSkill(creature,skill,minxp=0) 
{
    if (!creature.skill[skill] || creature.skill[skill].xp + creature._skill_buffs[skill] <= minxp-1) 
        return false
    else
        return true
}

export function chanceSkill(creature,skill,minxp=0,maxxp=1) 
{
    if (!creature.skill[skill] || creature.skill[skill].xp + creature._skill_buffs[skill] <= minxp-1) 
        return false
    else if (creature.skill[skill] && creature.skill[skill].xp + creature._skill_buffs[skill] > maxxp)
    {
        return true
    }
    else
        return util.roleta(1*util.ScaleTo(maxxp-minxp-(creature.skill[skill].xp + creature._skill_buffs[skill]-minxp),0,100),100) ? true : false
}

export function move(session,creature, x, y) 
{
    creature.update()
    if (chanceSkill(creature,'walk',1,400))
    { 
        console.log('you stumble')
        return drawFrame(session);
    }
    const tx = (x && x!=0) ? creature.position.x + x : creature.position.x;
    const ty = (y && y!=0) ? creature.position.y + y : creature.position.y;
    if (!session.checkCollision(tx, ty)) 
    {
        creature.position.x = tx;
        creature.position.y = ty;
    } 
    else if (session.map.tile[tx][ty] == 5 && creature.skill.handle && session.map.door[tx][ty].open ==  false) 
    {
        if (chanceSkill(creature,'handle',1,400)) 
        {
            console.log("you failed to open the door")
            return drawFrame(session);
        }
        else
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
        food:100,
        drink:100,
        sleep:100,

        maxhp:100,
        maxmp:0,
        maxfood:100,
        maxdrink:100,
        maxsleep:100,
    }
    memory = []
    knowledge = {}
    skill = 
    {
        learn:new Skill('learn',1),
        remember:new Skill('remember',1)
    }
    _skill_buffs = {}
    buff = []
    new = 
    {
        skill:(name,xp,active=true)=>
        {
            if (chanceSkill(this,"learn",1,400)) 
                return
            this.skill[name] = new Skill(name,xp,active) 
            this.update()
        },
        memory:(actor, victim, action, what, when, where, buffs) =>
        {
            if (chanceSkill(this,"remember",1,400)) 
                return
            let obj = new Memory(actor,victim,action,what,when,where,buffs)
            if (buffs) 
            {
                obj.buffs = buffs
            }
            this.memory.push(obj)
            this.update()
        },
        knowledge:(name,content) =>
        {
            if (chanceSkill(this,"remember",1,400) || chanceSkill(this,"learn",1,400)) 
                return
            this.knowledge[name] = content
            this.update()
            return this.knowledge[name]
        },
        buff:(type,description,group,value)=>
        {
            this.buff.push(new Buff(type,description,group,value))
            this.update()
            return this.buff[this.buff.length]
        }
    }
    delete = 
    {
        skill:(name)=>{
            this.skill[name] = undefined
        }
    }
    update = ()=>
    {
        this._skill_buffs = {}
        let keys = Object.keys(this.skill)

        for (let i = 0; i < keys.length; i ++) 
        {
            this._skill_buffs[keys[i]] = 0
        }
        for (let i = 0; i < this.buff.length; i++) 
        {
            if (this.buff[i].type == 'skill') 
            {
                this._skill_buffs[this.buff[i].group] += this.buff[i].value
            }
        }
    }
    constructor(session,specime = 'human', position) 
    {
        this.specime = specime
        this.knowntiles = util.newMatrix(session.map.tile.length,session.map.tile[0].length,false)
        this.viewingtiles = util.newMatrix(session.map.tile.length,session.map.tile[0].length,false)
        this.update()
        if (!position) 
        {
            while (!session.tilename[session.map.tile[this.position.x][this.position.y]].includes("floor_")) 
            {
                this.position.x = util.randi(0, session.map.tile.length - 1)
                this.position.y = util.randi(0, session.map.tile[0].length - 1)
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
    human:function(session, name='noname',birth=-1) 
    {
        let creature = new Creature(session,'human')
        creature.new.memory('self_mom','self','gave_birth','human',0,{x:0,y:0})
        creature.new.skill('walk',0)
        creature.new.skill('speech',0)
        creature.new.skill('see',1)
        creature.new.skill('eat',1)
        creature.new.skill('drink',1)
        creature.new.skill('pee',1)
        creature.new.skill('poop',1)
        creature.new.skill('think',1)
        creature.new.skill('handle',1)

        let talkbuff = creature.new.buff('skill','i learned my name','speech',1)
        creature.new.memory('self_mom','self','named',0,{x:0,y:0},0,[talkbuff])
        
        let walkbuff = creature.new.buff('skill','i learned how to walk','walk',5)
        creature.new.memory('self_mom','self','teached','walk',0,{x:0,y:0},[walkbuff])
        
        creature.new.knowledge("self_name",name)
        creature.new.knowledge("self_birth",birth)
        
        return creature
    }
}