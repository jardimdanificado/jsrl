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

function spawndebugbuttons() 
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