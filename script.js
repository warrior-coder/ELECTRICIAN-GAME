// Creation part
const BOTTOMS = document.querySelectorAll('.circle-bottom');
const TOP = document.querySelector('.top_container');
const BOTTOM = document.querySelector('.bottom_container');
const GAMEOVER = document.querySelector('.gameover_container');

let tops = [ 0, 1, 2, 3, 4 ];
let bottoms = [ 0, 1, 2, 3, 4 ];

for (let i = 0; i < 5; i++)
{
    let r = Math.round(Math.random() * 4);
    let temp = tops[i];
    tops[i] = tops[r];
    tops[r] = temp;
}


for (let i = 0; i < 5; i++)
{
    TOP.innerHTML += '<img class="circle-top" src="electrician_asests/circle-top-' + tops[i] + '.svg" alt="circle">'
}
const TOPS = document.querySelectorAll('.circle-top');

// Logic part
var TARGET = -1, mX0, mY0, dX, dY, OK = 0, DONE = 0;
const LINES = document.querySelectorAll('.line');
console.dir(LINES);

for (let i = 0; i < BOTTOMS.length; i++)
{
    BOTTOMS[i].addEventListener('mousedown', e => {
        if (bottoms[i] > -1)
        {
            console.log('start from', i);
        
            TARGET = i;
            mX0 = e.clientX;
            mY0 = e.clientY;
            dX = dY = 0;
        }
        
    });
    TOPS[i].addEventListener('mouseup', e => {
        if (TARGET > -1 && tops[i] != -1)
        {
            console.log('end in', tops[i]);
            if (tops[i] == TARGET)
            {
                OK++;
                tops[i] = -1;
                bottoms[TARGET] = -1;
                // BOTTOMS[TARGET].removeEventListener('mousedown', ()=>{}, false);
                // TOPS[i].removeEventListener('mouseup', ()=>{}, false);
            }
            DONE++;
            if (DONE == 5)
            {
                TOP.style.opacity = 0.5;
                BOTTOM.style.opacity = 0.5;
                GAMEOVER.style.display = 'flex';
                if (DONE == OK) GAMEOVER.innerHTML = '<img src="electrician_asests/win.svg" alt="win" draggable="false">';
                else GAMEOVER.innerHTML = '<img src="electrician_asests/lose.svg" alt="lose" draggable="false">';
            }
            // ClearTarget(TARGET);
            // TOPS[tops[i]].removeEventListener('mouseup', ()=>{}, false);
            // BOTTOMS[i].removeEventListener('mousedown', ()=>{}, false);
            TARGET = -1;
        }
        
    });
}

document.addEventListener('mousemove', e => {
    if (TARGET > -1)
    {
        dX += e.clientX - mX0;
        dY += e.clientY - mY0;
        let len = Math.round(Math.sqrt(dX*dX + dY*dY));
        LINES[TARGET].style.height = len + 'px';
        let deg = -Math.atan(dX/dY) / 3.14 * 180;
        // console. log(deg);
        LINES[TARGET].style.transform = 'rotate(' + deg + 'deg)';
        LINES[TARGET].style.display = 'block';
        BOTTOMS[TARGET].style.transform = 'rotate(' + deg + 'deg)';
        // console.clear();
        // console.log(dX, dY);
        mX0 = e.clientX;
        mY0 = e.clientY;
    }
});

document.addEventListener('mouseup', e => {
    ClearTarget(TARGET);

    TARGET = -1;
});

function ClearTarget(target)
{
    if (target == -1) return;
    BOTTOMS[target].style.transform = 'rotate(0deg)';
    LINES[target].style.display = 'none';
}