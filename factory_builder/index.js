function find_recipe(end_item)
{
    // find end_item in recipes
    for(var type of ["cutter", "furnace", "crafter_2", "crafter_3", "washer", "crusher", "flashbaker", "enchanter", "sonic_zapper", "crafter_5"])
    {
        for(var recipe of RECIPES[type])
        {
            var output = recipe.output;
            if(output == null) output = recipe.out;
            if(output == end_item) {
                return {
                    "type": type,
                    "recipe": recipe
                };
            }
        }
    }
    return null;
}

var recipe_render = [];
var recipes_rendered = {};
const recipe_type_to_block = {
    "cutter": "stonecutter",
    "furnace": "blast_furnace",
    "washer": "water_bucket",
    "flashbaker": "lava_bucket",
    "sonic_zapper": "reinforced_deepslate",
    "crafter_2": "crafting_table",
    "crafter_3": "crafter",
    "crusher": "smoker",
    "enchanter": "enchanting_table",
    "explosive_furnace": "furnace",
    "crafter_5": "shroomlight"
}
var recipe_lines = [];

function render_recipe(end_item)
{
    var recipe = find_recipe(end_item);
    if(recipes_rendered[end_item] != null) return;
    if(recipe == null)
    {
        // render spawner
        var div = document.createElement("div");
        div.classList = "recipe spawner";
        var img = document.createElement("img");
        img.classList = "block";
        img.src = "cdn/minecraft_trial_spawner.png";
        div.appendChild(img);
        img = document.createElement("img");
        img.classList = "loot";
        img.src = "cdn/minecraft_" + end_item + ".png";
        div.appendChild(img);
        document.body.appendChild(div);
        recipe_render.push({
            "id": end_item,
            "req": []
        });
        recipes_rendered[end_item] = div;
        return;
    }
    var div;
    switch(recipe.type)
    {
        case "cutter":
        case "furnace":
        case "washer":
        case "flashbaker":
        case "sonic_zapper":
        {
            div = document.createElement("div");
            div.classList = "recipe simple " + recipe.type;
            var img = document.createElement("img");
            img.classList = "block";
            img.src = "cdn/minecraft_" + recipe_type_to_block[recipe.type] + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "input";
            img.src = "cdn/minecraft_" + recipe.recipe.input + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "output";
            img.src = "cdn/minecraft_" + recipe.recipe.output + ".png";
            div.appendChild(img);
            document.body.appendChild(div);

            render_recipe(recipe.recipe.input);
            recipe_lines.push({from: recipe.recipe.input, to: end_item});
            recipe_render.push({
                "id": end_item,
                "req": [recipe.recipe.input]
            });
            break;
        }
        case "crafter_2":
        {
            div = document.createElement("div");
            div.classList = "recipe crafter crafter_2";
            var mini_div = document.createElement("div");
            mini_div.classList = "row1";
            div.appendChild(mini_div);
            var img = document.createElement("img");
            img.classList = "in1";
            img.src = "cdn/minecraft_" + recipe.recipe.in1 + ".png";
            mini_div.appendChild(img);
            img = document.createElement("img");
            img.classList = "in2";
            img.src = "cdn/minecraft_" + recipe.recipe.in2 + ".png";
            mini_div.appendChild(img);
            img = document.createElement("img");
            img.classList = "block";
            img.src = "cdn/minecraft_" + recipe_type_to_block[recipe.type] + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "output";
            img.src = "cdn/minecraft_" + recipe.recipe.out + ".png";
            div.appendChild(img);
            document.body.appendChild(div);

            render_recipe(recipe.recipe.in1);
            render_recipe(recipe.recipe.in2);
            recipe_lines.push({from: recipe.recipe.in1, to: end_item});
            recipe_lines.push({from: recipe.recipe.in2, to: end_item});
            recipe_render.push({
                "id": end_item,
                "req": [recipe.recipe.in1,recipe.recipe.in2]
            });
            break;
        }
        case "crafter_3":
        case "enchanter":
        {
            div = document.createElement("div");
            div.classList = "recipe crafter crafter_3";
            var mini_div = document.createElement("div");
            mini_div.classList = "row1";
            div.appendChild(mini_div);
            var img = document.createElement("img");
            img.classList = "in1";
            img.src = "cdn/minecraft_" + recipe.recipe.in1 + ".png";
            mini_div.appendChild(img);
            img = document.createElement("img");
            img.classList = "in2";
            img.src = "cdn/minecraft_" + recipe.recipe.in2 + ".png";
            mini_div.appendChild(img);
            img = document.createElement("img");
            img.classList = "in3";
            img.src = "cdn/minecraft_" + recipe.recipe.in3 + ".png";
            mini_div.appendChild(img);
            img = document.createElement("img");
            img.classList = "block";
            img.src = "cdn/minecraft_" + recipe_type_to_block[recipe.type] + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "output";
            img.src = "cdn/minecraft_" + recipe.recipe.out + ".png";
            div.appendChild(img);
            document.body.appendChild(div);

            render_recipe(recipe.recipe.in1);
            render_recipe(recipe.recipe.in2);
            render_recipe(recipe.recipe.in3);
            recipe_lines.push({from: recipe.recipe.in1, to: end_item});
            recipe_lines.push({from: recipe.recipe.in2, to: end_item});
            recipe_lines.push({from: recipe.recipe.in3, to: end_item});
            recipe_render.push({
                "id": end_item,
                "req": [recipe.recipe.in1,recipe.recipe.in2,recipe.recipe.in3]
            });
            break;
        }
        case "crusher":
        {
            div = document.createElement("div");
            div.classList = "recipe crusher";
            var img = document.createElement("img");
            img.classList = "side";
            img.src = "cdn/minecraft_" + recipe.recipe.side + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "top";
            img.src = "cdn/minecraft_" + recipe.recipe.top + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "block";
            img.src = "cdn/minecraft_" + recipe_type_to_block[recipe.type] + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "output";
            img.src = "cdn/minecraft_" + recipe.recipe.out + ".png";
            div.appendChild(img);
            document.body.appendChild(div);

            render_recipe(recipe.recipe.side);
            render_recipe(recipe.recipe.top);
            recipe_lines.push({from: recipe.recipe.side, to: end_item});
            recipe_lines.push({from: recipe.recipe.top, to: end_item});
            recipe_render.push({
                "id": end_item,
                "req": [recipe.recipe.side,recipe.recipe.top]
            });
            break;
        }
        case "crafter_5":
        {
            div = document.createElement("div");
            div.classList = "recipe crafter crafter_5";
            var mini_div = document.createElement("div");
            mini_div.classList = "row1";
            div.appendChild(mini_div);
            var div1 = document.createElement("div");
            div1.classList = "row_1";
            var img = document.createElement("img");
            img.classList = "in1";
            img.src = "cdn/minecraft_" + recipe.recipe.in1 + ".png";
            div1.appendChild(img);
            img = document.createElement("img");
            img.classList = "in2";
            img.src = "cdn/minecraft_" + recipe.recipe.in2 + ".png";
            div1.appendChild(img);
            img = document.createElement("img");
            img.classList = "in3";
            img.src = "cdn/minecraft_" + recipe.recipe.in3 + ".png";
            div1.appendChild(img);
            mini_div.appendChild(div1);
            div1 = document.createElement("div");
            div1.classList = "row_2";
            img = document.createElement("img");
            img.classList = "in4";
            img.src = "cdn/minecraft_" + recipe.recipe.in4 + ".png";
            div1.appendChild(img);
            img = document.createElement("img");
            img.classList = "in5";
            img.src = "cdn/minecraft_" + recipe.recipe.in5 + ".png";
            div1.appendChild(img);
            mini_div.appendChild(div1);
            img = document.createElement("img");
            img.classList = "block";
            img.src = "cdn/minecraft_" + recipe_type_to_block[recipe.type] + ".png";
            div.appendChild(img);
            img = document.createElement("img");
            img.classList = "output";
            img.src = "cdn/minecraft_" + recipe.recipe.out + ".png";
            div.appendChild(img);
            document.body.appendChild(div);

            render_recipe(recipe.recipe.in1);
            render_recipe(recipe.recipe.in2);
            render_recipe(recipe.recipe.in3);
            render_recipe(recipe.recipe.in4);
            render_recipe(recipe.recipe.in5);
            recipe_lines.push({from: recipe.recipe.in1, to: end_item});
            recipe_lines.push({from: recipe.recipe.in2, to: end_item});
            recipe_lines.push({from: recipe.recipe.in3, to: end_item});
            recipe_lines.push({from: recipe.recipe.in4, to: end_item});
            recipe_lines.push({from: recipe.recipe.in5, to: end_item});
            recipe_render.push({
                "id": end_item,
                "req": [recipe.recipe.in1,recipe.recipe.in2,recipe.recipe.in3,recipe.recipe.in4,recipe.recipe.in5]
            });
            break;
        }
    }
    recipes_rendered[end_item] = div;
}

