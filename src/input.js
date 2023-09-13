export function set_keydown(session) 
{
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') 
        {
            session.creature[0].move.left()
        } 
        else if (event.key === 'ArrowRight') 
        {
            session.creature[0].move.right()
        } 
        else if (event.key === 'ArrowDown') 
        {
            session.creature[0].move.down()
        } 
        else if (event.key === 'ArrowUp') 
        {
            session.creature[0].move.up()
        }
    });

    document.addEventListener('keyup', function(event) 
    {
        // Verificar qual tecla foi pressionada pelo código da tecla (keyCode ou key)
        if (event.key === 'g') 
        {
          // Ação a ser executada quando a tecla Enter é liberada
          console.log(session.creature[0]);
        }
        if (event.key === 'k') 
        {
          // Ação a ser executada quando a tecla Enter é liberada
          console.log(session);
        }
    });      
}

export function spawndebugbuttons(session) 
{
    let button = document.createElement('button');
    button.textContent = '↑'; 
    button.onclick = session.creature[0].move.up; 
    document.body.appendChild(button);

    button = document.createElement('button');
    button.textContent = '↓'; 
    button.onclick = session.creature[0].move.down; 
    document.body.appendChild(button);

    button = document.createElement('button');
    button.textContent = '→'; 
    button.onclick = session.creature[0].move.right; 
    document.body.appendChild(button);

    button = document.createElement('button');
    button.textContent = '←'; 
    button.onclick = session.creature[0].move.left; 
    document.body.appendChild(button);
}