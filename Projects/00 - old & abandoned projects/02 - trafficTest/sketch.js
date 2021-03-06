//image of car used: http://opengameart.org/content/red-car-top-down
//all other declared functions (within the scope of this program) are my own


function preload() {
  // carImage = loadImage("assets/layer1.png");
}

function setup() {
	createCanvas(600,700);
	frameRate(10);
	quickRoad(280,90,120,90); //0
	quickRoad(120,110,280,110);
	quickRoad(290,20,290,80); //2
	quickRoad(310,80,310,20);
	quickRoad(280,110,310,80); //4
	quickRoad(290,120,290,180);
	quickRoad(310,180,310,120); //6
	quickRoad(310,120,310,80);
	quickRoad(310,120,280,90); //8
	addRoad(10,10,50,60,50,60,70,180);
	autoConnectRoads();
	addCar(1,0.5);
	addCar(1,0.5);
}

function convertActualRoadDistanceToT(roadX,distance){ //mostly functional
		var distanceCounter = 0; //roads[roadX][11][0]; //counts the actual base distance to add
		var current_bez_segment = 0;
		// console.log(distance/roads[roadX][10]);

		while (distance > distanceCounter+roads[roadX][11][current_bez_segment]){
			distanceCounter+=roads[roadX][11][current_bez_segment];
			current_bez_segment++;
		}
		//add the 0-10 distance to the calculation
		return (current_bez_segment/roads[roadX][12])+(distance-distanceCounter)/roads[roadX][11][current_bez_segment]/roads[roadX][12]; //double check
}

function getCarSpeed(car_id){
	var newCarPos = getPointOnRoad(cars[car_id][0],cars[car_id][1]);
	var returnValue = sqrt(abs(newCarPos.x - (cars[car_id][3].x)*abs(newCarPos.x - cars[car_id][3].x))+(abs(newCarPos.y - cars[car_id][3].y)* abs(newCarPos.y - cars[car_id][3].y)))
	cars[car_id][3]=getPointOnRoad(cars[car_id][0],cars[car_id][1]);
	return returnValue;
}

function draw() {
	background(128);
	// image(carImage,0,0,25,15);
	stroke(0,255,0);
	drawRoadLines();
	stroke(0,0,0);
	drawGrid(100);
	renderCars();
	getRoadLength(9);
	cars[0][1]=convertActualRoadDistanceToT(1,frameCount/10);
	cars[1][1]=convertActualRoadDistanceToT(1,(frameCount+30)/10);
	// console.log(getCarSpeed(0));
}








function addCar(currentRoad,posOnRoad){ //not done
	cars[addCarVar]=[];
	cars[addCarVar][0]=currentRoad;
	cars[addCarVar][1]=posOnRoad;
	cars[addCarVar][2]; //the rotation
	cars[addCarVar][3]=createVector(0,0); //the previous vector for speed
	addCarVar++;
}

// var name = new intersection([1,0,3],);
var intersection = function(inletRoads){
	// this.logRoads = function(){
}

function renderCars(){
	for(var i = 0; i < addCarVar; i++){

		push();
		var carXY = getPointOnRoad(cars[i][0],cars[i][1]); //its a vector
		var Rotation = getRoadRotation(cars[i][0],cars[i][1])
		translate(carXY.x,carXY.y); //sets origin to the cars position because the origin is also the pt of rotation
		rotate(Rotation); //sets cars rotation to a moving number
		// image(carImage,-12,-7,25,15); //sets car
    rect(-12,-7,25,15)
		pop();
	}
}

function getRoadRotation(road,pos){
	var currentCarVector = getPointOnRoad(road,pos);
	var vectorToAimAt = getPointOnRoad(road,pos+0.1)
	return atan((currentCarVector.y - vectorToAimAt.y)/(currentCarVector.x - vectorToAimAt.x))
}


/*function getRoadLength(roadX){
	var x1 = roads[roadX][0];
	var y1 = roads[roadX][1];
	var x2 = roads[roadX][2];
	var y2 = roads[roadX][3];
	var x3 = roads[roadX][4];
	var y3 = roads[roadX][5];
	var x4 = roads[roadX][6];
	var y4 = roads[roadX][7];
	var detail = 10;
	var previousXValue = x1;
	var previousYValue = y1;
	var totalXYvalue = 0;
	for(var k = 0; k <= detail; k++){
		var Xchange = abs(previousXValue-bezierPoint(x1,x2,x3,x4,k/detail));
		previousXValue = bezierPoint(x1,x2,x3,x4,k/detail);
		var Ychange = abs(previousYValue-bezierPoint(y1,y2,y3,y4,k/detail));
		previousYValue = bezierPoint(y1,y2,y3,y4,k/detail);
	   totalXYvalue += sqrt(Xchange*Xchange+Ychange*Ychange);
	}
	return totalXYvalue;
}*/
