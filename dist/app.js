
var CANVAS;
GW.random.seed(123456);

GW.dig.room.install('ROOM', GW.dig.room.rectangular, {
    width: '10-20',
    height: '6-10',
    hallChance: 50,
});

function startApp() {
    CANVAS = GW.canvas.withFont({ font: 'monospace', width: 100, height: 50, div: 'game' });
    CANVAS.fill(0, 0, 0x00F);

    const map = GW.grid.alloc(100, 50);

    GW.dig.start(map);

    let room;
    let locs;
    
    for(let x = 0; x < 5; ++x) {
        room = GW.dig.dig(map, { room: 'ROOM', locs });
        if (room) { locs = room.doors; }
    }

    GW.dig.finish(map);

    map.forEach( (v, x, y) => {
        CANVAS.draw(x, y, 0, 0, v == GW.dig.WALL ? 0x00F : 0x000);
    });

    GW.grid.free(map);
}

window.onload = startApp;
