function move(creature, x, y) 
{
    const tx = (x && x!=0) ? creature.position.x + x : creature.position.x;
    const ty = (y && y!=0) ? creature.position.y + y : creature.position.y;
    if (!checkCollision(tx, ty)) 
    {
        creature.position.x = tx;
        creature.position.y = ty;
        creature.direction.x = tx
        creature.direction.y = ty
    } 
    else if (session.map[tx][ty] == 5 && roleta(2, 1) == 1) 
    {
        session.map[tx][ty] = roleta(0, 0, 0, 0, 0, 2, 1);
    }
    drawFrame();
}

class Mod
{
    constructor(type,description,skill,buff)
    {
        this.type = type
        this.skill = skill
        this.buff = buff
        this.description = description
    }
}

class Memory
{
    constructor(what,when,where,who = 'nobody', mood = 0, mods)
    {
        this.who = who
        this.what = what
        this.when = when
        this.where = where
        this.mood = mood
        this.mods = mods || {}
    }
}

class Knowledge
{
    constructor(name = 'noname',action, what, when = -1 ,where = 'nowhere',teacher = 'self', mods, memory)
    {
        this.name = name
        this.teacher = teacher
        this.action = action
        this.what = what
        this.when = when
        this.where = where
        this.mods = mods || {}
        this.memory = memory || undefined
    }
}

class Limb 
{
    name = "unamed"
    condition = 100
    quality = 100
    storage = false
    parent = false
    relatives = []
    mods = []
    constructor(name,storage,parent)
    {
        this.name = name || this.name;
        this.storage = storage || this.storage;
        if (parent) 
        {
            this.parent = this.parent;
            parent.relatives.push(this)
        }
    }
}

class Body
{
    limb = []
    newLimb = (name,storage,parent,mods) => 
    {
        let result = new Limb(name,storage,parent,mods)
        this.limb.push(result)
        this.limb[name] = result
        return result
    }
    constructor(specime,...limbs)
    {
        this.specime = specime
        for (let index = 0; index < limbs.length; index++) 
        {
            this.limb.push(limbs[index])
        }
    }
}

class Creature 
{
    specime = 'human'
    position = { x: 15, y: 15 }
    direction = {x:0,y:1}
    mods = []
    skill = 
    {
        strength:0,
        jump:0,
        walk:0,
        swim:0,
        memorize:0,
        think:0,
        speech:0,
        carisma:0,
        appearence:0,
        vision: 0,
        smell: 0,
        see: 0,
        eat: 0,
        drink: 0,
        speak: 0,
        pickup: 0,
        spit: 0,
        pee: 0,
        poop: 0,
        reproduce:0
    }
    body;
    newMemory = (actor, victim, what, when, where, mods) =>
    {
        let obj = {}
        obj.actor = actor
        obj.victim = victim
        obj.what = what
        obj.when = when
        obj.where = where
        obj.mods = mods
        this.body.limb.brain.storage.knowledge.push(obj)
    }
    newKnowledge = (name = 'noname',what,when = -1 ,where = 'nowhere',teacher = 'self', mods, memory) =>
    {
        let obj = {}
        obj.name = name
        obj.teacher = teacher
        obj.what = what
        obj.when = when
        obj.where = where
        obj.mods = mods
        obj.memory = memory || undefined
    }
    update = ()=>
    {

    }
    mod = (mod)=>
    {
        if (mod.name) 
        {
            let m = this.mods.push(mod)
            this.skill[mod.skill] += mod.buff
            return m
        }
        else
        {
            let result = []
            for (let index = 0; index < mod.length; index++) 
            {
                let m = this.mods.push(mod)
                this.skill[mod.skill] += mod.buff
                result.push(m)
            }
            return result
        }
    }
    unmod = (mod)=>
    {
        if (typeof(mod) == 'string') 
        {
            for (let index = 0; index < this.mods; index++) 
            {
                if (this.mods[index].name == mod) 
                {
                    this.mods.splice(index,1)
                    break
                }
            }
        }
        else
            for (let index = 0; index < this.mods; index++) 
            {
                if (this.mods[index].name == mod.name) 
                {
                    this.mods.splice(index,1)
                    break
                }
            }
    }
    constructor(specime = 'human', position, body = new Body()) 
    {
        this.specime = specime
        this.body = body
        if (!position) 
        {
            while (!session.tilename[session.map[this.position.x][this.position.y]].includes("floor_")) 
            {
                this.position.x = randi(0, session.map.length - 1)
                this.position.y = randi(0, session.map[0].length - 1)
            };
        }
        else
            this.position = position
        let creature = this
        this.move =
        {
            up: function () { move(creature, 0, -1) },
            down: function () { move(creature, 0, 1) },
            left: function () { move(creature, -1, 0) },
            right: function () { move(creature, 1, 0) },
        }
    }
}

var creatures = 
{
    human:function(name='noname',age='23') 
    {
        let creature = new Creature('human')
        let body = creature.body
        
        let head = body.newLimb('head')
        body.newLimb('brain',{knowledge:[],memory:[]},head)
        body.newLimb('nose',false,head)
        body.newLimb('eye',false,head)
        body.newLimb('eye',false,head)
        body.newLimb('ear',false,head)
        body.newLimb('ear',false,head)

        let mouth = body.newLimb('mouth',false,head)
        body.newLimb('tongue',false,mouth)
        for(let i = 0; i < 32; i++)
            body.newLimb('teeth',false,mouth)

        let neck = body.newLimb('neck',false,head)

        let torso = body.newLimb('torso',false,neck)

        body.newLimb('penis',false,torso)

        body.newLimb('anus',false,torso)

        for (let index = 0; index < 2; index++) {
            let arm = body.newLimb('arm',false,torso)
            let hand = body.newLimb('hand',false,arm)
            let finger
            for (let index = 0; index < 5; index++) 
            {
                finger = body.newLimb('finger',false,hand)
                body.newLimb('nail')    
            }
        }

        for (let index = 0; index < 2; index++) {
            let leg = body.newLimb('leg',false,torso)
            let feet = body.newLimb('feet',false,leg)
            let finger
            for (let index = 0; index < 5; index++) 
            {
                finger = body.newLimb('finger',false,feet)
                body.newLimb('nail')    
            }
        }

        creature.newMemory('unknown','self','birth',0,{x:0,y:0})
        let m = creature.newMemory('unknown','self','named',0,{x:0,y:0})
        let mbuff = creature.mod([new Mod('buff','i know my name','speech',1)])
        creature.newKnowledge('my name','name',0,{x:0,y:0},'unknown',mbuff,m)
        return creature
    }
}