render_recipe(window.location.search.substring(1));

const max = (a,b) => (a > b) ? a : b;
const min = (a,b) => (a < b) ? a : b;
const strip_px = (st) => +st.substring(0, st.length - 2);

var rendered_recipe_lines = [];
function update_recipe_lines()
{
    for(var line of recipe_lines)
    {
        var from = recipes_rendered[line.from];
        var from_box = from.getBoundingClientRect();
        var to = recipes_rendered[line.to];
        var to_box = to.getBoundingClientRect();
        var id = line.from + "-" + line.to;
        if(rendered_recipe_lines[id] == null)
        {
            // create line
            var line = document.createElement("div");
            line.classList = "line";
            document.body.appendChild(line);
            rendered_recipe_lines[id] = line;
        }

        var fT = strip_px(from.style.top) + from_box.height/2;
        var tT = strip_px(to.style.top) + to_box.height/2;
        var fL = strip_px(from.style.left) + from_box.width;
        var tL = strip_px(to.style.left);
        
        var CA   = Math.abs(tT - fT);
        var CO   = Math.abs(tL - fL);
        var H    = Math.sqrt(CA*CA + CO*CO);
        var ANG  = 180 / Math.PI * Math.acos( CA/H );

        if(tT > fT){
            var top  = (tT-fT)/2 + fT;
        }else{
            var top  = (fT-tT)/2 + tT;
        }
        if(tL > fL){
            var left = (tL-fL)/2 + fL;
        }else{
            var left = (fL-tL)/2 + tL;
        }

        if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
            ANG *= -1;
        }
        top-= H/2;

        rendered_recipe_lines[id].style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
        rendered_recipe_lines[id].style["-moz-transform"] = 'rotate('+ ANG +'deg)';
        rendered_recipe_lines[id].style["-ms-transform"] = 'rotate('+ ANG +'deg)';
        rendered_recipe_lines[id].style["-o-transform"] = 'rotate('+ ANG +'deg)';
        rendered_recipe_lines[id].style["-transform"] = 'rotate('+ ANG +'deg)';
        rendered_recipe_lines[id].style.top    = top+'px';
        rendered_recipe_lines[id].style.left   = left+'px';
        rendered_recipe_lines[id].style.height = H + 'px';
    }
}

