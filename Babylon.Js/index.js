window.addEventListener('DOMContentLoaded', function(){

  var canvas = document.getElementById('canvas');

  var engine = new BABYLON.Engine(canvas, true);
  var createScene = function(){
      
      var scene = new BABYLON.Scene(engine); //create scene
      scene.clearColor = new BABYLON.Color3.Black();  //set scene color

      //Adding an Arc Rotate Camera
      const camera = new BABYLON.ArcRotateCamera("Camera", -3, 1, 1.5, BABYLON.Vector3.Zero(), scene);  //add a camera 
      camera.attachControl(canvas, false); 

      //Adding a light
      const light = new BABYLON.PointLight("light",new BABYLON.Vector3(5,3,0), scene); // Lightting
      light.parent= camera; // light color
      light.diffuse = new BABYLON.Color3(1,1,1);

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.9;

      scene.actionManager= new BABYLON.ActionManager(scene);  //Ceate action
      scene.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
              {trigger : BABYLON.ActionManager.OnKeyUpTrigger, parameter : ""},
              function (){
                  light.setEnabled(!light.isEnabled());
              }));
      var cheval;
      BABYLON.SceneLoader.ImportMesh("","","cheval.babylon",scene, 
              function(newMeshes){
                  newMeshes.forEach(function(mesh){
                      cheval=newMeshes[0];
                      // Set the target of the camera to the first imported mesh
                      camera.target = cheval;
                      cheval.position.y = 1;
                     // cheval.rotation.y = slider.value;
                      mesh.rotation= new BABYLON.Vector3(
                          BABYLON.Tools.ToRadians(10),0,0);
                  })});    
      // Move the light with the camera
      scene.registerBeforeRender(function () {
      light.position = camera.position;
       });
       // GUI
      /*var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

      var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
      button1.width = "150px"
      button1.height = "40px";
      button1.color = "white";
      button1.cornerRadius = 20;
      button1.background = "green";
      button1.onPointerUpObservable.add(function() {
        alert("you did it!");
      });
      advancedTexture.addControl(button1);  */

       
      //cheval.position = new BABYLON.Vector3(0,1,0);
      //cheval.position.y = 1;
      //scene.getMeshByName("").position.y =1;
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4},scene);
      ground.position = new BABYLON.Vector3(0,0.5,0);
      //var decalMaterial = new BABYLON.StandardMaterial("decalMat", scene);
      //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 300, height:15}, scene);
      //ground.material = decalMaterial;


      
      	
      const xrPromise = scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });
      return xrPromise.then((xrExperience) => {
        console.log("Done, WebXR is enabled.");
        return scene;
    });
/*     const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4});  
      const xrPromise = scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });    
      return xrPromise.then((xrExperience) => {
        console.log("Done, WebXR is enabled.");
        return scene;
  });*/
  };

  /*var scene = createScene();
  engine.runRenderLoop(function(){
      scene.render();

  }); */
  createScene().then(sceneToRender => {
    engine.runRenderLoop(() => sceneToRender.render());
});

});

