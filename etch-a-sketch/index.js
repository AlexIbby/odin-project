//Set Grid Size - Default 16

let gridSize = 16

//Set Grid Size
const gridContainer = document.getElementById("grid-container");

function makeRows(rows, cols) {

    gridContainer.innerHTML = ""

    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);

  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    gridContainer.appendChild(cell).className = "grid-item";
  };
};

if (gridSize === 16){
    makeRows(16,16)
}



const gridItems = document.querySelectorAll(".grid-item")

const randomColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#008080",
  "#800080",
  "#FFA500",
  "#FFC0CB",
  "#FF6347",
  "#7FFF00",
  "#ADFF2F",
  "#32CD32",
  "#FF4500",
  "#FFD700",
  "#FF69B4",
  "#9400D3",
  "#DC143C",
  "#00CED1",
  "#FF8C00",
  "#00FA9A",
  "#4B0082",
  "#7B68EE",
  "#8B4513",
  "#20B2AA"
];


//Black Functionality

const blackBtn = document.getElementById("black-btn")
blackBtn.addEventListener('click', black)

//Colour Functionality 
const rdmBtn = document.getElementById("random-btn")
rdmBtn.addEventListener('click', function(){

    randomColours()
})


//Reset Functionality 
const resetBtn = document.getElementById("reset-btn")
resetBtn.addEventListener('click', reset)

//16x16 Functionality
const sixteenBtn = document.getElementById("16-btn")
sixteenBtn.addEventListener('click', function(){
    
    makeRows(16,16)
})


//32x32 Functionality
const thirtyTwoBtn = document.getElementById("32-btn")
thirtyTwoBtn.addEventListener('click', function(){
    makeRows(32,32)
} )

//100x100
const oneHundredBtn = document.getElementById("100-btn")
oneHundredBtn.addEventListener('click', function(){
    makeRows(100,100)
} )



function randomColours(){

    const gridItems = document.querySelectorAll(".grid-item")

    gridItems.forEach(function(gridItem){
  
        let randomColour = randomColors[Math.floor(Math.random() * 31)]
        
        
        gridItem.addEventListener('mouseover', function(){
          gridItem.style.backgroundColor = `${randomColour}`;
        });
        
      }); 

}


function black(){

    const gridItems = document.querySelectorAll(".grid-item")

    gridItems.forEach(function(gridItem){
  
        let randomColour = randomColors[Math.floor(Math.random() * 31)]
        
        
        gridItem.addEventListener('mouseover', function(){
          gridItem.style.backgroundColor = `black`;
        });
        
      }); 

}

function reset(){

    const gridItems = document.querySelectorAll(".grid-item")

    gridItems.forEach(function(gridItem){
          gridItem.style.backgroundColor = `rgb(204, 201, 201)`;

      }); 

}