// arrange recipe layers
function loaded() {
    var layers = [];
    var max_shelfs = 0;
    while(recipe_render.length > 0)
    {
        var to_render = recipe_render.filter(x => x.req.length == 0);
        recipe_render = recipe_render.filter(x => x.req.length != 0);
        max_shelfs = max(max_shelfs, to_render.length);
        layers.push(to_render);
        for(var recipe of recipe_render)
            recipe.req = recipe.req.filter(x => to_render.filter(y => y.id == x).length == 0);
    }
    console.log(max_shelfs, layers);
    const total_layers = layers.length;
    const layer_width = max(window.innerWidth / total_layers, 400);
    const total_height = max(window.innerHeight, max_shelfs * 400);
    for(var layer = 0; layer < layers.length; ++layer)
    {
        const total_shelfs = layers[layer].length;
        const shelf_height = total_height / total_shelfs;
        for(var shelf = 0; shelf < total_shelfs; ++shelf)
        {
            var elem = recipes_rendered[layers[layer][shelf].id];
            var bounds = elem.getBoundingClientRect();
            elem.style.top = shelf * shelf_height + (shelf_height - bounds.height) / 2;
            elem.style.left = layer * layer_width + (layer_width - bounds.width) / 2;
            dragElement(elem);
        }
    }

    // calculate appropriate zoom
    var zx = window.innerWidth / (total_layers * layer_width);
    var zy = window.innerHeight / total_height;
    updateZoom(min(zx, zy));
    // aspect ratio
    var ar = window.innerWidth / window.innerHeight;
    if(ar * total_height > (total_layers * layer_width))
    {
        // center horizontally
        moveAll((ar * total_height - (total_layers * layer_width)) / 2 * old_zoom, 0);
    }
    if((total_layers * layer_width) / ar > total_height)
    {
        // center vertically
        moveAll(0, ((total_layers * layer_width) / ar - total_height) / 2 * old_zoom);
    }
    update_recipe_lines();
}

