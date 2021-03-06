function SpriteRenderer() {


    this.Start = function() {

    }

    this.Update = function() {

    }

    this.Draw = function() {

    }
}


function MessageHandler(parent) {

   this.parent = parent;
   this.messageQueue = [];
   this.currentMessage = "";

   this.timer = 5000;


   this.Push = function(msg) {
       this.messageQueue.push(msg);

   }

   this.Pop = function() {
      if(this.messageQueue.length > 0) {
        this.timer = 5000;
        console.log(this.messageQueue);
           var msg = this.messageQueue.shift();
           //this.messageQueue.push(msg);
           this.currentMessage = msg;
       }
   }

   this.Update = function(scene) {
       this.timer -= Scene.deltaTime;

       if(this.timer <= 0)
        timer = 0;
   }

   this.Draw = function(scene) {

      if(this.timer > 0) {

        Scene.Camera.translate(Scene.UIContext);
        Scene.UIContext.textAlign = "center";
        Scene.UIContext.font = "8px Pixel";
       Scene.UIContext.fillStyle= "#000000";
       Scene.UIContext.fillText(this.currentMessage,parent.transform.position.x,parent.transform.position.y - 22);
       Scene.UIContext.fillStyle= "#FFFFFF";
       Scene.UIContext.fillText(this.currentMessage,parent.transform.position.x,parent.transform.position.y - 24);

       Scene.Camera.resetTransform(Scene.UIContext);

      }

   }


}
function Pathfinder() {

    this.easyStar = new EasyStar.js();

    this.Start = function() {

        this.easyStar.findPath(this.transform.position.x, this.transform.position.y, Scene.player.transform.position.x, Scene.player.transform.position.y, function( path ) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });

    }

    this.Update = function(scene) {

    }

    this.Draw = function(scene) {



    }


}


function BoxCollider(width, height, parent) {


    this.type = "BoxCollider";
    this.offset = new Vector2();
    this.parent = parent;
    this.collisions = [];
    this.width = width;
    this.height = height;
    this.ignorePlayer = false;
    this.isTrigger = false;
    this.phase = 0;
    this.rect = document.getElementById("rect");


    this.Start = function() {


    }

    this.Update = function(scene) {
    	//this.checkCollision(scene, this.parent.transform.position);

    }


    this.Draw = function(scene) {
      //ctx.drawImage(this.rect,0, 0, 16,16, this.parent.transform.position.x - (this.width/2),this.parent.transform.position.y - (this.height/2), this.width, this.height);


    }

    this.checkCollision = function(scene, position) {
    		//Get tile id
    		var tileID;

            var collision = false;

            this.collisions = [];


    		for(var i = 0; i < scene.tileRenderer.map.layers.length; i++) {

    			if(scene.tileRenderer.map.layers[i].properties && scene.tileRenderer.map.layers[i].properties.abovePlayer == true) {
    				continue;
    			}

    			if(scene.tileRenderer.map.tilesets[0].tileproperties && scene.tileRenderer.map.layers[i].type == "tilelayer") {
                    //Top left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

                    //Top right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

                    //Bottom left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

                    //Bottom right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

              }

          }



          for(var i = 0; i < scene.GameObjects.length; i++) {


			//Does the object have a box collider?
			if(scene.GameObjects[i].components.boxCollider) {

				if(scene.GameObjects[i] != this.parent) {



             if(scene.GameObjects[i].components.boxCollider.ignorePlayer && this.parent.type == "Player") {
              continue;
             }



                    if (position.x - (this.width/2) < scene.GameObjects[i].transform.position.x + scene.GameObjects[i].components.boxCollider.width/2 &&
                     position.x + (this.width/2) > scene.GameObjects[i].transform.position.x - scene.GameObjects[i].components.boxCollider.width/2  &&
                     position.y - (this.height/2) < scene.GameObjects[i].transform.position.y + scene.GameObjects[i].components.boxCollider.height/2 &&
                     (this.height/2) + position.y > scene.GameObjects[i].transform.position.y - scene.GameObjects[i].components.boxCollider.height/2) {



                            if(scene.GameObjects[i].components.boxCollider.isTrigger) {

                                this.collisions.push(scene.GameObjects[i].components.boxCollider);
                            }
                            else {
                                this.collisions.push(scene.GameObjects[i].components.boxCollider);
                                collision = true;
                            }
                    }
                }
            }


        }



        return collision;

    }

}
