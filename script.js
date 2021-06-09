// -+-+-+-+-+-+-+-+-+-+- Creation part -+-+-+-+-+-+-+-+-+-+-
const BOTTOM = document.querySelector('.bottom_container');
const BOTTOMS = document.querySelectorAll('.circle-bottom');
const TOP = document.querySelector('.top_container');
const GAMEOVER = document.querySelector('.gameover_container');

let tops_position = [ 0, 1, 2, 3, 4 ];
let bottoms_position = [ 0, 1, 2, 3, 4 ];

for (let i = 0; i < 5; i++)
{
    let r = Math.round(Math.random() * 4);
    let temp = tops_position[i];
    tops_position[i] = tops_position[r];
    tops_position[r] = temp;
}
for (let i = 0; i < 5; i++)
{
    TOP.innerHTML += '<img class="circle-top" src="images/circle-top-' + tops_position[i] + '.svg" alt="circle" draggable="false">'
}

// -+-+-+-+-+-+-+-+-+-+- Logic part -+-+-+-+-+-+-+-+-+-+-
var TARGET = -1,
    mX0, mY0,
    dX, dY,
    OK = 0,
    DONE = 0;
const LINES = document.querySelectorAll('.line');
const TOPS = document.querySelectorAll('.circle-top');

function GameOver(mode)
{
    TOP.style.opacity = BOTTOM.style.opacity = .5;
    GAMEOVER.style.zIndex = 99;
    GAMEOVER.style.opacity = 1;
    GAMEOVER.innerHTML = '<img style="height: 34vh;" src="images/' + mode + '.svg" alt="gameover" draggable="false">';
}

for (let i = 0; i < 5; i++)
{
    BOTTOMS[i].addEventListener('mousedown', () =>
    {
        if (bottoms_position[i] > -1)
        {
            TARGET = i;
            let bottom_i = BOTTOMS[i].getBoundingClientRect();
            mX0 = bottom_i.left + bottom_i.width / 2;
            mY0 = bottom_i.top + bottom_i.height / 2;
            dX = dY = 0;
        }
    });

    TOPS[i].addEventListener('mouseup', () => 
    {
        if (TARGET > -1 && tops_position[i] > -1)
        {
            // Counter
            DONE++;
            if (tops_position[i] == TARGET) OK++;
            else GameOver('lose');

            // If all done
            if (OK == 5) GameOver('win');

            // Lock circles
            tops_position[i] = bottoms_position[TARGET] = -1;
            TARGET = -1;
        }
    });
}

document.addEventListener('mousemove', e =>
{
    if (TARGET > -1)
    {
        // Count cords
        dX += e.clientX - mX0;
        dY += e.clientY - mY0;
        mX0 = e.clientX;
        mY0 = e.clientY;

        // Count length
        let len = Math.round(Math.sqrt(dX*dX + dY*dY));
        LINES[TARGET].style.height = len + 'px';

        // Count rotating
        let deg = -Math.atan(dX/dY) / 3.14 * 180;
        if (dY > 0) deg += 180;
        LINES[TARGET].style.transform = BOTTOMS[TARGET].style.transform = 'rotate(' + deg + 'deg)';
        LINES[TARGET].style.display = 'block';
    }
});

document.addEventListener('mouseup', () =>
{
    // Clear target
    if (TARGET > -1)
    {
        BOTTOMS[TARGET].style.transform = 'rotate(0deg)';
        LINES[TARGET].style.display = 'none';
    }
    TARGET = -1;
});