/*
    --v1: 4rem;
    --v2: -3.5rem;
    --v3: -4rem;
    --v4: -5rem;
    --v5: -7rem;
    --v6: 2rem;
    --v7: -2rem;
    --v8: -6.5rem;
    --v9: -1.5rem;
    */

const default_size = [0,4,-3.5,-4,-5,-7,2,-2,-6.5,-1.5,1,5,4.5,7.5];
var old_zoom = 1;
function updateZoom(zoom)
{
    const root = document.querySelector(':root');
    for(var i = 1; i < default_size.length; ++i)
        root.style.setProperty('--v' + i, default_size[i] * zoom + "rem");
    // update recipes offsets
    for(var r of document.getElementsByClassName("recipe")) {
        var oldTop = strip_px(r.style.top);
        var oldLeft = strip_px(r.style.left);
        r.style.top = oldTop * zoom / old_zoom + "px";
        r.style.left = oldLeft * zoom / old_zoom + "px";
    }
    old_zoom = zoom;
    update_recipe_lines();
}

document.addEventListener("wheel", (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    if(event.deltaY > 0) {
        updateZoom(old_zoom / 1.1);
        moveAll(event.clientX / 11, event.clientY / 11);
        update_recipe_lines();
    }
    else if(event.deltaY < 0) {
        updateZoom(old_zoom * 1.1);
        // event.screenX - event.screenX * 1.1
        moveAll(-event.clientX / 10, -event.clientY / 10);
        update_recipe_lines();
    }
}, { passive: false });

var moving = false;
var startX, startY;
document.addEventListener("mousedown", (e) => {
    e = e || window.event;
    if(e.button != 2) return;
    e.preventDefault();
    e.stopPropagation();
    moving = true;
    startX = e.screenX;
    startY = e.screenY;
}, {passive: false});
document.addEventListener("mouseup", (e) => {
    if(moving)
        update_recipe_lines();
    moving = false;
});
function moveAll(dx, dy)
{
    console.log(dx, dy);
    for(var r of document.getElementsByClassName("recipe"))
    {
        r.style.top = strip_px(r.style.top) + dy + "px";
        r.style.left = strip_px(r.style.left) + dx + "px";
    }
}
document.addEventListener("mousemove", (e) => {
    if(!moving) return;
    e = e || window.event;
    var dx = e.screenX - startX;
    var dy = e.screenY - startY;
    moveAll(dx / window.devicePixelRatio, dy / window.devicePixelRatio);
    startX = e.screenX;
    startY = e.screenY;
})

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    window.event.returnValue = false;
  });
}

function awaitImages() {
    var allImgsLength = 0;
    var allImgsLoaded = 0;
    var allImgs = [];

    var filtered = Array.prototype.filter.call(document.querySelectorAll('img'), function (item) {
        if (item.src === '') {
            return false;
        }

        // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
        // Doing it this way works in Firefox.
        var img = new Image();
        img.src = item.src;
        return !img.complete;
    });

    filtered.forEach(function (item) {
        allImgs.push({
            src: item.src,
            element: item
        });
    });

    allImgsLength = allImgs.length;
    allImgsLoaded = 0;

    // If no images found, don't bother.
    if (allImgsLength === 0) {
        loaded();
    }

    allImgs.forEach(function (img) {
        var image = new Image();

        // Handle the image loading and error with the same callback.
        image.addEventListener('load', function () {
            allImgsLoaded++;

            if (allImgsLoaded === allImgsLength) {
                loaded();
                return false;
            }
        });

        image.src = img.src;
    });
}
awaitImages();